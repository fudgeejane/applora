import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, reload } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { saveUserProfile, signOutUser } from '../../services/authService';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);

  const refreshUser = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setUser(null);
      setProfile(null);
      setRevision((value) => value + 1);
      return null;
    }

    await reload(currentUser);
    setUser(currentUser);
    setRevision((value) => value + 1);
    return currentUser;
  }, []);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (!active) return;
      setUser(nextUser);
      setProfile(null);
      try {
        if (nextUser) {
          const profileData = await saveUserProfile(nextUser);
          if (active) setProfile(profileData);
        }
      } catch {
        if (active) {
          setProfile({ name: nextUser.displayName || '', email: nextUser.email || '' });
        }
      } finally {
        if (active) setLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const refreshOnReturn = () => {
      if (document.visibilityState === 'visible') {
        refreshUser().catch(() => {});
      }
    };

    window.addEventListener('focus', refreshOnReturn);
    document.addEventListener('visibilitychange', refreshOnReturn);
    return () => {
      window.removeEventListener('focus', refreshOnReturn);
      document.removeEventListener('visibilitychange', refreshOnReturn);
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshUser,
        signOut: signOutUser,
        revision,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}