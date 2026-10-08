import { useEffect } from 'react';
import { CheckIcon, SparklesIcon, CloseIcon } from './Icons';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast-notification ${toast.type || 'info'}`}>
      <div className="toast-icon">
        {toast.type === 'success' ? <CheckIcon /> : <SparklesIcon />}
      </div>
      <div className="toast-message">{toast.message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <CloseIcon />
      </button>
    </div>
  );
}

