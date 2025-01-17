import { useState } from 'react';
import { toast } from 'react-toastify';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText(''); // Clear the text area after saving
            toast.success('Note added successfully!'); // Show success message
        } else {
            toast.error('Please enter some text before saving!'); // Show error message if empty
        }
    };

    return (
        <div className='note new'>
            <textarea
                rows='8'
                cols='10'
                placeholder='I am grateful for...'
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className='note-footer'>
                <small>
                    {characterLimit - noteText.length} Remaining
                </small>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;
