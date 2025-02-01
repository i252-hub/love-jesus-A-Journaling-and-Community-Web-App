import Navbar from "../components/Navbar"
import { PlusCircleIcon} from '@heroicons/react/24/solid';
import { useState } from "react";


export default function PrayerReq(){

  const [addReq, setAddReq] = useState(false)

  function Show(){
    setAddReq(true)
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
          <div className="w-full  text-[2rem] font-belle flex justify-center pt-8 pb-1 text-white">Prayer Wall</div>
          <div className="flex justify-center w-[70%] bg-black h-[70%]"></div>
            
         
           {addReq && (
            <>
          <div className= 'fixed inset-0 backdrop-blur-md bg-black bg-opacity-50 z-40'></div>

          <div className="h-[60%] w-[30%] z-50 bg-customYellow absolute top-[10%] left-[37%] pb-2" >
          <textarea 
             className="w-full h-[90%] text-[1rem] font-annie resize-none overflow-hidden bg-customYellow  focus:outline-none focus:text-customBrown text-customBrown pl-2 text-stroke-2 focus:text-stroke-2"
            maxLength={840}
             rows={2}>Present your requests</textarea>
             <div className="flex justify-end gap-2 mr-3">
             <button className="p-1 pl-5 pr-5 rounded-2xl bg-customBrown text-white font-annie"
             onClick={() => setAddReq(false)}>Cancel</button>
             <button className="p-1 pl-5 pr-5 rounded-2xl bg-customBrown text-white font-annie">Publish</button>

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