import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function EditNote({ note, onSave, handleEdit, onRemove }) {
    const [text, setText] = useState(note ? note.text : '');
    const [title, setTitle] = useState(note ? note.title : '');
    const { t } = useTranslation();

    const handleSave = () => {
        onSave({
            id: note ? note.id : null,
            title: title,
            text: text
        })
        handleEdit();
    }

    const handleRemove = () => {
        onRemove(note.id);
        handleEdit();
    }

    return (
        <div className="edit-note-container">
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={30}
            />
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <div className="button-group">
                <button className="button button-submit" onClick={handleSave}>{t('submit')}</button>
                <button className="button button-cancel" onClick={handleEdit}>{t('cancel')}</button>
                {note &&
                    <button className="button button-cancel" onClick={handleRemove}>{t('remove')}</button>
                }
            </div>
        </div>
    )
}