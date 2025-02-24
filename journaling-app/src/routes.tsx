import Home from "./pages/home";
import GratitudeJournal from "./pages/gratitudejournal";
import TruthJournal from "./pages/truthjournal";
import Blessings from "./pages/blessings";
import PrayerReq from "./pages/prayreq";
import Testimonial from "./pages/test";
import About from "./pages/about";
import Storage from "./components/Storage";
import PrayerJournal from "./pages/prayerjournal";
import InfiniteCanvas from "./components/InfiniteCanvas";
import ViewTest from "./pages/viewtest";
import Sign from "./components/Signin";
import SignUp from "./components/Signup";

const routes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "prayer",
        element: <PrayerJournal />
    },
    {
        path: "truth",
        element: <TruthJournal/>
    },
    {
        path: "gratitude",
        element: <GratitudeJournal/>
    },
    {
        path: "blessings",
        element: <Blessings/>
    },
    {
        path: "prayreq",
        element: <PrayerReq/>
    },
    {
        path: "test",
        element: <Testimonial/>
    },
    {
        path: "about",
        element: <About/>
    },
    {
        path: "journalentry",
        element: <Storage/>
    },
    {
        path: "journalentrytwo",
        element: <Storage/>
    },
    {
        path: "journalentrythree",
        element: <Storage/>
    },
    {
        path: "infinitecanvas",
        element: <InfiniteCanvas width={window.innerWidth} height={window.innerHeight}/>
    },
    {
        path: "viewtest",
        element: <ViewTest/>
    },
    {
        path: "signin",
        element: <Sign/>
    },
    {
        path: "signup",
        element: <SignUp/>
    },
   
 

]

export default routes;