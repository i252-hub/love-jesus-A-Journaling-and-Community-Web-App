import Navbar from "../components/Navbar"
import { PlusCircleIcon} from '@heroicons/react/24/solid';

export default function Blessings(){
   
    return (
        <>
        <div className="bg-customGradient  h-[100vh] scrollbar-hide overflow-hidden">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
        <div className="relative top-[3rem]  h-full">

         <h1 className="relative top-[5rem]">This is Blessings Community</h1>
         <div className="w-full flex justify-end items-center ml-[-3rem] sticky top-[40rem] h-[70%]">
          <div className="w-[25rem] h-[22.3rem] relative bottom-[2.8rem] bg-customYellow border-2 border-customBrown">
            <textarea 
            className="w-full h-20 text-[1.5rem] resize-none overflow-hidden bg-transparent border-b-2 border-customBrown focus:outline-none font-annie text-stroke-2 focus:text-stroke-2 focus:text-customBrown text-customBrown pl-2"
           maxLength={64}
            rows={2}>What's the gift?</textarea>
              <textarea 
            className="w-full h-[76%] text-[1rem] resize-none overflow-hidden bg-transparent focus:outline-none focus:text-customBrown text-customBrown pl-2 text-stroke-2 focus:text-stroke-2"
           maxLength={210}
            rows={2}>Tell us about it :)</textarea>
          </div>
         <PlusCircleIcon className="h-12 w-12 relative top-[7rem] fill-customBrown"/>
         </div>
         
         </div>
         </div>
        </>
    )
}