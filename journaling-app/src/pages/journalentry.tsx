import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


type Entry = {
    title: string;
    description: string;
    status: string;
    date: string;
    id: string;
};

const JournalEntry = ({onSave}: { onSave:  (entry: Entry, isEditMode: boolean) => void }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const existingEntry = location.state?.entry as Entry | undefined;

    const [inputValue, setInputValue] = useState(existingEntry?.title || '');
    const [textareaValue, setTextAreaValue] = useState( existingEntry?.description || '');
    const [status, setStatus] = useState(existingEntry?.status || 'Pending');


    const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
    const TextAreaChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(e.target.value);
    const ChangeStatus = () => {
        setStatus(prevStatus => prevStatus === 'Pending' ? 'Answered' : 'Pending');
    }

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
            const entry: Entry = {
                title: inputValue,
                description: textareaValue,
                status,
                date: existingEntry?.date || FormattedDate,   
                id: existingEntry?.id || generateUniqueId(),   
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
              navigate("/prayer", { state: { entries: updatedEntries } });
          
            if (!isEditMode) {
            setInputValue('')
            setTextAreaValue('')
            setStatus('Pending')
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
<div className="text-[3rem] font-belle relative top-2 text-textBlackish ml-5 tablet:text-[2rem] mobile:text-[1.5rem]">Love, Jesus</div>
<div className="flex gap-[3rem] mr-5 relative top-2">
    <div className="flex gap-3 flex-wrap mobile:hidden ">
    <button className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[8rem] tablet:right-[7rem]  rounded-2xl">Cancel</button>
  
   <button className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[3rem]  rounded-2xl" onClick={HandleSave}>Save</button>

    </div>
    <div className="w-8 h-8 tablet:w-7 tablet:h-7 relative tablet:bottom-[2px] bg-slate-300 rounded-2xl "></div>
</div>
        </nav>
<div className="w-full h-[80%] relative top-[5rem] flex justify-center items-center">
<div className="flex-col w-[50%] mobile:w-full gap-5 h-full flex justify-center items-start relative ">
    <div className="relative flex  items-center w-full">
    <input 
          className="z-20 peer bg-transparent  focus:outline-none w-full h-10 focus:text-[3rem] text-[3rem] font-annie focus:text-textBlackish focus:font-annie relative"
          type="text"
          value= {inputValue}
          onChange={ChangeValue}
          placeholder= ''
          />
          <span className={`text-[3rem] z-10 font-annie text-textBlackish absolute peer-focus:hidden mobile:left-5 ${inputValue || document.activeElement === document.querySelector('input') ? 'hidden' : ''}`}>Title</span>
    </div>
         
          <button 
          className="pt-1 pb-1 pl-7 pr-7 bg-customBrown mobile:relative mobile:left-5 tablet:pl-5 tablet:pr-5 tablet:pt-0.5 tablet:pb-0.5 tablet:text-[14px] text-white rounded-2xl font-annie text-[1rem]"
          onClick={ChangeStatus}>{status}</button>
          <textarea
          className="w-full h-full mobile:pl-5 resize-none placeholder:text-textBlackish placeholder:font-annie focus:text-textBlackish focus:font-annie bg-transparent focus:outline-none"
          value= {textareaValue}
          onChange={TextAreaChangeValue}
          placeholder= 'How about telling him about your day?'
          />
        </div>
</div>
<div className="flex gap-3 relative top-[6rem] left-8 desktop:hidden tablet:hidden">
    <button className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[8rem] tablet:right-[7rem]  rounded-2xl">Cancel</button>
  
   <button className="text-white font-annie absolute bg-customBrown pt-1 pb-1 pr-6 pl-6 tablet:pt-0.5 tablet:pb-0.5 tablet:pl-5 tablet:pr-5 tablet:text-[14px] right-[3rem]  rounded-2xl" onClick={HandleSave}>Save</button>

    </div>

        
        </div>
      
        </>
    )
}

export default JournalEntry;