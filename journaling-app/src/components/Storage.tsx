import { useState, useEffect} from "react";
import JournalEntry from "../pages/journalentry";
import { useNavigate } from "react-router-dom";

interface JournalEntry {
    title: string;
    description: string;
    status: string;
    date: string; 
}


const Storage = () => {
const [entries, setEntries] = useState<JournalEntry[]>([]);
const navigate = useNavigate();
const [isEntrySaved, setIsEntrySaved] = useState(false);
    
const saveEntry = (entry: JournalEntry) => {
    const entryWithDate = {
        ...entry,
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date()),
    };
    console.log("saveEntry invoked:", entryWithDate);
    setIsEntrySaved(true);

    setEntries(prevEntries => {
        const updatedEntries = [entryWithDate, ...prevEntries ]
    try {
        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
        console.log("Entries saved to localStorage:", updatedEntries);
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
      const updatedEntriesFromLocalStorage = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      setEntries(updatedEntriesFromLocalStorage);
      return updatedEntries;
});
};

useEffect(() => {
const savedEntries = localStorage.getItem('journalEntries')
if (savedEntries) {
    try {
        const parsedEntries =  JSON.parse(savedEntries).map((entry: Partial<JournalEntry>) => ({
            ...entry,
            date: entry.date ? 
            (isNaN(Date.parse(entry.date)) ? 
                entry.date : 
                new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(entry.date))) 
            : new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date()),
    
        }));
        const reversedEntries = parsedEntries.reverse();
        
                setEntries(reversedEntries);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }
    else {
        console.log("No saved entries found in localStorage.");
    }

}, [])

useEffect(() => {
    if (isEntrySaved) {
        setIsEntrySaved(false);
    }

    const pendingEntries = entries.filter((entry) => entry.status == "pending");
    if (pendingEntries.length > 0) {
        navigate("/pending");
    }
   
}, [entries, navigate, isEntrySaved]);

return(
    <div>
        <JournalEntry onSave={saveEntry} />


<ul>
    {entries
        .filter((entry) => entry.status == "pending" || entry.status == "answered") 
        .map((entry, index) => (
            <li key={index}>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <p>Status: {entry.status}</p>
            </li>
        ))}
</ul>
       
    </div>
)
};
export default Storage;