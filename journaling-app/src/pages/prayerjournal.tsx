import Navbar from "../components/Navbar"
import { useEffect, useState} from "react";
import Icon from '@mdi/react';
import { mdiMagnify} from '@mdi/js';
import { PlusCircleIcon} from '@heroicons/react/24/solid';
import { Link, useNavigate } from "react-router-dom";


interface Entry {
    title: string;
    description: string;
    status: string;
    date: string
  }

export default function PrayerJournal(){
    const navigate = useNavigate();


    const [entries, setEntries] = useState<Entry[]>([]);
    const [search, setSearch] = useState("");
    const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
    const [stats, setStats] = useState("Pending");

    const handleEditEntry = (entry: Entry, index: number) => {
        navigate("/journalentry", { state: { entry, index } });
      };

    useEffect(() => {
        const savedEntries = localStorage.getItem("journalEntries");
        if (savedEntries) {
          try {
            const parsedEntries: Entry[] = JSON.parse(savedEntries);
            const pendingEntries = parsedEntries.filter(entry => entry.status === "pending");

            setFilteredEntries(pendingEntries)
            
            setEntries(parsedEntries); 
          } catch (error) {
            console.error("Failed to parse localStorage data:", error);
          }
        }
      }, []);
   
    console.log("Entries:", entries);

  

      useEffect(() => {
        const filtered = entries.filter(entry => 
            entry.status.toLowerCase() === stats.toLowerCase() &&
          (entry.title.toLowerCase().includes(search.toLowerCase()) || 
          entry.description.toLowerCase().includes(search.toLowerCase()) ||
          entry.date.toLowerCase().includes(search.toLowerCase()))
         
        );
        
        setFilteredEntries(filtered);
      }, [search, entries, stats]); 
    
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query); 
      };

      const ChangeStat = () =>{
        setStats((prev)=> (prev == "Pending" ? "Answered" : "Pending"));
      }

   
      

      const entriesToDisplay = search ? filteredEntries : filteredEntries.slice(0, 4);

       return (
       
        <div className="bg-customYellow  h-[100vh] scrollbar-hide">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />

<div>
        <div className="h-full">
         
            <div  className="bg-customYellow">
              <div className="relative top-[3rem] flex justify-center items-center h-[5em]">
                <div className="flex justify-between items-center w-full mobile:flex-col mobile:gap-2 ">
                  <div className="mobile:flex mobile:justify-center">
                    <input 
                    value={search}
                    onChange={handleSearchChange}
                    className="ml-3 absolute rounded-2xl w-[10rem] mobile:w-[90%] mobile:pt-1 pl-2 text-left caret-transparent focus:font-annie text-customBrown"
                    />
                    <div className="bg-customBrown h-6 w-7 rounded-r-2xl relative left-[9rem] mobile:left-[10rem] mobile:h-7 flex justify-center items-center">
                      <Icon path={mdiMagnify} size={0.8} color="white" />
                    </div>
                  </div>
                  <div className="flex gap-3 mr-[7rem] mobile:justify-end mobile:w-full mobile:mr-0">
                    <Link to="/journalentry">
                   
        <PlusCircleIcon className="w-9 h-9 tablet:w-8 tablet:h-8  fill-customBrown"/>
        </Link>
                   
                    <button 
                    onClick={ChangeStat}
                    className="mr-8 tablet:ml-[3rem] bottom-[1.7rem] bg-customBrown pr-8 pl-8 pt-[2px] pb-[2px]    tablet:pr-5 tablet:pl-5 tablet:pt-0 tablet:absolute text-white font-annie">
                      {stats}
                    </button>
                  </div>
                </div>
              </div>
             
              <div  className="relative top-[3rem] h-full bg-customYellow">
              {entriesToDisplay.length > 0 ? (
              entriesToDisplay.map((entry, index) => (
                <div key={index} className="bg-customYellow h-[8em]"
                onClick={()=> handleEditEntry(entry, index)}>
                  <div className="ml-5">
                    <h1 className="text-[2rem] font-annie text-customBrown leading-8">{entry.title}</h1>
                    <h2 className="text-customBrown font-annie text-[1.2rem]">{entry.date}</h2>
                    <h2 className="text-customBrown font-annie text-[1.2rem]">{entry.status}</h2>
                    <p className="font-annie text-customBrown">{entry.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full relative top-[8em]">
              <h1 className="text-[3em] mobile:text-[2.3rem] mobile:text-center font-annie text-textBrownish mobile:flex mobile:justify-center mobile:items-center">Prayer is your conversation with God</h1>
              </div>
            )}
             </div>
              </div>
         
        </div>
      </div>
    </div>
  );
}