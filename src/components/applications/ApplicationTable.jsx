import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Filter,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react'
import { Timestamp } from 'firebase/firestore'
import useApplication from '../../hooks/useApplication'
import { formatSalaryDisplay, isValidCurrency } from '../../data/currencies'
import ApplicationModal from '../modals/ApplicationModal'
import Styling from '../common/Style'

const styles = Styling();

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

const formatDateValue = (dateValue) => {
  if (!dateValue) return '—'

  const date = dateValue instanceof Date
    ? dateValue
    : dateValue?.toDate?.() || new Date(`${dateValue}T12:00:00`)

  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getDateForInput = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10)

  if (value instanceof Timestamp) {
    return value.toDate().toISOString().slice(0, 10)
  }

  if (typeof value === 'string') {
    return value.slice(0, 10)
  }

  if (value?.toDate) {
    return value.toDate().toISOString().slice(0, 10)
  }

  return new Date(value).toISOString().slice(0, 10)
}

function ApplicationStatusBadge({ status }) {
  const styles = {
    Saved: 'bg-slate-100 text-slate-700',
    Applied: 'bg-blue-100 text-blue-700',
    Screening: 'bg-amber-100 text-amber-700',
    Interview: 'bg-emerald-100 text-emerald-700',
    Assessment: 'bg-violet-100 text-violet-700',
    Offer: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-rose-100 text-rose-700',
    Withdrawn: 'bg-slate-200 text-slate-700',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}

const emptyForm = {
  company: '',
  position: '',
  dateApplied: new Date().toISOString().slice(0, 10),
  status: 'Saved',
  workplace: 'Remote',
  location: '',
  salary: '',
  currency: 'USD',
  resume: 'Primary Resume',
  source: '',
}

export default function ApplicationTable() {
  const { applications, error, setError, createApplication, updateApplication, deleteApplication: removeApplication } = useApplication()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [applicationToDelete, setApplicationToDelete] = useState(null)
  const [formValues, setFormValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const rows = applications

  const visibleRows = useMemo(() => [...rows]
    .filter((row) => statusFilter === 'All' || row.status === statusFilter)
    .filter((row) => {
      const searchText = `${row.company ?? ''} ${row.position ?? row.role ?? ''} ${row.location ?? ''} ${row.workplace ?? ''} ${row.status ?? ''} ${row.resume ?? ''} ${row.source ?? ''} ${row.salary ?? ''} ${row.currency ?? ''}`.toLowerCase()
      return searchText.includes(query.trim().toLowerCase())
    })
    .sort((first, second) => {
      const firstDate = first.dateApplied?.toDate?.() || first.dateApplied || new Date(first.dateApplied || 0)
      const secondDate = second.dateApplied?.toDate?.() || second.dateApplied || new Date(second.dateApplied || 0)
      const firstValue = firstDate instanceof Date ? firstDate.getTime() : Number(firstDate)
      const secondValue = secondDate instanceof Date ? secondDate.getTime() : Number(secondDate)

      return sortOrder === 'newest' ? secondValue - firstValue : firstValue - secondValue
    }), [rows, query, sortOrder, statusFilter])

  const clearForm = () => {
    setFormValues(emptyForm)
    setErrors({})
    setSelectedId(null)
    setIsEditing(false)
  }

  const openAddModal = () => {
    clearForm()
    setIsModalOpen(true)
  }

  const openEditModal = (row) => {
    setSelectedId(row.id)
    setIsEditing(true)
    setFormValues({
      company: row.company || '',
      position: row.position || row.role || '',
      dateApplied: getDateForInput(row.dateApplied),
      status: row.status || 'Saved',
      workplace: getValidWorkplace(row.workplace),
      location: row.location || '',
      salary: row.salary ?? '',
      currency: isValidCurrency(row.currency) ? row.currency : 'USD',
      resume: row.resume || 'Primary Resume',
      source: row.source || '',
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    clearForm()
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => {
      const nextValues = { ...currentValues, [name]: value }

      if (name === 'workplace' && value === 'Remote') {
        nextValues.location = ''
      }

      return nextValues
    })

    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const company = formValues.company.trim()
    const position = formValues.position.trim()
    const dateApplied = formValues.dateApplied
    const status = formValues.status
    const workplace = getValidWorkplace(formValues.workplace)
    const salary = formValues.salary.trim()
    const currency = formValues.currency
    const normalizedLocation = normalizeLocation(workplace, formValues.location)

    if (!company) nextErrors.company = 'Company is required.'
    if (!position) nextErrors.position = 'Position is required.'
    if (!dateApplied) nextErrors.dateApplied = 'Date applied is required.'
    if (!status) nextErrors.status = 'Status is required.'
    if (!workplace) nextErrors.workplace = 'Workplace is required.'

    if (salary && !/^\d+(?:,\d{3})*(?:\.\d+)?$/.test(salary)) {
      nextErrors.salary = 'Enter a valid salary amount.'
    }

    if (salary && !isValidCurrency(currency)) {
      nextErrors.currency = 'Choose a valid currency.'
    }

    if (workplace !== 'Remote' && normalizedLocation && normalizedLocation.length > 100) {
      nextErrors.location = 'Location must be 100 characters or fewer.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const saveApplication = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setError('')

    try {
      if (isEditing && selectedId) {
        await updateApplication(selectedId, formValues)
      } else {
        await createApplication(formValues)
      }

      closeModal()
    } catch (saveError) {
      setError(saveError?.message || 'Unable to save the application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteApplication = async () => {
    if (!applicationToDelete?.id) return

    setIsDeleting(true)
    try {
      await removeApplication(applicationToDelete.id)
      setApplicationToDelete(null)
    } catch (deleteError) {
      setError(deleteError?.message || 'Unable to delete the application.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex">
           <label className="flex h-9 min-w-[180px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 text-slate-400 sm:flex-none">
            <Search size={15} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search applications"
              aria-label="Search applications"
              className={``}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
         

          <label className="flex h-9 items-center gap-2 rounded-md border border-slate-200 px-2.5 text-slate-500">
            <Filter size={14} aria-hidden="true" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status" className="bg-transparent text-xs outline-none">
              <option value="All">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="flex h-9 items-center gap-2 rounded-md border border-slate-200 px-2.5 text-slate-500">
            {sortOrder === 'newest' ? <ArrowDown size={14} aria-hidden="true" /> : <ArrowUp size={14} aria-hidden="true" />}
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort applications by date" className="bg-transparent text-xs outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>

          <button 
            type="button" 
            onClick={openAddModal}
             className={`${styles.buttonBlue} px-4 py-2 rounded-lg text-sm`}>
              Add Application
          </button>
        </div>
      </div>

      {error && (
        <div className="border-b border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Company</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Applied</th>
              <th className="px-4 py-3 font-semibold">Salary</th>
              <th className="px-4 py-3 font-semibold">Resume</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const workplace = getValidWorkplace(row.workplace)
              const location = normalizeLocation(workplace, row.location)

              return (
                <tr key={row.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-slate-700">{row.company}</span>
                      <span className="text-sm text-slate-600">{row.position || row.role}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-600">{workplace}</span>
                      {location && <span>{location}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3"><ApplicationStatusBadge status={row.status} /></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{formatDateValue(row.dateApplied)}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{formatSalaryDisplay(row.salary, row.currency)}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{row.resume || 'Primary Resume'}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{row.source || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => openEditModal(row)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-600" aria-label={`Edit ${row.company}`}>
                        <Pencil size={13} />
                      </button>
                      <button type="button" onClick={() => setApplicationToDelete(row)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-rose-200 hover:text-rose-600" aria-label={`Delete ${row.company}`}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {visibleRows.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-12 text-center text-sm text-slate-500">
                  {rows.length === 0
                    ? 'No applications yet. Add your first application to get started.'
                    : 'No applications match your search or filters.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ApplicationModal
        open={isModalOpen}
        onClose={closeModal}
        isEditing={isEditing}
        formValues={formValues}
        errors={errors}
        onFieldChange={handleFieldChange}
        onCurrencyChange={(currency) => {
          setFormValues((currentValues) => ({ ...currentValues, currency }))
          setErrors((currentErrors) => ({ ...currentErrors, currency: '' }))
        }}
        onSubmit={saveApplication}
        isSubmitting={isSubmitting}
        statusOptions={statusOptions}
        workplaceOptions={workplaceOptions}
        applicationToDelete={applicationToDelete}
        onCloseDelete={() => !isDeleting && setApplicationToDelete(null)}
        onConfirmDelete={handleDeleteApplication}
        isDeleting={isDeleting}
      />
    </div>
  )
}
