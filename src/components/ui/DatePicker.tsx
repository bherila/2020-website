'use client'

interface DatePickerProps {
  selected?: Date | null
  onChange: (date: Date | null) => void
  className?: string
}

export default function DatePicker({ selected, onChange, className }: DatePickerProps) {
  return (
    <input
      type="date"
      className={className}
      value={selected ? selected.toISOString().split('T')[0] : ''}
      onChange={(e) => {
        const date = e.target.value ? new Date(e.target.value) : null
        onChange(date)
      }}
    />
  )
}
