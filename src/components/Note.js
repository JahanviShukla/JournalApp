import { MdDelete } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";

const Note = ({ id, text, date, time, handleUpload, handleDeleteNote, handleEditNote }) => {
    return (
        <div className='note'>
            <span>{text}</span>
            <div className='note-footer'>
                <div className='date-time'>
                    <small className='date'>{date}</small>
                    <p className='time'>{time}</p>
                </div>

                <div className="uploadbtn">
                    <input id="input-file" className="d-none" type="file" onChange={handleUpload} />
                    <button className="btn btn-outline-primary">
                        Upload
                    </button>
                </div>

                <div className='icons'>
                    <FaEdit
                        className='edit-icon'
                        size='1.3em'
                        onClick={() => handleEditNote(id)}
                    />
                    <MdDelete
                        onClick={() => handleDeleteNote(id)}
                        className='delete-icon'
                        size='1.3em'
                    />
                </div>
            </div>
        </div>
    );
};

export default Note;
