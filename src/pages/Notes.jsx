import React, { useEffect, useState, useContext } from "react";
import { apiRequest } from "../utils/Api";
import { AuthContext } from "../context/AuthContext";
import AllNotes from "../component/AllNotes";
import AddNote from "../component/AddNote";

export default function Notes() {
    const { logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const data = await apiRequest("/notes");
            setNotes(data);
        } finally {
            setLoading(false);
        }
    };

    const searchNotes = async () => {
        if (!search.trim()) return fetchNotes();
        const data = await apiRequest(`/notes/search?keyword=${search}`);
        setNotes(data);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") searchNotes();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="notes-page">
            {/* ── Top bar ── */}
            <div className="top-bar">
                <div className="brand-mark">
                    <div className="brand-name">Notes</div>
                </div>

                <div className="search-wrap">
                    <span className="search-icon">⌕</span>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    {search && (
                        <button className="search-clear" onClick={() => { setSearch(""); fetchNotes(); }}>
                            ✕
                        </button>
                    )}
                </div>

                <div className="top-bar-actions">
                    <button className="search-btn" onClick={searchNotes}>Search</button>
                    {logout && (
                        <button className="logout-btn" onClick={logout} title="Sign out">
                            ⎋ Sign out
                        </button>
                    )}
                </div>
            </div>

            {/* ── Add note ── */}
            <AddNote setNotes={setNotes} />

            {/* ── Notes section header ── */}
            <div className="notes-section-header">
                <span className="notes-section-title">All Notes</span>
                {!loading && (
                    <span className="notes-section-count">{notes.length} {notes.length === 1 ? "note" : "notes"}</span>
                )}
            </div>

            {/* ── Notes list ── */}
            {loading ? (
                <div className="loading-state">
                    <div className="loading-dots">
                        <span /><span /><span />
                    </div>
                    <p>Loading your notes...</p>
                </div>
            ) : notes.length === 0 ? (
                <div className="empty-state">
                    <p>No notes yet. Start writing something.</p>
                </div>
            ) : (
                <AllNotes notes={notes} setNotes={setNotes} />
            )}
        </div>
    );
}