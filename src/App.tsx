import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';
import NoteItem from './components/NoteItem';
import SearchBar from './components/SearchBar';
import Button from './components/Button';

function App(){
  const [notes, setNotes] = useState<string[]>([]);
  const [note, setNote] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSuccess) {
      inputRef.current?.focus();
    }
  }, [showSuccess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'Enter') {
        addNote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [note]);

  const addNote = () => {
    if (note.trim() === '') {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    setNotes([...notes, note]);
    setNote('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNote();
    }
  }

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  }

  const editNote = (index: number, newNote: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = newNote;
    setNotes(updatedNotes);
  }

  const filteredNotes = notes.filter(note => note.includes(searchTerm));

  return (
    <>
      <header className='bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg'>
        <h1 className='text-3xl font-bold'>吵架记录本</h1>
      </header>
      <main className='p-4'>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <input 
          type="text" 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          onKeyDown={handleKeyPress}
          placeholder='输入你的记录' 
          className='border p-2 w-full mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
          ref={inputRef}
        />
        <Button onClick={addNote} disabled={note.trim() === ''} tooltip="添加记录" shortcut="⌘ + Enter">
          添加记录
        </Button>
        <AnimatePresence>
          {showSuccess && (
            <motion.p 
              className='text-green-500 mt-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              记录已添加!
            </motion.p>
          )}
          {showError && (
            <motion.p 
              className='text-red-500 mt-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              请输入记录内容!
            </motion.p>
          )}
        </AnimatePresence>
        <ul className='mt-4'>
          {filteredNotes.map((note, index) => (
            <NoteItem 
              key={`${note}-${index}`}  // 确保 key 唯一
              note={note} 
              index={index} 
              onDelete={deleteNote} 
              onEdit={editNote} 
            />
          ))}
        </ul>
      </main>
      <footer className="bg-gray-200 text-center p-4 fixed bottom-0 w-full">
        <p>&copy; Jack</p>
      </footer>
    </>
  )
}

export default App
