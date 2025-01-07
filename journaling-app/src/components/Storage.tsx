import { useState, useEffect} from "react";
import JournalEntry from "../pages/journalentry";
import { useNavigate } from "react-router-dom";


const Storage = () => {
const [entries, setEntries] = useState<{ title: string, description: string, status: string }[]>([]);
const navigate = useNavigate();
const [isEntrySaved, setIsEntrySaved] = useState(false);

const saveEntry = (entry: { title: string, description: string, status: string }) => {
    
    console.log("saveEntry invoked:", entry);
    setIsEntrySaved(true);

    setEntries(prevEntries => {
        const updatedEntries = [...prevEntries, entry]
    try {
        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
        console.log("Entries saved to localStorage:", updatedEntries);
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }

      return updatedEntries;
});
};

useEffect(() => {
const savedEntries = localStorage.getItem('journalEntries')
if (savedEntries) {
    try {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
        console.log("Entries loaded from localStorage:", parsedEntries);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }
    else {
        console.log("No saved entries found in localStorage.");
    }

}, [])
console.log("saveEntry function being passed:", saveEntry);

useEffect(() => {
    if (isEntrySaved) {
        setIsEntrySaved(false);
    }

    entries.forEach((entry) => {
        if (entry.status === "pending") {
            navigate("/pending", { state: { entry } });
        }
    });
}, [entries, navigate, isEntrySaved]);

return(
    <div>
        <JournalEntry onSave={saveEntry} />

        <h2>saved entries</h2>
        <h2>Saved Entries (Will not display immediately):</h2>

<ul>
    {entries
        .filter((entry) => entry.status == "pending") 
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