import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import StorageTwo from "../components/StorageTwo";
import { PlusCircleIcon, EllipsisVerticalIcon,XMarkIcon} from '@heroicons/react/24/solid';
import crown from '../assets/crown.png';
import sheep from '../assets/sheep.png';
import tree from '../assets/tree.png';
import whale from '../assets/whale.png';


export default function Blessings(){
   const [addnote, setAddNote] = useState(false);
   const [editIndex, setEditIndex] = useState<number | null>(null);
   const [option, setOption] = useState<{ [key: number]: boolean }>({});
   const [display, setDisplay] = useState<{title: string, content: string}[]>([]);
   const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
   const [message, setMessage] = useState(false);

   useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(getCurrentDate()) || "[]");
    setDisplay(storedNotes);
  }, []);

  function getCurrentDate() {
    return new Date().toISOString().split("T")[0]; 
  }

   function AddNote(){
    setAddNote(true);
    setCurrentNote({ title: "", content: "" });
    setEditIndex(null);
   }

   function Option(index: number){
    setOption((prev) => ({
      ...prev,
      [index]: !prev[index], 
    }));
   }

   function Display(e: React.ChangeEvent<HTMLTextAreaElement>){
    const {name, value} = e.target
    setCurrentNote((prev) => ({ ...prev, [name]: value }));
   }

   function Publish(){
    if (currentNote.title.trim() || currentNote.content.trim()) {
      let updatedNotes;
      if (editIndex !== null) {
        updatedNotes = display.map((note, i) =>
          i === editIndex ? currentNote : note
        );
        setEditIndex(null);
      } else {
        updatedNotes = [...display, currentNote];
      }
      setDisplay(updatedNotes);
      setAddNote(false);
      localStorage.setItem(getCurrentDate(), JSON.stringify(updatedNotes));
      setMessage(true);
    }
   }

   function editNote(index: number) {
    setCurrentNote(display[index]); 
    setAddNote(true);
    setEditIndex(index);
  }

  function deleteNote(index: number) {
    const updatedNotes = display.filter((_, i) => i !== index);
    setDisplay(updatedNotes);
    localStorage.setItem(getCurrentDate(), JSON.stringify(updatedNotes));
  }
   


    return (
        <>
        <div className="bg-customGradient scrollbar-hidden bg-cover bg-no-repeat min-h-screen relative mobile:flex mobile:justify-center  overflow-auto">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
      
      <div className="w-full h-[3rem] bg-transparent relative top-[3rem] flex items-center">
        <div className="w-[70%] h-full mobile:w-[45%]">
       
        </div>
        <div className="w-8 h-8 rounded-2xl bg-customBrown border-2 border-[#554B35] border-opacity-80"><img src = {crown} className="h-full w-full"/></div>
        <div className="w-8 h-8 rounded-2xl bg-customBrown relative right-[1rem] border-2 border-[#554B35] border-opacity-80"><img src = {sheep} className="h-full w-full"/></div>
        <div className="w-8 h-8 rounded-2xl bg-customBrown relative right-[2rem]"><img src = {tree} className="h-full w-full"/></div>
        <div className="w-8 h-8 rounded-2xl bg-customBrown relative right-[3rem]"><img src = {whale} className="h-full w-full"/></div>
      </div>

      <StorageTwo<{ title: string; content: string }> storageKey="blessings_notes" setNotes={setDisplay} />

      {!message && display.length === 0 && (
  <div className="w-full h-[50%] absolute z-5 top-[8rem] text-customBrown font-annie text-[3em] mobile:text-[2.5rem] mobile:text-center flex justify-center items-center">
  What Blessings did you receive?
  </div>

  )}
<div className="absolute flex flex-wrap mobile:flex-nowrap mobile:flex-col mobile:justify-center top-[6rem]">
 
        {display.length > 0 &&
            display.map((note, index) => (
 <div key={index} className="relative  w-[20rem] mobile:ml-0  ml-[3rem] mt-[3rem] bg-customYellow rounded-3xl shadow-custom">
 <div className="w-[90%]  flex justify-between items-center relative top-6 ml-3 pb-3">
   <div className="flex gap-2 items-center justify-center ">
   <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
   <p className="text-customBrown opacity-70 font-belle text-[1.1rem] ">sunflocode</p>

   </div>
   <EllipsisVerticalIcon 
   onClick={() => Option(index)}
   className="h-5 w-5 fill-customBrown cursor-pointer"/>

 </div>

   <div className="  max-w-[50%] ml-12 relative  flex flex-col flex-wrap">
    <div className="w-full">
    <h1 className="text-customBrown  text-stroke-3 font-annie text-[1.2rem] break-all whitespace-normal overflow-hidden">{note.title}</h1>
    </div>
    <div className="w-full">
    <p className="text-customBrown text-[1rem] font-annie break-all whitespace-normal overflow-hidden">{note.content}</p>

    </div>
 </div>
 
   
          
          {option[index] && (
            <div className="bg-[#554B35] h-[3rem] w-[4rem] absolute bottom-[4.5rem] left-[19rem] z-50 flex flex-col items-center justify-center">
              <div 
              onClick={() => editNote(index)}
              className="w-[80%] flex justify-center items-center text-white font-annie border-b-[1px]  border-white cursor-pointer">Edit</div>
              <div 
              onClick={() => deleteNote(index)}
              className="w-[80%] flex justify-center items-center text-white font-annie cursor-pointer">Delete</div>
            </div>
          )}
         </div>
           
          ))}
</div>
         <div className="w-full flex justify-end items-end absolute">
         {addnote &&(
          <div className="w-[25rem] h-[22.3rem] mobile:h-[100vh] mobile:pb-0 mobile:top-[16.5rem] mobile:right-0 mobile:w-full   absolute top-[12.5rem]  right-[5.5rem] bg-customYellow border-2 border-customBrown pb-5 mobile:z-40 ">
           <div className="flex justify-end">
           
           <XMarkIcon 
           onClick={() => setAddNote(false)}
           className="h-6 w-6 mr-1 relative top-[2px] fill-customBrown cursor-pointer"/> 

           </div>
           
             <textarea 
             className="w-full h-20 text-[1.5rem] resize-none overflow-hidden bg-transparent border-b-2 border-customBrown focus:outline-none font-annie text-stroke-2 focus:text-stroke-2 focus:text-customBrown text-customBrown pl-2"
            maxLength={94}
             rows={2}
             name="title"
             value = {currentNote.title}
             placeholder="What's the gift?"
             onChange={Display}>What's the gift?</textarea>
               <textarea 
             className="w-full h-[60%]  text-[1rem] resize-none overflow-hidden bg-transparent focus:outline-none focus:text-customBrown font-annie text-customBrown pl-2 text-stroke-2 focus:text-stroke-2"
            maxLength={window.innerWidth <= 768 ? 900 : 210}
             rows={2}
             name="content"
             value = {currentNote.content}
             placeholder="Tell us about the gift :)"
             onChange={Display}>Tell us about it :)</textarea>
            
            <div className="flex justify-end items-center w-full relative top-[4rem]">
            <button 
            onClick={Publish}
            className="bg-customBrown text-white font-annie pl-5 pr-5 h-[2rem] mr-2 rounded-2xl">Publish</button>

            </div>
      
          </div>
  )}
               <PlusCircleIcon 
         onClick={AddNote}
         className="h-12 w-12 fixed left-[95%] mobile:left-[85%] bottom-[1.3rem] mr-[2.3rem] fill-customBrown cursor-pointer"/>
       
         </div>
       
         </div>
         
         
        </>
    )
}