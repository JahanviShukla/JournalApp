import Note from './Note';
import AddNote from './AddNote';

const Noteslist = ({
    notes,
    handleAddNote,
    handleEditNote,
    handleUpdateNote,
    handleDeleteNote,
}) => {
    return (
        <div className='notes-list'>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        date={note.date}
                        time={note.time}
                        handleUpload={note.handleUpload}
                        handleEditNote={handleEditNote}
                        handleUpdateNote={handleUpdateNote}
                        handleDeleteNote={handleDeleteNote}
                    />
                ))
            ) : (
                <p>No notes available</p>
            )}
            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default Noteslist;
