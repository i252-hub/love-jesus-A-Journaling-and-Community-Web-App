import Navbar from "../components/Navbar"
import { PlusCircleIcon} from '@heroicons/react/24/solid';
import { Link} from "react-router-dom";



export default function TruthJournal(){
    return (
        <>
        <div className="bg-customYellow  h-[100vh] scrollbar-hide">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />

<div>

         <div className="h-full">
         <div  className="bg-customYellow relative top-[3rem]">
        <div className="w-full  h-[3em]  flex items-center justify-between pt-5">
         <div className="w-[15%] flex items-center justify-center gap-2">
         <img width="32" height="32" src="https://img.icons8.com/pastel-glyph/64/816f51/note.png" alt="note"/>                
         <img width="34" height="34" src="https://img.icons8.com/ios-filled/80/816f51/delicious.png" alt="delicious"/>
         <img width="42" height="42" src="https://img.icons8.com/carbon-copy/100/816f51/keep-clean.png" alt="keep-clean"/>
         </div> 
         <div className="mr-3">
            <Link to="/">
            <PlusCircleIcon className="w-9 h-9 fill-customBrown"/>
            </Link></div>
            </div>
            
            {/*
                  <div className="mr-5">
                    
                  <Link to="/journalentrytwo">
                   
                   <PlusCircleIcon className="w-9 h-9 fill-customBrown"/>
                   </Link>
                  
                  </div>*/}
                </div>
              </div>
              </div>
              </div>
             
             
          
         
      

        </>
       
    )
}