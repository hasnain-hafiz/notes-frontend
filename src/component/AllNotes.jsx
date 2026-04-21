import React from "react";
import { apiRequest } from "../utils/Api";
import NoteCard from "./NoteCard";

export default function AllNotes({ notes, setNotes }) {
    const deleteNote = async (id) => {
        await apiRequest(`/notes/delete/${id}`, "DELETE");
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const updateNote = async (id, updated) => {
        const data = await apiRequest(`/notes/update/${id}`, "PUT", updated);
        setNotes((prev) => prev.map((n) => (n.id === id ? data : n)));
    };

    return (
        <div className="notes-container">
            {notes.map((note) => (
                <NoteCard   
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onUpdate={updateNote}
                />
            ))}
        </div>
    );
}