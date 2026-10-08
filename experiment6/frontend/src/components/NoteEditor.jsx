import { PlusIcon, EditIcon, CheckIcon, SparklesIcon } from './Icons';

export const COLORS = [
  { hex: '#fef08a', name: 'Buttercup', border: '#fde047' },
  { hex: '#a7f3d0', name: 'Mint', border: '#6ee7b7' },
  { hex: '#bfdbfe', name: 'Sky', border: '#93c5fd' },
  { hex: '#ddd6fe', name: 'Lavender', border: '#c4b5fd' },
  { hex: '#fbcfe8', name: 'Blush', border: '#f472b6' },
  { hex: '#fed7aa', name: 'Peach', border: '#fdba74' },
  { hex: '#f3f4f6', name: 'Slate', border: '#e5e7eb' },
];

export default function NoteEditor({
  formData,
  setFormData,
  editingId,
  onSubmit,
  onCancel,
  isSubmitting = false
}) {
  const charCount = (formData.content || '').length;
  const wordCount = (formData.content || '').trim() ? (formData.content || '').trim().split(/\s+/).length : 0;

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <aside className="editor-card">
      <div className="editor-header">
        <div className="editor-title-wrap">
          <span className="editor-badge-icon">
            {editingId ? <EditIcon /> : <SparklesIcon />}
          </span>
          <h3>{editingId ? 'Edit Thought' : 'Draft Note'}</h3>
        </div>
        {editingId && (
          <span className="editing-pill">Active Edit</span>
        )}
      </div>

      <form onSubmit={onSubmit} onKeyDown={handleKeyDown}>
        <div className="input-field-group">
          <label htmlFor="note-title" className="field-label">Title</label>
          <input
            id="note-title"
            type="text"
            placeholder="e.g. Project brainstorm..."
            required
            maxLength={120}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="styled-input"
          />
        </div>

        <div className="input-field-group">
          <div className="field-label-row">
            <label htmlFor="note-content" className="field-label">Content</label>
            <span className="char-counter">
              {wordCount} words • {charCount} chars
            </span>
          </div>
          <textarea
            id="note-content"
            placeholder="Jot down tasks, reflections, snippets, or inspirations..."
            required
            rows={6}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="styled-textarea"
          />
        </div>

        <div className="color-section">
          <label className="field-label">Canvas Tone</label>
          <div className="palette-grid">
            {COLORS.map((color) => {
              const isSelected = formData.color === color.hex;
              return (
                <button
                  type="button"
                  key={color.hex}
                  className={`color-pill ${isSelected ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex, borderColor: color.border }}
                  onClick={() => setFormData({ ...formData, color: color.hex })}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                >
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="editor-footer">
          <div className="shortcut-hint">
            <kbd>⌘</kbd>+<kbd>Enter</kbd> to save
          </div>

          <div className="editor-buttons">
            {editingId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {editingId ? (
                <>
                  <EditIcon />
                  <span>Update Note</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  <span>Save Note</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </aside>
  );
}

