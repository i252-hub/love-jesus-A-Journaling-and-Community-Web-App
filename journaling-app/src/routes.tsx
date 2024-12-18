import Home from "./pages/home";
import GratitudeJournal from "./pages/gratitudejournal";
import PrayerJournal from "./pages/prayerjournal";
import TruthJournal from "./pages/truthjournal";
import Blessings from "./pages/blessings";
import PrayerReq from "./pages/prayreq";
import Testimonial from "./pages/test";
import About from "./pages/about";

const routes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "prayer",
        element: <PrayerJournal/>
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
 

]

export default routes;