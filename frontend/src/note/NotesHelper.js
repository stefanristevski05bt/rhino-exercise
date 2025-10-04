import axios from 'axios';
import { apiUrl } from './../constants';

export const getNotes = async () => {
    try {
        const result = await axios.get(`${apiUrl}/note`)
        return result.data;
    } catch (err) {
        console.error(err);
        alert('Could not get notes');
    }
}

export const saveNote = async (note) => {
    try {
        const result = await axios.post(`${apiUrl}/note`, note);
        return result.data;
    } catch (err) {
        console.error(err);
        alert('Could not save note');
    }
};

export const removeNote = async (id) => {
    try {
        const result = await axios.delete(`${apiUrl}/note/${id}`);
        return result.data;
    } catch (err) {
        console.error(err);
        alert('Could not save note');
    }
};
