import Navbar from "../components/Navbar"
import StorageTwo from "../components/StorageTwo";
import { PlusCircleIcon} from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";


export default function PrayerReq(){

  const [addReq, setAddReq] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [note, setNote] = useState<{text: string, username: string}[]>([]);
  const [currentNote, setCurrentNote] = useState({ text: "", username: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentChunk, setCurrentChunk] = useState(1);
  const [message, setMessage] = useState(false);
  const notesPerPage = 8;
  const pagesPerChunk = 3; 

  useEffect(()=>{
    if (!currentNote.username) {
      const newUserName = `User${Math.floor(Math.random() * 1000)}`;
      setCurrentNote((prev) => ({ ...prev, username: newUserName }));
    }
  },[currentNote.username])

  function Show(){
  
      setCurrentNote({ text: "", username: "" });
      setEditIndex(null);
    setAddReq(true);
  }

  function editNote(index: number) {
    setCurrentNote({...note[index]}); 
    setAddReq(true);
    setEditIndex(index);
  }

  function Publish(){
    if (currentNote.text.trim()) {
      if (editIndex !== null) {
        updatePrayerNote(editIndex, { text: currentNote.text });
        setEditIndex(null);
      } else {
        const newUserName = `User${Math.floor(Math.random() * 1000)}`;
        const newNote = { text: currentNote.text, username: newUserName };
        const updatedNotes = [...note, newNote];

      setNote(updatedNotes);
        localStorage.setItem("prayer_requests", JSON.stringify(updatedNotes));
        setEditIndex(updatedNotes.length - 1);

      }
      setCurrentNote({ text: "", username: "" });
      setAddReq(false);
      setMessage(true);
    }
   }

   function UniqueID(e: React.ChangeEvent<HTMLTextAreaElement>){
    const {name, value} = e.target
    setCurrentNote((prev) => ({ ...prev, [name]: value }));

   
   }

   const totalPages = Math.ceil(note.length / notesPerPage);
   const displayedNotes = note.slice(
     (currentPage - 1) * notesPerPage,
     currentPage * notesPerPage
   );
 
   function handlePageChange(newPage: number) {
     setCurrentPage(newPage);
   }

  

   const chunkStart = (currentChunk - 1) * pagesPerChunk + 1;
   const chunkEnd = Math.min(currentChunk * pagesPerChunk, totalPages);

   const pageNumbers = Array.from(
    { length: chunkEnd - chunkStart + 1 },
    (_, i) => chunkStart + i
  );

  function handlePreviousChunk() {
    if (currentChunk > 1) {
      setCurrentChunk(currentChunk - 1);
    }
  }

  function handleNextChunk() {
    if (chunkEnd < totalPages) {
      setCurrentChunk(currentChunk + 1);
    }
  }

  const updatePrayerNote = (index: number, newNote: { text: string }) => {
    setNote((prev) => {
      const updatedNotes = prev.map((note, i) => (i === index ? { ...note, ...newNote } : note));
      localStorage.setItem("prayer_requests", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };
  


    return (
        <>
       <div className="bg-customGradient  h-[100vh] scrollbar-hide overflow-hidden"
       >
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
        
        <StorageTwo<{ text: string; username: string }>
  storageKey="prayer_requests"
  setNotes={setNote}
  updateNoteTwo={updatePrayerNote}
/>

         {!message && displayedNotes.length === 0 && (
  <div className="w-full h-[50%] absolute z-5 top-[8rem] text-customBrown font-annie text-[3em] flex justify-center items-center">What do you want us to pray for?</div>

  )}
        <div className="relative top-[3rem] flex flex-col items-center h-full"
        > 
          <div className="w-full  text-[2rem] font-belle flex justify-center pt-8 pb-1 text-white">Daily Prayer Wall</div>
          <div className="w-[70%] grid grid-rows-8 h-[70%]">

          {
          displayedNotes.map((notes, index) => (
                <div
                  key={index}
                  onClick={() => index !== null && editNote(index)}
                  className={`grid grid-cols-2 items-center 
                    ${index % 2 === 0 ? 'bg-[#554B35] bg-opacity-50' : 'bg-[#BCA983]'}`}
                > 
                <div className="flex flex-col ">
                  
                  <div className="text-white font-belle h-full relative top-1 ml-3"> {notes.username}</div>
                
                  <div className="h-full text-white font-annie ml-3">  { notes.text} </div>
                </div>
                <div className="flex justify-end items-center bg-transparent w-full h-full">
                  <div className="bg-[#554B35] bg-opacity-60 pl-5 pr-5 pt-1 pb-1 mr-3 rounded-2xl font-annie text-white text-[14px]"> I PRAYED FOR YOU</div>
                 </div>
                </div>
                 
               
              
           
           
          ))
          
          
}
</div>

          
           {addReq && (
            <>
          <div className= 'fixed inset-0 backdrop-blur-sm  bg-opacity-50 z-40'></div>

          <div className="h-[60%] w-[30%] z-50   bg-customYellow  shadow-md absolute top-[10%] left-[37%] pb-2" >
          <textarea 
             className="w-full h-[90%] text-[1rem] font-annie resize-none overflow-hidden bg-transparent  focus:outline-none focus:text-customBrown text-customBrown pl-2 text-stroke-2 focus:text-stroke-2"
            maxLength={840}
             rows={2}
             placeholder="Present your requests"
             onChange={UniqueID}
             name="text"
             value={currentNote.text}></textarea>
             <div className="flex justify-end gap-2 mr-3">
             <button className="p-1 pl-5 pr-5 rounded-2xl bg-customBrown text-white font-annie"
             onClick={() => setAddReq(false)}>Cancel</button>
             <button 
             onClick={Publish}
             className="p-1 pl-5 pr-5 rounded-2xl bg-customBrown text-white font-annie">Publish</button>

             </div>
            
          </div>
          </>
           )}
          <div className="flex justify-center w-full items-center  ">
            <div className="w-[10%] relative left-[5rem] ">
            {currentChunk > 1 && (
              <button
                onClick={handlePreviousChunk}
                className="text-customBrown font-bold px-2"
              >
                &lt;
              </button>
            )}
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 px-2 ${
                  currentPage === pageNumber
                    ? "text-customBrown font-bold"
                    : "text-customBrown font-bold"
                } font-annie`}
              >
                {pageNumber}
              </button>
            ))}
            {chunkEnd < totalPages && (
              <button
                onClick={handleNextChunk}
                className="text-customBrown font-bold px-2"
              >
                &gt;
              </button>
            )}
            </div>
        
   
  <PlusCircleIcon
  onClick={Show}
    className="h-12 w-12 relative left-[33.5rem] bottom-[1.3rem] mr-[2.3rem] fill-customBrown cursor-pointer"
  />


          </div>
        </div>
        </div>
        </>
    )
}