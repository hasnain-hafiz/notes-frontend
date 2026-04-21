import React, { useState, useRef } from "react";
import { apiRequest } from "../utils/Api";

export default function AddNote({ setNotes }) {
    const [add, setAdd] = useState({ title: "", content: "" });
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const titleRef = useRef(null);

    const addNote = async () => {
        if (!add.title.trim() && !add.content.trim()) return;
        setLoading(true);
        try {
            const data = await apiRequest("/notes/add", "POST", add);
            setNotes((prev) => [data, ...prev]);
            setAdd({ title: "", content: "" });
            setExpanded(false);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.metaKey) addNote();
    };

    const handleDiscard = () => {
        setAdd({ title: "", content: "" });
        setExpanded(false);
    };

    return (
        <div className={`add-note-card ${expanded ? "expanded" : ""}`}>
            <input
                ref={titleRef}
                className="add-note-title"
                value={add.title}
                placeholder="New note title..."
                onChange={(e) => setAdd({ ...add, title: e.target.value })}
                onFocus={() => setExpanded(true)}
                onKeyDown={handleKeyDown}
            />

            {expanded && (
                <>
                    <div className="add-note-divider" />
                    <textarea
                        className="add-note-content"
                        value={add.content}
                        placeholder="Write something..."
                        onChange={(e) => setAdd({ ...add, content: e.target.value })}
                        onKeyDown={handleKeyDown}
                        autoFocus={false}
                    />
                    <div className="add-note-footer">
                        <span className="add-note-hint">⌘ + Enter to save</span>
                        <div className="add-note-actions">
                            <button className="btn-discard" onClick={handleDiscard}>Discard</button>
                            <button
                                className="btn-save"
                                onClick={addNote}
                                disabled={loading || (!add.title.trim() && !add.content.trim())}
                            >
                                {loading ? "Saving..." : "+ Add Note"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}