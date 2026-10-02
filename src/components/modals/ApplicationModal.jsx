import { Trash2, X } from 'lucide-react'
import CurrencySelect from '../applications/CurrencySelect'
import Modal from './Modal'

export default function ApplicationModal({
  open,
  onClose,
  isEditing,
  formValues,
  errors,
  onFieldChange,
  onCurrencyChange,
  onSubmit,
  isSubmitting,
  statusOptions,
  workplaceOptions,
  applicationToDelete,
  onCloseDelete,
  onConfirmDelete,
  isDeleting,
}) {
  return (
    <>
      <Modal open={open} onClose={onClose} ariaLabel={isEditing ? 'Edit application' : 'Add application'} className="!p-0 max-h-[calc(100dvh-2rem)] max-w-lg overflow-hidden">
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto [scrollbar-gutter:stable] p-6">
          <form onSubmit={onSubmit}>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h2 id="application-modal-title" className="text-lg font-semibold text-slate-900">
                  {isEditing ? 'Edit application' : 'Add application'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isEditing ? 'Update the details for this opportunity.' : 'Track a new job application for your pipeline.'}
                </p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close application modal" className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-1.5">
              <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                Company
                <input
                  name="company"
                  value={formValues.company}
                  onChange={onFieldChange}
                  maxLength="100"
                  autoFocus
                  className="h-8 w-full min-w-0 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                {errors.company && <span className="text-[11px] text-rose-600">{errors.company}</span>}
              </label>

              <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                Position
                <input
                  name="position"
                  value={formValues.position}
                  onChange={onFieldChange}
                  maxLength="120"
                  className="h-8 w-full min-w-0 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                {errors.position && <span className="text-[11px] text-rose-600">{errors.position}</span>}
              </label>

              <div className="grid min-w-0 grid-cols-2 gap-2">
                <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                  Date Applied
                  <input
                    name="dateApplied"
                    type="date"
                    value={formValues.dateApplied}
                    onChange={onFieldChange}
                    className="h-8 w-full min-w-0 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  {errors.dateApplied && <span className="text-[11px] text-rose-600">{errors.dateApplied}</span>}
                </label>

                <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                  Status
                  <select
                    name="status"
                    value={formValues.status}
                    onChange={onFieldChange}
                    className="h-8 w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {errors.status && <span className="text-[11px] text-rose-600">{errors.status}</span>}
                </label>
              </div>

              <div className="grid min-w-0 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2">
                <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                  Workplace
                  <select
                    name="workplace"
                    value={formValues.workplace}
                    onChange={onFieldChange}
                    className="h-8 w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    {workplaceOptions.map((workplace) => (
                      <option key={workplace} value={workplace}>{workplace}</option>
                    ))}
                  </select>
                  {errors.workplace && <span className="text-[11px] text-rose-600">{errors.workplace}</span>}
                </label>

                <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                  Location
                  <input
                    name="location"
                    value={formValues.location}
                    onChange={onFieldChange}
                    disabled={formValues.workplace === 'Remote'}
                    maxLength="100"
                    placeholder={formValues.workplace === 'Remote' ? 'Not required for remote roles' : 'City, region, or remote office'}
                    className="h-8 w-full min-w-0 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  {errors.location && <span className="text-[11px] text-rose-600">{errors.location}</span>}
                </label>
              </div>

              <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                Salary
                <div className="flex w-full min-w-0 gap-2">
                  <CurrencySelect value={formValues.currency} onChange={onCurrencyChange} />
                  <input
                    name="salary"
                    value={formValues.salary}
                    onChange={onFieldChange}
                    inputMode="decimal"
                    placeholder="120000"
                    className="h-9 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                {(errors.salary || errors.currency) && (
                  <span className="text-[11px] text-rose-600">{errors.salary || errors.currency}</span>
                )}
              </label>

              <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                Resume
                <input
                  name="resume"
                  value={formValues.resume}
                  onChange={onFieldChange}
                  maxLength="100"
                  className="h-8 w-full min-w-0 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="grid min-w-0 gap-1 text-xs font-medium text-slate-600">
                Source
                <input
                  name="source"
                  value={formValues.source}
                  onChange={onFieldChange}
                  maxLength="100"
                  placeholder="LinkedIn, Indeed, Referral, Company website..."
                  className="h-8 w-full min-w-0 rounded-md border border-slate-200 px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-2 flex justify-end gap-2 border-t border-slate-100 pt-2">
              <button type="button" onClick={onClose} className="h-10 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="h-10 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? 'Saving...' : isEditing ? 'Update application' : 'Save application'}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal open={Boolean(applicationToDelete)} onClose={onCloseDelete} ariaLabel="Confirm application deletion" className="max-w-md">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <Trash2 size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Delete application?</h2>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              This will permanently remove the application for <span className="font-medium text-slate-800">{applicationToDelete?.company}</span>.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" disabled={isDeleting} onClick={onCloseDelete} className="h-10 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-60">
            Cancel
          </button>
          <button type="button" disabled={isDeleting} onClick={onConfirmDelete} className="h-10 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70">
            {isDeleting ? 'Deleting...' : 'Delete application'}
          </button>
        </div>
      </Modal>
    </>
  )
}