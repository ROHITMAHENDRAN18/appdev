import { useState } from 'react';
import { EditIcon, TrashIcon, CopyIcon, CheckIcon } from './Icons';

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onNotify
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const fullText = `${note.title}\n\n${note.content}`;
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      if (onNotify) onNotify('Note copied to clipboard! 📋');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article
      className="note-card-item"
      style={{
        backgroundColor: note.color || '#fef08a'
      }}
    >
      <div className="card-top-accent"></div>

      <div className="card-header">
        <h4 className="note-title">{note.title}</h4>
        <div className="card-quick-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy note"}
            aria-label="Copy note"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>

      <div className="card-body">
        <p className="note-content-text">{note.content}</p>
      </div>

      <div className="card-footer">
        <span className="card-timestamp">
          {note.updatedAt ? formatDate(note.updatedAt) : 'Recently'}
        </span>

        <div className="card-controls">
          <button
            type="button"
            className="control-btn edit-pill-btn"
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            <EditIcon />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="control-btn delete-pill-btn"
            onClick={() => onDelete(note._id)}
            title="Delete note"
          >
            <TrashIcon />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
}

