import React from "react";
import { apiRequest } from "../utils/Api";
import { useState } from "react";

export default function AddNote({ setNotes }) {

    const [add, setAdd] = useState({ title: "", content: "" });

    const addNote = async () => {
        const data = await apiRequest("/notes/add", "POST", add);
        setNotes(prev => [data, ...prev]);
        setAdd({ title: "", content: "" });
    };

    return (
        <div className="addNotes">
            <input
                value={add.title}
                placeholder="Title"
                onChange={(e) => setAdd({ ...add, title: e.target.value })}
            />
            <textarea
                value={add.content}
                placeholder="Content"
                onChange={(e) => setAdd({ ...add, content: e.target.value })}
            />
            <button onClick={addNote}>Add Note</button>
        </div>
    );
}