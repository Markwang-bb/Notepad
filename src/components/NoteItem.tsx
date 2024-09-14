import { useState } from 'react';
import { motion } from 'framer-motion';

interface NoteItemProps {
  note: string;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number, newNote: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(note);

  const handleEdit = () => {
    onEdit(index, editNote);
    setIsEditing(false);
  };

  return (
    <motion.li 
      className='border-b p-2 text-gray-800 flex justify-between items-center'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isEditing ? (
        <input 
          type="text" 
          value={editNote} 
          onChange={(e) => setEditNote(e.target.value)} 
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          className='border p-1 rounded'
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{note}</span>
      )}
      <button 
        onClick={() => onDelete(index)} 
        className='text-red-500 hover:text-red-700 transition-colors duration-300'
      >
        <i className="ri-delete-bin-line"></i>
      </button>
    </motion.li>
  );
};

export default NoteItem;
