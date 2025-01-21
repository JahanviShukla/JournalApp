import { useState } from 'react';
import { toast } from 'react-toastify';


const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    // const [color,setColor] = useState('#FFFFF')
    const characterLimit = 200;


    // const handleColorChange =(event) =>{
    //     setColor(event.target.value)
        
    // }
    
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
                className='heading'
            ></textarea>
        
        {/* <input type='color' value={color} onChange={handleColorChange}/> */}
       
                <small>
                    {characterLimit - noteText.length} Remaining
                </small>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        
    );
};

export default AddNote;
