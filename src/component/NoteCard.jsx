import React from "react";
import { useState } from "react";

export default function NoteCard({ note, onDelete, onUpdate }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: note.title,
        content: note.content
    });

    return (
        <div className="note-card">
            {isEditing ? (
                <>
                    <input
                        value={editData.title}
                        onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                        }
                    />
                    <textarea
                        value={editData.content}
                        onChange={(e) =>
                            setEditData({ ...editData, content: e.target.value })
                        }
                    />
                    <button onClick={() => {
                        onUpdate(note.id, editData);
                        setIsEditing(false);
                    }}>Save</button>
                </>
            ) : (
                <>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>

                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(note.id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}