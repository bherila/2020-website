'use client'

interface ClearFilterButtonProps {
  onClick: () => void
  ariaLabel: string
}

export const ClearFilterButton = ({ onClick, ariaLabel }: ClearFilterButtonProps) => (
  <button
    className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent p-0 me-2"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    aria-label={ariaLabel}
  >
    ❌
  </button>
)
