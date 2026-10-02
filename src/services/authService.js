import {
  browserLocalPersistence,
  browserSessionPersistence,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getIdToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  verifyBeforeUpdateEmail,
  verifyPasswordResetCode,
  applyActionCode,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const actionSettings = (continuePath) => ({
  url: new URL(continuePath, window.location.origin).toString(),
  handleCodeInApp: false,
});

export function getAuthErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'An account already exists for this email address.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please wait a while and try again.',
    'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
    'auth/network-request-failed': 'A network error occurred. Check your connection and try again.',
    'unavailable': 'The service cannot be reached right now. Check your internet connection and try again.',
    'deadline-exceeded': 'The request timed out. Check your internet connection and try again.',
    'permission-denied': 'Your account is active, but its profile could not be saved. Check that the Firestore rules are deployed, then retry.',
    'auth/requires-recent-login': 'For your security, sign in again before making this change.',
    'auth/user-disabled': 'This account is disabled. Contact support for help.',
    'auth/user-not-found': 'We could not complete that request. Check the details and try again.',
    'auth/wrong-password': 'The email or password is incorrect.',
    'auth/expired-action-code': 'This link has expired. Request a new one to continue.',
    'auth/invalid-action-code': 'This link is invalid or has already been used.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled for this project.',
    'auth/account-exists-with-different-credential': 'An account already exists with this email address.',
  };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'You appear to be offline. Reconnect to the internet and retry. Firebase may not have received this request.';
  }

  return messages[error?.code] || 'Something went wrong. Please try again.';
}

export async function saveUserProfile(user, profile = {}) {
  const profileRef = doc(db, 'users', user.uid);
  const existingProfile = await getDoc(profileRef);
  const profileData = {
    name: profile.name ?? user.displayName ?? '',
    email: user.email ?? '',
    updatedAt: serverTimestamp(),
  };
  if (profile.firstName !== undefined) profileData.firstName = profile.firstName;
  if (profile.lastName !== undefined) profileData.lastName = profile.lastName;

  if (!existingProfile.exists()) {
    profileData.createdAt = serverTimestamp();
  }

  await setDoc(profileRef, profileData, { merge: true });
  return { ...existingProfile.data(), ...profileData };
}

export async function updateUserProfile(user, name) {
  await updateProfile(user, { displayName: name });
  return saveUserProfile(user, { name });
}

export async function registerUser(firstName, lastName, email, password) {
  const name = `${firstName} ${lastName}`.trim();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  let profileError = null;

  try {
    await updateProfile(credential.user, { displayName: name });
  } catch (error) {
    profileError = error;
  }

  try {
    await setDoc(doc(db, 'users', credential.user.uid), {
      name,
      firstName,
      lastName,
      email: credential.user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    profileError ||= error;
  }

  try {
    await sendEmailVerification(credential.user, actionSettings('/email-verified?status=success'));
    return {
      user: credential.user,
      profileSaved: !profileError,
      profileError,
      verificationSent: true,
    };
  } catch (error) {
    return {
      user: credential.user,
      profileSaved: !profileError,
      profileError,
      verificationSent: false,
      verificationError: error,
    };
  }
}

export async function retryRegistrationProfile({ firstName, lastName }) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('The account session has ended. Sign in with the email and password you just registered.');
  }

  const name = `${firstName} ${lastName}`.trim();
  await updateProfile(user, { displayName: name });
  await saveUserProfile(user, { name, firstName, lastName });
  return user;
}

export async function signInUser(email, password, rememberMe) {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  );
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export async function resendVerificationEmail(user = auth.currentUser) {
  if (!user) throw new Error('Sign in before requesting a verification email.');
  await user.reload();
  if (user.emailVerified) return { alreadyVerified: true };
  await sendEmailVerification(user, actionSettings('/email-verified?status=success'));
  return { alreadyVerified: false };
}

export function requestPasswordReset(email) {
  return sendPasswordResetEmail(auth, email, actionSettings('/change-password?status=success'));
}

export function validatePasswordResetCode(code) {
  return verifyPasswordResetCode(auth, code);
}

export function completePasswordReset(code, password) {
  return confirmPasswordReset(auth, code, password);
}

export function inspectActionCode(code) {
  return checkActionCode(auth, code);
}

export async function applyEmailChangeCode(code) {
  const info = await checkActionCode(auth, code);
  if (info.operation !== 'VERIFY_AND_CHANGE_EMAIL') {
    throw new Error('This link is not an email-change confirmation.');
  }

  await applyActionCode(auth, code);
  const user = auth.currentUser;
  if (user) {
    await user.reload();
    await getIdToken(user, true);
    await saveUserProfile(user);
  }

  return info.data.email;
}

export async function requestEmailChange(user, email) {
  await verifyBeforeUpdateEmail(user, email, actionSettings('/change-email?status=success'));
}

export async function applyEmailVerificationCode(code) {
  const info = await checkActionCode(auth, code);
  if (info.operation !== 'VERIFY_EMAIL') {
    throw new Error('This link is not an email-verification link.');
  }

  await applyActionCode(auth, code);
  if (auth.currentUser) {
    await auth.currentUser.reload();
    await saveUserProfile(auth.currentUser).catch(() => {});
  }
}