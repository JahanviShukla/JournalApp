import { MdDelete } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";
const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
	return (
	  <div className='note'>
		<span>{text}</span>
		<div className='note-footer'>
		  <small>{date}</small>
  
		  {/* Edit button triggers handleEditNote with the note's id */}
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
	);
  };
  
export default Note;