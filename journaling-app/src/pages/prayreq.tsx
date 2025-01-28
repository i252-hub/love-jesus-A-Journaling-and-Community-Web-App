import Navbar from "../components/Navbar"

export default function PrayerReq(){
    return (
        <>
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />
         <h1>This is Prayer Reqs Community</h1>

         <div className="relative top-[5rem]">This is prayer wall</div>
        </>
    )
}