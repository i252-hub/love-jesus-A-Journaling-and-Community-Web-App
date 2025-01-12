import Home from "./pages/home";
import GratitudeJournal from "./pages/gratitudejournal";
import PrayerJournalIntro from "./pages/prayerjournalintro";
import TruthJournal from "./pages/truthjournal";
import Blessings from "./pages/blessings";
import PrayerReq from "./pages/prayreq";
import Testimonial from "./pages/test";
import About from "./pages/about";
import Storage from "./components/Storage";
import PrayerJournal from "./pages/prayerjournal";

const routes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "prayer",
        element: <PrayerJournalIntro/>
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
        path: "prayerjournal",
        element: <PrayerJournal />
    }
 

]

export default routes;