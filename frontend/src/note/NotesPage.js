import { useEffect, useState } from "react";
import { getNotes, saveNote, removeNote } from "./NotesHelper";
import Note from "./Note";
import EditNote from "./EditNote";
import { useTranslation } from 'react-i18next';

export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [edit, setEdit] = useState(false);
    const [selectedNote, setSelectedNote] = useState();
    const { t } = useTranslation();

    const fetchNotes = async () => {
        const data = await getNotes(t);
        if (data) setNotes(data);
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    const handleSubmit = async (note) => {
        const result = await saveNote(note, t);
        if (result) fetchNotes();
    }

    const handleRemove = async (id) => {
        const result = await removeNote(id, t);
        if (result) fetchNotes();
    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    const onNoteClick = (note) => {
        setSelectedNote(note);
        setEdit(true);
    }

    const handleCreate = () => {
        setSelectedNote(null);
        setEdit(true);
    }

    return (
        <div className="centered-container">
            <h1>{t('notes')}</h1>
            <div className="notes-wrapper">
                {!edit &&
                    <>
                        <section className="notes-section">
                            {
                                notes.map(note =>
                                    <Note
                                        key={note.id}
                                        note={note}
                                        onNoteClick={onNoteClick} />
                                )
                            }
                        </section>
                    </>
                }
                {edit &&
                    <EditNote
                        note={selectedNote}
                        onSave={handleSubmit}
                        handleEdit={handleEdit}
                        onRemove={handleRemove}
                    />}
            </div>
            <div className="button-group">
                <button className="button button-submit" onClick={handleCreate}>{t('create')}</button>
            </div>
        </div>
    );
}