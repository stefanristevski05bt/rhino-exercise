export default function Note({note, onNoteClick}) {
    return(
        <article className="note" onClick={() => onNoteClick(note)}>
            <h1>{note.title}</h1>
            <p className="note-text">{note.text}</p>
        </article>
    );
}