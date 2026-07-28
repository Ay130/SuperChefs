'use client'

import { X } from 'lucide-react'
import { MouseEvent } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSave?: () => void
  saveLabel?: string
}

export function Modal({ isOpen, onClose, title, children, onSave, saveLabel = 'Save' }: ModalProps) {
  if (!isOpen) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-100 rounded transition"
            type="button"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto">
          {children}
        </div>
        {onSave && (
          <div className="flex gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition font-medium"
              type="button"
            >
              Cancel
            </button>
            <button 
              onClick={onSave} 
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              type="button"
            >
              {saveLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  confirmLabel?: string
  isDangerous?: boolean
}

export function ConfirmDialog({ isOpen, onClose, title, message, onConfirm, confirmLabel = 'Confirm', isDangerous = false }: ConfirmDialogProps) {
  if (!isOpen) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        <div className="p-6">
          <p className="text-slate-700">{message}</p>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition font-medium"
            type="button"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm()
              onClose()
            }} 
            className={`flex-1 px-4 py-2 rounded-lg text-white transition font-medium ${
              isDangerous 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
