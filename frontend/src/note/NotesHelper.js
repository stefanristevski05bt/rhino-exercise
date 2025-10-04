import axios from 'axios';
import { apiUrl } from './../constants';

export const getNotes = async (t) => {
    try {
        const result = await axios.get(`${apiUrl}/note`)
        return result.data;
    } catch (err) {
        console.error(err);
        alert(t('couldNotGet'));
    }
}

export const saveNote = async (note, t) => {
    try {
        const result = await axios.post(`${apiUrl}/note`, note);
        return result.data;
    } catch (err) {
        console.error(err);
        alert(t('couldNotSave'));
    }
};

export const removeNote = async (id, t) => {
    try {
        const result = await axios.delete(`${apiUrl}/note/${id}`);
        return result.data;
    } catch (err) {
        console.error(err);
        alert(t('couldNotRemove'));
    }
};
