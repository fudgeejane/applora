import { code as lookupCurrency, data as currencyData } from 'currency-codes'

const preferredCodes = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'PHP', 'SGD', 'INR']

export const currencyOptions = [...currencyData]
  .sort((first, second) => {
    const firstIndex = preferredCodes.indexOf(first.code)
    const secondIndex = preferredCodes.indexOf(second.code)

    if (firstIndex !== -1 || secondIndex !== -1) {
      if (firstIndex === -1) return 1
      if (secondIndex === -1) return -1
      return firstIndex - secondIndex
    }

    return first.code.localeCompare(second.code)
  })
  .map((item) => ({
    code: item.code,
    label: `${item.code} — ${item.currency}`,
  }))

export const isValidCurrency = (value) => Boolean(value && lookupCurrency(String(value).toUpperCase()))

export function formatSalaryDisplay(salary, currency) {
  const raw = (salary ?? '').toString().trim()
  if (!raw) return '—'

  const code = isValidCurrency(currency) ? String(currency).toUpperCase() : null
  const numeric = Number(raw.replace(/,/g, ''))

  if (code && Number.isFinite(numeric)) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: code,
        maximumFractionDigits: 2,
      }).format(numeric)
    } catch {
      return `${code} ${raw}`
    }
  }

  return code ? `${code} ${raw}` : raw
}
