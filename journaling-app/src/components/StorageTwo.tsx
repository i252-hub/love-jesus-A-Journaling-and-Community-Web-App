
interface StorageTwoProps<T> {
  storageKey: string;
  setNotes: React.Dispatch<React.SetStateAction<T[]>>;
  updateNote?: (index: number, newNote: { title: string; content: string }) => void;
  updateNoteTwo?: (index: number, newNote: { text: string}) => void;
}

const StorageTwo= <T extends object>({ storageKey, setNotes, updateNoteTwo }: StorageTwoProps<T>) => {
  const handleUpdateNote = (index: number, newNote: T) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note, i) => (i === index ? newNote : note));
      localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  if (updateNoteTwo) {
    updateNoteTwo = (index: number, newNote: { text: string }) => handleUpdateNote(index, newNote as T);
  }

  return null;  
};

export default StorageTwo;
