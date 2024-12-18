import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'

type SignUpProps = {
    closeModal: () => void;
};


const SignUp:React.FC<SignUpProps> = ({closeModal}) => {
     

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
      
        };
         
            

   return(
    <>
    
   
      <form onSubmit={handleSubmit}>
           <div className="w-full flex justify-center">
           <h1 className="text-[3rem] font-belle text-customBrown text-stroke-1">Start your journey</h1>
           </div>
           <div className="w-full flex flex-col items-center pt-3 gap-2">
               <div className="flex justify-center relative bg-white w-[75%] rounded-[8px] border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><UserIcon className="w-6 h-6 fill-customBrown"/></div>
               
               <input className="w-[95%] rounded-[8px] p-[5px] focus:text[3px] flex items-center  font-belle text-inputBrown  focus:outline-none focus:font-belle  placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]" placeholder="Enter your username" type="text"/>
              
               </div>
               </div>

               <div className="w-full flex flex-col items-center pt-3 gap-2">
               <div className="flex justify-center relative bg-white w-[75%] rounded-[8px] border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><EnvelopeIcon className="w-6 h-6 fill-customBrown"/></div>
               
               <input className="w-[95%] rounded-[8px] p-[5px] focus:text[3px] flex items-center  font-belle text-inputBrown  focus:outline-none focus:font-belle  placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]" placeholder="Enter your email" type="text"/>
              
               </div>
               
               

               <div className="flex justify-center relative bg-white w-[75%] font-belle text-inputBrown rounded-[8px]  border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><LockClosedIcon className="w-6 h-6 fill-customBrown"/></div>
               <input className="w-[95%] rounded-[8px] p-[5px] flex items-center overflow-hidden focus:outline-none focus:font-belle placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]" placeholder="Enter your password" type="password"/>
               </div>
               <div className="flex justify-center relative bg-white w-[75%] font-belle text-inputBrown rounded-[8px]  border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><LockClosedIcon className="w-6 h-6 fill-customBrown"/></div>
               <input className="w-[95%] rounded-[8px] p-[5px] flex items-center overflow-hidden focus:outline-none focus:font-belle placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]" placeholder="Confirm password" type="password"/>
               </div>
              
           </div>

           <div className="w-full flex flex-col items-center pt-5 gap-2">
               <div className="flex justify-center w-full">
                   <button className="p-2 bg-customBrown rounded-2xl text-[1.5rem] font-belle flex justify-center items-center text-white w-[120px] h-[35px]" type="submit">Sign up</button>
               </div>
               <div className="w-[60%] flex justify-center border-black border-b-[1px] pb-5">
                  
               </div>
               
             
           </div>

           <div className="flex w-full flex-col items-center pt-3">
               <div className="flex text-[1rem] justify-center w-full gap-[5px]">  
                   <p className="font-belle text-black">Don't have an account?</p><span className="font-belle text-[#332B2B] text-stroke-2" onClick={closeModal} >Sign in</span>
                   </div>
             
           </div>
        </form>

   

    </>
  
   )
}

export default SignUp;
