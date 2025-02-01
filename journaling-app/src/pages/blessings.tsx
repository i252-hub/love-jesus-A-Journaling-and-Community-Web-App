import { useState } from "react";
import Navbar from "../components/Navbar"
import { PlusCircleIcon, EllipsisVerticalIcon,XMarkIcon} from '@heroicons/react/24/solid';

export default function Blessings(){
   const [addnote, setAddNote] = useState(false);
   const [option, setOption] = useState(false)

   function AddNote(){
    setAddNote(true);
   }

   function Option(){
    setOption((prev)=> !prev);
   }
    return (
        <>
        <div className="bg-customGradient  h-[100vh] scrollbar-hide overflow-hidden">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
        <div className="relative top-[3rem]  h-full">

         <div className="relative top-[3rem] w-[18.5rem] h-[10rem] ml-5 bg-customYellow rounded-3xl shadow-custom">
          <div className="w-[90%]  flex justify-between items-center relative top-3 ml-3 pb-3">
            <div className="flex gap-2 items-center justify-center ">
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <p className="text-customBrown opacity-70 font-belle text-[1.1rem] ">sunflocode</p>

            </div>
            <EllipsisVerticalIcon 
            onClick={Option}
            className="h-5 w-5 fill-customBrown cursor-pointer"/>

          </div>
          <div className="h-full w-full ml-12">
            <h1 className="text-customBrown text-stroke-3 font-annie text-[1.2rem]">Answered Prayer</h1>
            <p className="text-customBrown text-[1rem] font-annie">Lorem ipsum dolor</p>
          </div>
          {option && (
            <div className="bg-[#554B35] h-[4rem] w-20 relative bottom-[12rem] left-[17.5rem] flex flex-col items-center justify-center">
              <div className="w-[80%] flex justify-center items-center text-white font-annie border-b-[1px]  border-white cursor-pointer">Edit</div>
              <div className="w-[80%] flex justify-center items-center text-white font-annie cursor-pointer">Delete</div>
            </div>
          )}
         </div>
         <div className="w-full flex justify-end items-center ml-[-3rem] sticky top-[40rem] h-[70%]">
         {addnote &&(
          <div className="w-[25rem] h-[22.3rem] relative bottom-[2.8rem] bg-customYellow border-2 border-customBrown">
           <div className="flex justify-end">
           
           <XMarkIcon 
           onClick={() => setAddNote(false)}
           className="h-6 w-6 mr-1 relative top-[2px] fill-customBrown cursor-pointer"/> 

           </div>
           
             <textarea 
             className="w-full h-20 text-[1.5rem] resize-none overflow-hidden bg-transparent border-b-2 border-customBrown focus:outline-none font-annie text-stroke-2 focus:text-stroke-2 focus:text-customBrown text-customBrown pl-2"
            maxLength={64}
             rows={2}>What's the gift?</textarea>
               <textarea 
             className="w-full h-[76%] text-[1rem] resize-none overflow-hidden bg-transparent focus:outline-none focus:text-customBrown text-customBrown pl-2 text-stroke-2 focus:text-stroke-2"
            maxLength={210}
             rows={2}>Tell us about it :)</textarea>
            
        
           
          </div>
  )}
         
         <PlusCircleIcon 
         onClick={AddNote}
         className="h-12 w-12 relative top-[7rem] fill-customBrown cursor-pointer"/>
         </div>
         
         </div>
         </div>
        </>
    )
}