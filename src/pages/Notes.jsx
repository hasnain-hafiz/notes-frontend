import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/Api";
import AllNote from "../component/AllNotes";
import AddNote from "../component/AddNote";


export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    const fetchNotes = async () => {
        const data = await apiRequest("/notes");
        setNotes(data);
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
            <AllNote notes={notes} setNotes={setNotes} />
        </div>
    );
}