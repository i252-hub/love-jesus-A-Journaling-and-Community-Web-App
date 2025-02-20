import Navbar from "../components/Navbar"
import { useEffect, useState} from "react";
import Icon from '@mdi/react';
import { mdiMagnify} from '@mdi/js';
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon} from '@heroicons/react/24/solid';


interface Entry {
  title: string;
  description: string;
  status: string;
  date: string
}
export default function GratitudeJournal(){

  const navigate = useNavigate();


  const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);

  const handleEditEntry = (entry: Entry) => {
      navigate("/journalentrytwo", { state: { entry } });
    };

  useEffect(() => {
      const savedEntries = localStorage.getItem("journalEntriesTwo");
      if (savedEntries) {
        try {
          const parsedEntries: Entry[] = JSON.parse(savedEntries);

          setFilteredEntries(parsedEntries)
          
          setEntries(parsedEntries); 
        } catch (error) {
          console.error("Failed to parse localStorage data:", error);
        }
      }
    }, []);
 
  console.log("Entries:", entries);



    useEffect(() => {
      const filtered = entries.filter(entry => 
        
        (entry.title.toLowerCase().includes(search.toLowerCase()) || 
        entry.description.toLowerCase().includes(search.toLowerCase()) ||
        entry.date.toLowerCase().includes(search.toLowerCase()))
       
      );
      
      setFilteredEntries(filtered);
    }, [search, entries]); 
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearch(query); 
    };

    

    const entriesToDisplay = search ? filteredEntries : filteredEntries.slice(0, 4);
    return (
      <div className="bg-customYellow  h-[100vh] scrollbar-hide">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
         />

<div>
        <div className="h-full">
         
            <div  className="bg-customYellow">
              <div className="relative top-[3rem] flex justify-center items-center h-[5em]">
                <div className="flex justify-between items-center w-full ">
                  <div>
                    <input 
                    value={search}
                    onChange={handleSearchChange}
                    className="ml-3 absolute rounded-2xl mobile:pt-2  w-[10rem] mobile:w-[80%] pl-2 text-left caret-transparent focus:font-annie text-customBrown"
                    />
                    <div className="bg-customBrown mobile:h-8 h-6 w-7 rounded-r-2xl relative left-[9rem]  mobile:left-[18rem] flex justify-center items-center">
                      <Icon path={mdiMagnify} size={0.8} color="white" />
                    </div>
                  </div>
                  <div className="mr-5">
                  <Link to="/journalentrytwo">
                   
                   <PlusCircleIcon className="w-9 h-9 mobile:h-10 mobile:w-10 fill-customBrown relative left-2"/>
                   </Link>
                  
                  </div>
                </div>
              </div>
             
              <div  className="relative top-[3rem] h-full bg-customYellow">
              {entriesToDisplay.length > 0 ? (
              entriesToDisplay.map((entry, index) => (
                <div key={index} className="bg-customYellow h-[8em]"
                onClick={()=> handleEditEntry(entry)}>
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
              <h1 className="text-[3em] mobile:text-[2.5rem] mobile:text-center font-annie text-textBrownish">Give Thanks To The Lord</h1>
              </div>
            )}
             </div>
              </div>
         
        </div>
      </div>
    </div>
    )
}