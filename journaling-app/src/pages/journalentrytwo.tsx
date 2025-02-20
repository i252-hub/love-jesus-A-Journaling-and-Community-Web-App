import React from "react";
import { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

type EntryTwo = {
    title: string;
    description: string;
    date: string;
    id: string;
    dailyPrompt: string;

};

type JournalEntryTwoProps = {
  dailyPrompt: string;
  onSave: (entry: EntryTwo, isEditMode: boolean) => void;
}

const JournalEntryTwo: React.FC<JournalEntryTwoProps> = ({ dailyPrompt, onSave }) => {
    
  const navigate = useNavigate();
    const location = useLocation();
    const existingEntry = location.state?.entry as EntryTwo | undefined;

    const [inputValue, setInputValue] = useState(existingEntry?.title || '');
    const [textareaValue, setTextAreaValue] = useState( existingEntry?.description || '');


    const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
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
        
  if(inputValue.trim() && textareaValue.trim()){

      const entry: EntryTwo = {
          title: inputValue,
          description: textareaValue,
          date: existingEntry?.date || FormattedDate,  
          id: existingEntry?.id || generateUniqueId(),    
          dailyPrompt: existingEntry?.dailyPrompt || "Default Daily Prompt",
          };

        const updatedEntries = [...(location.state?.entries || []), entry];
        if (isEditMode) {
          const entryIndex = updatedEntries.findIndex(
            (e) => e.title === existingEntry.title && e.date === existingEntry.date
          );
          if (entryIndex > -1) updatedEntries[entryIndex] = entry;
        } else {
          updatedEntries.push(entry);
        }
        onSave(entry, isEditMode);
        navigate("/gratitude", { state: { entries: updatedEntries } });
    
      if (!isEditMode) {
      setInputValue('')
      setTextAreaValue('')
      }
   }

  else{
      alert('Please fill out both the title and description!');
  }
}



    return(
        <>
        <div className="bg-customYellow h-screen ">
        <nav className="w-full flex justify-between items-center absolute">
<div className="text-[3rem] font-belle relative top-2.5 text-textBlackish ml-5 tablet:text-[2rem] mobile:text-[1.5rem]">Love, Jesus</div>
<div className="flex gap-[3rem] mr-5 relative top-2">
    <div className="flex gap-3 mobile:hidden">
    <button 
    onClick={()=> navigate("/gratitude")}
    className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[8rem] tablet:right-[7rem]  rounded-2xl"
    >Cancel</button>
  
   <button className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[3rem]  rounded-2xl" onClick={HandleSave}>Save</button>

    </div>
    <div className="w-8 h-8 mobile:w-7 mobile:h-7 tablet:w-7 tablet:h-7 relative tablet:bottom-[2px] bg-slate-300 rounded-2xl"></div>
</div>
        </nav>
<div className="w-full h-[80%] relative top-[5rem] flex justify-center items-center ">
<div className="flex-col w-[50%] mobile:w-[90%] gap-5 h-full flex justify-center items-start relative ">
    <div className="relative flex  items-center w-full">
    <input 
          className="z-20 peer bg-transparent focus: outline-none w-full h-10 focus:text-[3rem] text-[3rem] font-annie focus:text-textBlackish focus:font-annie relative"
          type="text"
          value= {inputValue}
          onChange={ChangeValue}
          placeholder= ''
          />
          <span className={`text-[3rem]  z-10 font-annie text-textBlackish absolute peer-focus:hidden" ${inputValue || document.activeElement === document.querySelector('input') ? 'hidden' : ''}`}>Title</span>
    </div>
         
       <div className="w-full p-3 bg-customBrown text-white font-[800] text-[14px] tablet:text-[12px] font-annie justify-center items-center rounded-2xl">
       <p>{dailyPrompt}</p>

       </div>
          <textarea
          className="w-full h-full resize-none placeholder:text-textBlackish placeholder:font-annie focus:text-textBlackish focus:font-annie bg-transparent focus:outline-none"
          value= {textareaValue}
          onChange={TextAreaChangeValue}
          />
        </div>
        <div className="flex gap-3  relative top-[50%] left-10 desktop:hidden tablet:hidden">
    <button 
    onClick={()=> navigate("/gratitude")}
    className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[8rem] tablet:right-[7rem]  rounded-2xl"
    >Cancel</button>
  
   <button className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[3rem]  rounded-2xl" onClick={HandleSave}>Save</button>

    </div>
</div>


        
        </div>
        </>
    )
}

export default JournalEntryTwo;