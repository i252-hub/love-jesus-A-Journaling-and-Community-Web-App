import Navbar from "../components/Navbar"
import AddButton from "../components/AddButton"

export default function PrayerJournalIntro(){
    return (
        <>
        <div className="bg-customYellow w-full h-screen  overflow-hidden">
       
         <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in'/>

        

        <div className="flex flex-col items-center justify-center h-full ">
        <h1 className="text-[3em] font-annie text-textBrownish">Prayer is your conversation with God</h1>
        <AddButton />
        </div>
       
        </div>
       
        </>
       
    )
}