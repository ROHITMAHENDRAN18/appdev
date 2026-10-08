import { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import NoteEditor, { COLORS } from './components/NoteEditor';
import NoteCard from './components/NoteCard';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import './index.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorFilter, setSelectedColorFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [formData, setFormData] = useState({ title: '', content: '', color: COLORS[0].hex });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('folio_dark_mode') === 'true';
  });

  // Apply dark mode class to root body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('folio_dark_mode', darkMode);
  }, [darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        setNotes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      showToast('Could not connect to backend server', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    try {
      setIsSubmitting(true);
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/notes/${editingId}` : '/api/notes';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showToast(editingId ? 'Note updated successfully! ✨' : 'New note pinned to canvas! 📌');
        setFormData({ title: '', content: '', color: COLORS[0].hex });
        setEditingId(null);
        await fetchNotes();
      } else {
        showToast('Error saving note', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error while saving note', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Note deleted 🗑️');
        if (editingId === id) {
          setEditingId(null);
          setFormData({ title: '', content: '', color: COLORS[0].hex });
        }
        fetchNotes();
      } else {
        showToast('Failed to delete note', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error while deleting', 'error');
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setFormData({ title: note.title, content: note.content, color: note.color });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Editing note — modify above', 'info');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', color: COLORS[0].hex });
  };

  const handleSeedSample = async () => {
    const sample = {
      title: 'Welcome to Folio Notes! 🚀',
      content: 'This note-taking app is built with React, Vite, Express, and MongoDB.\n\n• Filter by tone & color\n• Search instantly\n• Copy to clipboard\n• Toggle light/dark mode',
      color: COLORS[1].hex
    };

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample)
      });
      if (res.ok) {
        showToast('Sample note created! 🌟');
        fetchNotes();
      }
    } catch {
      showToast('Could not create sample note', 'error');
    }
  };

  // Keyboard shortcut: '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Sort
  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        const matchesSearch =
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesColor = selectedColorFilter === 'ALL' || n.color === selectedColorFilter;
        return matchesSearch && matchesColor;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
        if (sortBy === 'oldest') return new Date(a.updatedAt || a.createdAt || 0) - new Date(b.updatedAt || b.createdAt || 0);
        if (sortBy === 'az') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [notes, searchQuery, selectedColorFilter, sortBy]);

  return (
    <div className="folio-app">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalNotes={notes.length}
        filteredCount={filteredNotes.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="filter-toolbar">
        <div className="filter-pill-group">
          <button
            type="button"
            className={`filter-pill ${selectedColorFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedColorFilter('ALL')}
          >
            All Notes ({notes.length})
          </button>
          {COLORS.map((c) => {
            const count = notes.filter((n) => n.color === c.hex).length;
            if (count === 0 && notes.length > 0) return null;
            return (
              <button
                type="button"
                key={c.hex}
                className={`filter-pill ${selectedColorFilter === c.hex ? 'active' : ''}`}
                onClick={() => setSelectedColorFilter(selectedColorFilter === c.hex ? 'ALL' : c.hex)}
              >
                <span className="pill-color-dot" style={{ backgroundColor: c.hex }}></span>
                <span>{c.name}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">Sort:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="newest">Recent First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      <main className="folio-workspace">
        <div className="workspace-editor-col">
          <NoteEditor
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="workspace-notes-col">
          {loading ? (
            <div className="loading-state-wrapper">
              <div className="spinner"></div>
              <p>Fetching your thoughts...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <EmptyState
              isSearching={Boolean(searchQuery || selectedColorFilter !== 'ALL')}
              onClearSearch={() => {
                setSearchQuery('');
                setSelectedColorFilter('ALL');
              }}
              onSeedNote={notes.length === 0 ? handleSeedSample : null}
            />
          ) : (
            <div className="notes-masonry-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onNotify={(msg) => showToast(msg, 'info')}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
