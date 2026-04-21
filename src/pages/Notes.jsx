import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/Api";
import AllNotes from "../component/AllNotes";
import AddNote from "../component/AddNote";


export default function Notes() {
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
        if (!search) return fetchNotes();
        const data = await apiRequest(`/notes/search?keyword=${search}`);
        setNotes(data);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="notes-page">
            <div className="top-bar">
                <input
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchNotes}>Search</button>
            </div>

            <AddNote setNotes={setNotes} />
            {loading ? <p>Loading notes...</p> :<AllNotes notes={notes} setNotes={setNotes} />}
        </div>
    );
}