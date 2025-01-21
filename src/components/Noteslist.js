import Note from './Note';
import AddNote from './AddNote';

const Noteslist = ({
    notes,
    handleAddNote,
    handleEditNote,
    handleUpdateNote,
    handleDeleteNote,
    handleUnPinNote,
    handleFillPinNote
}) => {
    // Separate pinned and unpinned notes
    const pinnedNotes = notes.filter(note => note.isPinned);
    const unpinnedNotes = notes.filter(note => !note.isPinned);

    return (
        <div className='notes-list'>
            <AddNote handleAddNote={handleAddNote} />
            {notes.length > 0 ? (
                [...pinnedNotes, ...unpinnedNotes].map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        date={note.date}
                        time={note.time}
                        handleEditNote={handleEditNote}
                        handleUpdateNote={handleUpdateNote}
                        handleDeleteNote={handleDeleteNote}
                        handleUnPinNote={handleUnPinNote}
                        handleFillPinNote={handleFillPinNote}
                        isPinned={note.isPinned} // Pass the correct isPinned state
                    />
                ))
            ) : (
                <p className='msg'>No notes available</p>
            )}
        </div>
    );
};

export default Noteslist;
