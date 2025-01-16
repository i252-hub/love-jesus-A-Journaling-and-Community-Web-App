import { useState, useEffect, useCallback} from "react";
import JournalEntry from "../pages/journalentry";
import JournalEntryTwo from "../pages/journalentrytwo";
import { useNavigate, useLocation } from "react-router-dom";
import prompts from "../promptsetone.json";

interface Entry {
    id: string | undefined;
    title: string;
    description: string;
  }
  
  interface JournalEntry extends Entry {
    status: string;
    date: string;
  }
  
  interface JournalEntryTwo extends Entry {
    date: string;
    dailyPrompt?: string;
  }


const Storage = () => {
const [entries, setEntries] = useState<JournalEntry[]>([]);
const [entriesTwo, setEntriesTwo] = useState<JournalEntryTwo[]>([]);
const [dailyPrompt, setDailyPrompt] = useState<string>("");

const navigate = useNavigate();
const location = useLocation();
const [isEntrySaved, setIsEntrySaved] = useState(false);


const localStorageKey =
location.pathname === "/journalentrytwo" ? "journalEntriesTwo" : "journalEntries";

const hash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const generateDailyPrompt = useCallback(() => {
    const currentDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date())
    const storedDate = localStorage.getItem("lastPromptDate");

    if (storedDate !== currentDate) {
      const hashValue = hash(currentDate);
      const randomIndex = hashValue % prompts.length;
      const prompt = prompts[randomIndex];

      localStorage.setItem("dailyPrompt", prompt);
      localStorage.setItem("lastPromptDate", currentDate);
      return prompt;
    }
    return localStorage.getItem("dailyPrompt") || "";
  }, []);

  useEffect(() => {
    const dailyPromptForToday = generateDailyPrompt();
    setDailyPrompt(dailyPromptForToday);
  }, [generateDailyPrompt]);

const saveEntryCommon = <T extends Entry>(
    entry: T,
    setEntriesCallback: React.Dispatch<React.SetStateAction<T[]>>,
    isEditMode: boolean
  ) => {
const dailyPromptForDate = generateDailyPrompt();
const entryWithDate = {
  ...entry,
  date: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date()),
  id: isEditMode ? entry.id : Date.now().toString(),
  dailyPrompt: dailyPromptForDate,
};
console.log("saveEntry invoked:", entryWithDate);
setIsEntrySaved(true);

setEntriesCallback((prevEntries) => {
    console.log("Previous entries:", prevEntries);

 let updatedEntries = [entryWithDate, ...prevEntries];
 if (isEditMode) {
    updatedEntries = prevEntries.map((existingEntry) =>
      existingEntry.id === entryWithDate.id ? entryWithDate : existingEntry
    );
  } else {
    updatedEntries = [entryWithDate, ...prevEntries];
  }

console.log("Saving entry with ID:", entryWithDate.id);
console.log("Updated entries:", updatedEntries);
 
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(updatedEntries));
    console.log("Entries saved to localStorage:", updatedEntries);
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
  return updatedEntries;
});

if (location.pathname.includes("journalentrytwo") || location.pathname.includes("entrytwo")) {
    navigate("/gratitude"); 
  } else {
    navigate("/prayerjournal"); 
  }
};

useEffect(() => {
const savedEntries = localStorage.getItem(localStorageKey);
if (savedEntries) {
  try {
    const parsedEntries = JSON.parse(savedEntries).map((entry: Partial<JournalEntry>, index:number) => ({
      ...entry,
      date: entry.date
        ? isNaN(Date.parse(entry.date))
          ? entry.date
          : new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(entry.date))
        : new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
        id: entry.id || `${Date.now()}-${index}`,

    }));
    if (location.pathname === "/journalentrytwo") {
        setEntriesTwo(parsedEntries);
      } else {
        setEntries(parsedEntries);
      }
  } catch (error) {
    console.error("Failed to parse localStorage data:", error);
  }
} else {
  console.log("No saved entries found in localStorage.");
}
}, [localStorageKey, location.pathname]);

useEffect(() => {
if (isEntrySaved) {
  setIsEntrySaved(false);
}
if (location.pathname !== "/journalentrytwo") {
  const pendingEntries = entries.filter((entry) => entry.status === "pending");
  if (pendingEntries.length > 0) {
    navigate("/gratitude");
  }
}
}, [entries, navigate, isEntrySaved, location.pathname]);

const removeDuplicateIds = () => {
    const savedEntries = localStorage.getItem(localStorageKey);
    if (savedEntries) {
      const parsedEntries: JournalEntry[] = JSON.parse(savedEntries);
      const uniqueEntries = Array.from(new Map(parsedEntries.map((entry: JournalEntry) => [entry.id, entry])).values());
      localStorage.setItem(localStorageKey, JSON.stringify(uniqueEntries));
    }
  };
  removeDuplicateIds();
  

return(
   
    <div>
  {location.pathname === "/journalentrytwo" ? (
        <JournalEntryTwo
        onSave={(entry:JournalEntryTwo, isEditMode: boolean) =>
          saveEntryCommon(entry, setEntriesTwo, isEditMode)
        }
        />
      ) : (
        <JournalEntry
          onSave={(entry: JournalEntry, isEditMode: boolean) =>
            saveEntryCommon(entry, setEntries, isEditMode)
          }
        />
      )}

<ul>
{(location.pathname === "/journalentrytwo" ? entriesTwo : entries)
          .filter((entry) => {
            if ("status" in entry) {
        
              return (entry as JournalEntry).status === "pending" || (entry as JournalEntry).status === "answered";
            }
            return true; 
          }).map((entry, index) => (
            <li key={entry.id || index}>
                <h3 className="hidden">{entry.title}</h3>
                <p className="hidden">{entry.description}</p>
                {"status" in entry && typeof entry.status === "string" && (
              <p>Status: {entry.status}</p>
            )}
            </li>
        ))}
</ul>
       
    </div>
)
};
export default Storage;