import React, { useState } from "react";

export default function NoteCard({ note, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({ title: note.title, content: note.content });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!draft.title.trim() && !draft.content.trim()) return;
        setSaving(true);
        try {
            await onUpdate(note.id, draft);
            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setDraft({ title: note.title, content: note.content });
        setEditing(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    if (editing) {
        return (
            <div className="note-card editing">
                <input
                    className="note-edit-title"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    placeholder="Title..."
                    autoFocus
                />
                <div className="add-note-divider" />
                <textarea
                    className="note-edit-content"
                    value={draft.content}
                    onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                    placeholder="Content..."
                />
                <div className="note-card-footer">
                    <span className="note-date">{formatDate(note.createdAt)}</span>
                    <div className="note-actions">
                        <button className="note-btn" onClick={handleCancel}>✕</button>
                        <button
                            className="note-btn save"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "..." : "✓"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="note-card" onClick={() => setEditing(true)}>
            {note.title && (
                <div className="note-card-title">{note.title}</div>
            )}
            {note.content && (
                <div className="note-card-content">{note.content}</div>
            )}
            <div className="note-card-footer">
                <span className="note-date">{formatDate(note.createdAt)}</span>
                <div className="note-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                        className="note-btn"
                        title="Edit"
                        onClick={() => setEditing(true)}
                    >
                        ✎
                    </button>
                    <button
                        className="note-btn delete"
                        title="Delete"
                        onClick={() => onDelete(note.id)}
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}