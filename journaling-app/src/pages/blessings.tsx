import { useState } from "react";
import Navbar from "../components/Navbar"
import { PlusCircleIcon, EllipsisVerticalIcon,XMarkIcon} from '@heroicons/react/24/solid';

export default function Blessings(){
   const [addnote, setAddNote] = useState(false);
   const [option, setOption] = useState(false);
   const [display, setDisplay] = useState<{title: string, content: string}[]>([]);
   const [published, setPublished] = useState(false)
   const [currentNote, setCurrentNote] = useState({ title: "", content: "" });

   function AddNote(){
    setAddNote(true);
    setCurrentNote({ title: "", content: "" });
   }

   function Option(){
    setOption((prev)=> !prev);
   }

   function Display(e: React.ChangeEvent<HTMLTextAreaElement>){
    const {name, value} = e.target
    setCurrentNote((prev) => ({ ...prev, [name]: value }));

   }

   function Publish(){
    if (currentNote.title.trim() || currentNote.content.trim()) {
      setDisplay((prev) => [...prev, currentNote]); 
      setAddNote(false);  
      setPublished(true)
   }
   }
    return (
        <>
        <div className="bg-customGradient scrollbar-hidden bg-cover bg-no-repeat min-h-screen relative overflow-auto">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
      
   
<div className="absolute flex flex-wrap top-3">
        {published &&
            display.map((note, index) => (
 <div key={index} className="relative  w-[20rem]  ml-5 mt-[3rem] bg-customYellow rounded-3xl shadow-custom">
 <div className="w-[90%]  flex justify-between items-center relative top-6 ml-3 pb-3">
   <div className="flex gap-2 items-center justify-center ">
   <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
   <p className="text-customBrown opacity-70 font-belle text-[1.1rem] ">sunflocode</p>

   </div>
   <EllipsisVerticalIcon 
   onClick={Option}
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
 
   
          
          {option && (
            <div className="bg-[#554B35] h-[4rem] w-20 relative bottom-[12rem] left-[17.5rem] flex flex-col items-center justify-center">
              <div className="w-[80%] flex justify-center items-center text-white font-annie border-b-[1px]  border-white cursor-pointer">Edit</div>
              <div className="w-[80%] flex justify-center items-center text-white font-annie cursor-pointer">Delete</div>
            </div>
          )}
         </div>
           
          ))}
</div>
         <div className="w-full flex justify-end items-end absolute">
         {addnote &&(
          <div className="w-[25rem] h-[22.3rem] absolute top-[15.5rem]  right-[5.5rem] bg-customYellow border-2 border-customBrown pb-5">
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
             className="w-full h-[60%] text-[1rem] resize-none overflow-hidden bg-transparent focus:outline-none focus:text-customBrown font-annie text-customBrown pl-2 text-stroke-2 focus:text-stroke-2"
            maxLength={210}
             rows={2}
             name="content"
             value = {currentNote.content}
             placeholder="Tell us about the gift :)"
             onChange={Display}>Tell us about it :)</textarea>
            
            <div className="flex justify-end items-center w-full">
            <button 
            onClick={Publish}
            className="bg-customBrown text-white font-annie pl-5 pr-5 h-[2rem] mr-2 rounded-2xl">Publish</button>

            </div>
           
          </div>
  )}
         
         <PlusCircleIcon 
         onClick={AddNote}
         className="h-12 w-12 fixed top-[35rem] mr-[2rem] fill-customBrown cursor-pointer"/>
         </div>
         
         </div>
         
        </>
    )
}