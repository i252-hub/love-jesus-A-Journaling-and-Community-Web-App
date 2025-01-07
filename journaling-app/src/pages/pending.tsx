import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom";

interface Entry {
    title: string;
    description: string;
    status: string;
  }

export default function Pending(){
    const location = useLocation();
    const { entry }: { entry?: Entry } = location.state || {}; 
    if (!entry) {
        return <div>No pending entry found.</div>;
      }
      console.log(entry);
      console.log(entry.title)
       return (
        
        <>
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />

      {/*<div></div>
        <div>
        <div>
        <input/>
        <div></div>
        </div> */}  

        <button>Pending</button>
           
       <div>
        <div>
        <h3>{entry.title}</h3>
        <p>{entry.description} + {entry.title}</p>
        </div>
       </div>

       <div></div>
       
        </>
    )
}