import { SparklesIcon, CloseIcon, NotePadIcon } from './Icons';

export default function EmptyState({ isSearching, onClearSearch, onSeedNote }) {
  if (isSearching) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-circle search-empty">
          <CloseIcon />
        </div>
        <h3>No matching notes found</h3>
        <p>We couldn't find any notes matching your query. Try searching for different keywords or clear the filter.</p>
        <button
          type="button"
          className="empty-cta-btn"
          onClick={onClearSearch}
        >
          Clear Search Filter
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state-card">
      <div className="empty-icon-circle">
        <NotePadIcon />
      </div>
      <h3>Your canvas is clean and ready</h3>
      <p>Capture thoughts, organize projects, save snippets, and turn inspiration into action.</p>
      {onSeedNote && (
        <button
          type="button"
          className="empty-cta-btn"
          onClick={onSeedNote}
        >
          <SparklesIcon />
          <span>Add a quick sample note</span>
        </button>
      )}
    </div>
  );
}

