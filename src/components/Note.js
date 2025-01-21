import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlinePushPin } from "react-icons/md";
import { BsFillPinFill } from "react-icons/bs";

const Note = ({ id,text, date, time, handleUnPinNote, handleFillPinNote, handleDeleteNote, handleEditNote, isPinned }) => {
    return (
        <div className='note'>
           <div className="main">
           <span>{text}</span>
           {isPinned ? (
                       <BsFillPinFill
                       onClick={() => handleUnPinNote(id)} // Pin action
                       className='fill-pin-icon'
                       size='1.3em'
                   />
                    ) : (
                       

                        <MdOutlinePushPin
                            onClick={() => handleFillPinNote(id)} // Unpin action
                            className='pin-icon'
                            size='1.3em'
                        />
                    )}
                    
           </div>
            
            <div className='note-footer'>
                <div className='date-time'>
                    <small className='date'>{date}</small>
                    <p className='time'>{time}</p>
                   
                </div>

                <div className='icons'>
                    <FaEdit
                        className='edit-icon'
                        size='1.3em'
                        onClick={() => handleEditNote(id)}
                    />
                    <MdDeleteForever
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
