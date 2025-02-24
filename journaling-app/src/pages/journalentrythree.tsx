import React from "react";
import { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

type EntryThree = {
    description: string | string[];
    date: string;
    id: string;

};

type JournalEntryThreeProps = {
  onSave: (entry: EntryThree, isEditMode: boolean) => void;
}

const JournalEntryThree: React.FC<JournalEntryThreeProps> = ({ onSave }) => {
    
  const navigate = useNavigate();
    const location = useLocation();
    const existingEntry = location.state?.entry as EntryThree | undefined;

    const [textareaValue, setTextAreaValue] = useState( existingEntry?.description || '');


    const TextAreaChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(e.target.value);
   

    const isEditMode = !!existingEntry;

    const current = new Date();
    const FormattedDate = `${current.toLocaleString("en-US", {
        month: "long"})}  ${current.getDate()},
      ${current.getFullYear()}`

       const generateUniqueId = (): string => {
              return uuidv4(); 
            };
      
  
  



const HandleSave = () => {
        
  if(typeof textareaValue === "string" && textareaValue.trim()){

      const entry: EntryThree = {
          description: textareaValue.split('\n'),
          date: existingEntry?.date || FormattedDate,  
          id: existingEntry?.id || generateUniqueId(),    
          };

        const updatedEntries = [...(location.state?.entries || []), entry];
        if (isEditMode) {
          const entryIndex = updatedEntries.findIndex(
            (e) => e.title === existingEntry.id && e.date === existingEntry.date
          );
          if (entryIndex > -1) updatedEntries[entryIndex] = entry;
        } else {
          updatedEntries.push(entry);
        }
        onSave(entry, isEditMode);
        navigate("/truth", { state: { entries: updatedEntries } });
    
      if (!isEditMode) {
      setTextAreaValue('')
      }
   }

  else{
      alert('Please fill out both the title and description!');
  }
}



    return(
        <>
        <div className="bg-customYellow h-screen  overflow-hidden">
        <nav className="w-full flex justify-between items-center absolute">
<div className="text-[3rem] font-belle relative top-2 text-textBlackish ml-5 mobile:text-[1.5rem]">Love, Jesus</div>
<div className="flex gap-[3rem] mr-5 relative top-2">
    <div className="flex gap-3 ">
    <button 
    onClick={()=> navigate("/truth")}
    className="text-white font-annie bg-customBrown pt-1 pb-1 pr-6 pl-6 rounded-2xl"
    >Cancel</button>
  
   <button className="text-white font-annie bg-customBrown pt-1 pb-1 pr-6 pl-6 rounded-2xl" onClick={HandleSave}>Save</button>

    </div>
</div>
        </nav>
   
         
       <div className="w-full h-full  border-t-[2px] border-t-customBrown grid grid-cols-[1fr_1fr] text-white font-[800]  font-annie  relative top-[5rem] mobile:top-[3rem] ">
        <div className="bg-customYellow grid-rows-2 h-full p-2">
            <h1 className="text-customBrown flex justify-center items-center text-[3rem]">Lies</h1>
            <textarea
          className="w-full h-full placeholder:text-textBlackish placeholder:font-annie focus:text-textBlackish text-textBlackish focus:font-annie bg-transparent focus:outline-none"
          />
        </div>
        <div className="bg-customYellow border-l-[2px] border-l-customBrown h-full p-2">
            <h1 className="text-customBrown flex justify-center items-center text-[3rem]">Truth</h1>
            <textarea
          className="w-full h-full placeholder:text-textBlackish placeholder:font-annie focus:text-textBlackish text-textBlackish focus:font-annie bg-transparent focus:outline-none"
          value= {textareaValue}
          onChange={TextAreaChangeValue}
          />
        </div>

       </div>
       
        
        </div>



        
        
        </>
    )
}

export default JournalEntryThree;