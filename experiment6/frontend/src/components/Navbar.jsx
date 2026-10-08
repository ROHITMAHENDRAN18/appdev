import { SearchIcon, CloseIcon, NotePadIcon } from './Icons';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  totalNotes, 
  filteredCount,
  darkMode,
  setDarkMode 
}) {
  return (
    <header className="app-navbar">
      <div className="navbar-brand">
        <div className="brand-icon-wrapper">
          <NotePadIcon className="brand-icon" />
        </div>
        <div className="brand-text">
          <div className="brand-title">
            Folio<span className="brand-accent">.</span>
          </div>
          <span className="brand-tagline">Crafted Notes</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <span className="search-icon-slot">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <CloseIcon />
            </button>
          ) : (
            <span className="search-shortcut-badge">/</span>
          )}
        </div>
      </div>

      <div className="navbar-actions">
        <div className="notes-counter-badge" title="Total active notes">
          <span className="pulse-dot"></span>
          <span>{filteredCount === totalNotes ? `${totalNotes} notes` : `${filteredCount} of ${totalNotes}`}</span>
        </div>

        <button 
          type="button" 
          className="theme-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

