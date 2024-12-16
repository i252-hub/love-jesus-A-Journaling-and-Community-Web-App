import Navbar from "../components/Navbar";


export default function Home(){
    return(
        <>
        <div className="bg-customYellow">
        <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
        </div>
        
        </>
    )
}
