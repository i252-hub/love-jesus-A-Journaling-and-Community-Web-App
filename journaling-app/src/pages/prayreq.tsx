import Navbar from "../components/Navbar"
import { PlusCircleIcon} from '@heroicons/react/24/solid';
import { useState } from "react";


export default function PrayerReq(){

  const [addReq, setAddReq] = useState(false);
  const [note, setNote] = useState<{text: string}[]>([]);
  const [currentNote, setCurrentNote] = useState({ text: ""});



  function Show(){
    setAddReq(true)
  }

  function Publish(){
    if (currentNote.text.trim()) {
      setNote((prev) => {
        if (prev.length < 8) {
          return [...prev, currentNote]; 
        }
        return prev; 
      }); 
      setCurrentNote({ text: "" });
      setAddReq(false);
    }
   }

   function UniqueID(e: React.ChangeEvent<HTMLTextAreaElement>){
    const {name, value} = e.target
    setCurrentNote((prev) => ({ ...prev, [name]: value }));
   }


    return (
        <>
       <div className="bg-customGradient  h-[100vh] scrollbar-hide overflow-hidden"
       >
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
        <div className="relative top-[3rem] flex flex-col items-center h-full"
        > 
          <div className="w-full  text-[2rem] font-belle flex justify-center pt-8 pb-1 text-white">Daily Prayer Wall</div>
          <div className="w-[70%] grid grid-rows-8 h-[70%]">

          {note.length <= 8 &&
          note.map((notes, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 items-center 
                    ${index % 2 === 0 ? 'bg-[#554B35] bg-opacity-50' : 'bg-[#BCA983]'}`}
                > 
                <div className="flex flex-col ">
                  <div className="text-white font-belle h-full relative top-1 ml-3"> sunflocode</div>
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
          <div className="flex justify-center w-full items-center ">
            <p className="relative left-[3rem] text-[#2A2424] font-annie">1 2 3</p>
            <PlusCircleIcon
              onClick={Show}
              className="h-12 w-12 relative left-[33.5rem] fill-customBrown cursor-pointer"/>
          </div>
        </div>
        </div>
        </>
    )
}