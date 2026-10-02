import { useCallback, useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { isValidCurrency } from '../data/currencies'
import useAuth from './useAuth'

const statusOptions = ['Saved', 'Applied', 'Screening', 'Interview', 'Assessment', 'Offer', 'Rejected', 'Withdrawn']
const workplaceOptions = ['Remote', 'Hybrid', 'Onsite']

const getValidWorkplace = (value) => (
  workplaceOptions.includes(value) ? value : 'Remote'
)

const normalizeLocation = (workplace, location) => {
  const trimmed = (location ?? '').toString().trim()
  if (workplace === 'Remote' || !trimmed) return null
  return trimmed
}

const normalizeSalary = (value) => {
  const trimmed = (value ?? '').toString().trim()
  return trimmed || null
}

const normalizeCurrency = (salary, currency) => {
  if (!salary) return null

  const code = (currency ?? '').toString().trim().toUpperCase()
  return isValidCurrency(code) ? code : 'USD'
}

export function buildApplicationPayload(user, values) {
  const workplace = getValidWorkplace(values?.workplace)

  return {
    uid: user.uid,
    company: (values?.company ?? '').trim(),
    position: (values?.position ?? '').trim(),
    dateApplied: Timestamp.fromDate(new Date(`${values?.dateApplied || new Date().toISOString().slice(0, 10)}T12:00:00`)),
    status: statusOptions.includes(values?.status) ? values.status : 'Saved',
    workplace,
    location: normalizeLocation(workplace, values?.location),
    salary: normalizeSalary(values?.salary),
    currency: normalizeCurrency(normalizeSalary(values?.salary), values?.currency),
    resume: (values?.resume ?? 'Primary Resume').trim() || 'Primary Resume',
    source: (values?.source ?? '').trim(),
    user: user.displayName || user.email || 'Current user',
    userID: user.uid,
  }
}

export default function useApplication() {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user?.uid) {
      return undefined
    }

    const applicationQuery = query(
      collection(db, 'application'),
      where('uid', '==', user.uid),
    )

    const unsubscribe = onSnapshot(
      applicationQuery,
      (snapshot) => {
        const rows = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data(),
          }))
          .filter((row) => row.uid === user.uid || row.userID === user.uid)
        setApplications(rows)
        setError('')
      },
      () => {
        setApplications([])
        setError('Unable to load your applications right now. Please try again in a moment.')
      },
    )

    return () => unsubscribe()
  }, [user?.uid])

  const createApplication = useCallback(async (values) => {
    if (!user?.uid) {
      throw new Error('Please sign in to save an application.')
    }

    const payload = buildApplicationPayload(user, values)

    const documentRef = await addDoc(collection(db, 'application'), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return documentRef.id
  }, [user])

  const updateApplication = useCallback(async (applicationId, values) => {
    if (!user?.uid || !applicationId) {
      throw new Error('Unable to update that application.')
    }

    const currentApplication = applications.find((application) => application.id === applicationId)
    if (!currentApplication) {
      throw new Error('Application not found.')
    }

    const payload = buildApplicationPayload(user, values)

    await updateDoc(doc(db, 'application', applicationId), {
      ...payload,
      createdAt: currentApplication.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }, [applications, user])

  const deleteApplication = useCallback(async (applicationId) => {
    if (!applicationId) return
    await deleteDoc(doc(db, 'application', applicationId))
  }, [])

  return {
    applications,
    error,
    setError,
    createApplication,
    updateApplication,
    deleteApplication,
  }
}
