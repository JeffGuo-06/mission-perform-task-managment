import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiChevronDown } from 'react-icons/fi'
import './StatusDropdown.css'

function StatusDropdown({ value, onChange, variant = 'pill' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  const statusOptions = [
    { value: 'To Do', color: '#9E9E9E' },
    { value: 'In Progress', color: '#2196F3' },
    { value: 'Done', color: '#4CAF50' }
  ]

  const currentStatus = statusOptions.find(option => option.value === value)

  // Update menu position when opened
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      })
    }
  }, [isOpen])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <>
      <div className={`status-dropdown-custom ${variant} ${isOpen ? 'open' : ''}`}>
        <button
          ref={buttonRef}
          type="button"
          className="status-dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: currentStatus.color,
            borderColor: currentStatus.color,
            color: 'white'
          }}
        >
          <span>{value}</span>
          <FiChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
        </button>
      </div>

      {isOpen && createPortal(
        <div
          ref={menuRef}
          className="status-dropdown-menu"
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`
          }}
        >
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`status-dropdown-option ${option.value === value ? 'active' : ''}`}
              onClick={() => handleSelect(option)}
              style={{
                backgroundColor: option.value === value ? option.color : 'transparent',
                color: option.value === value ? 'white' : option.color,
                borderColor: option.color
              }}
            >
              {option.value}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

export default StatusDropdown
