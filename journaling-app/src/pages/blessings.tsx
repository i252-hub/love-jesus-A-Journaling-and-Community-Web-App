import Navbar from "../components/Navbar"

export default function Blessings(){
    return (
        <>
        <div className="bg-customGradient  h-[100vh] scrollbar-hide ">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
         <h1 className="relative top-[5rem]">This is Blessings Community</h1>
         </div>
        </>
    )
}