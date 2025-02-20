import { UserIcon, EnvelopeIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
    console.log("🚀 SignUp Component Rendered!");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
           
            e.preventDefault();
       console.log("Form submitted!");
            if (formData.password !== formData.confirmPassword) {
                console.log("Passwords do not match!");
                window.alert("Passwords do not match!");
                return;
              }

              try {
                localStorage.setItem("userSignUpData", JSON.stringify(formData));
                console.log("Data saved to Local Storage:", localStorage.getItem("userSignUpData"));
                console.log("Sign-up successful! Data saved to local storage.");
                window.alert("Sign-up successful! Data saved to local storage.");
            } catch (error) {
                console.error("Local Storage Error:", error);
            }
        };
         
            

   return(
    <>
     <div className="bg-customBrown top-0 h-full w-full absolute flex justify-center items-center mobile:hidden">
    <div className="bg-customYellow w-[35%] h-[85%] relative tablet:w-[80%]" onClick={(e)=> e.stopPropagation()}>
    <div className='w-full  flex justify-end'>
        <Link to="/">
        <button ><XMarkIcon className='w-6 h-6 fill-customBrown'/></button>
        </Link>
  
    </div>
   
      <form onSubmit={handleSubmit}>
      <div className="w-full flex justify-center">
           <h1 className="text-[3rem] font-belle text-customBrown text-stroke-1">Start your journey</h1>
           </div>
           <div className="w-full flex flex-col items-center pt-3 gap-2">
               <div className="flex justify-center relative bg-white w-[75%] rounded-[8px] border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><UserIcon className="w-6 h-6 fill-customBrown"/></div>
               
               <input
               placeholder="Enter your username"
               type="text"
               name="username"
               value={formData.username}
               onChange={handleChange}
               className="w-[95%] rounded-[8px] p-[5px] focus:text[3px] flex items-center  font-belle text-inputBrown  focus:outline-none focus:font-belle  placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]"
                />
             
               </div>
               </div>


               <div className="w-full flex flex-col items-center pt-3 gap-2">
               <div className="flex justify-center relative bg-white w-[75%] rounded-[8px] border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><EnvelopeIcon className="w-6 h-6 fill-customBrown"/></div>
               
               <input
               className="w-[95%] rounded-[8px] p-[5px] focus:text[3px] flex items-center  font-belle text-inputBrown  focus:outline-none focus:font-belle  placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]"
               placeholder="Enter your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}/>
             
               </div>
               
               


               <div className="flex justify-center relative bg-white w-[75%] font-belle text-inputBrown rounded-[8px]  border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><LockClosedIcon className="w-6 h-6 fill-customBrown"/></div>
               <input
               className="w-[95%] rounded-[8px] p-[5px] flex items-center overflow-hidden focus:outline-none focus:font-belle placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]"
               placeholder="Enter your password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}/>
               </div>
               <div className="flex justify-center relative bg-white w-[75%] font-belle text-inputBrown rounded-[8px]  border-inputBrown border-[2px]">
               <div className="w-10 flex  justify-center items-center"><LockClosedIcon className="w-6 h-6 fill-customBrown"/></div>
               <input className="w-[95%] rounded-[8px] p-[5px] flex items-center overflow-hidden focus:outline-none focus:font-belle placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]"
               placeholder="Confirm password"
               type="password"
               name="confirmPassword"
               value={formData.confirmPassword}
               onChange={handleChange}/>
               </div>
             
           </div>


           <div className="w-full z-20 flex flex-col items-center pt-5 gap-2">
               <div className="flex justify-center w-full">
                   <button
                   className="z-30 p-2 bg-customBrown rounded-2xl text-[1.5rem] font-belle flex justify-center items-center text-white w-[120px] h-[35px]"
                   type="submit"
                  >Sign up</button>
               </div>
               <div className="w-[60%] flex justify-center border-black border-b-[1px] pb-5">
                 
               </div>
               
             
           </div>


           <div className="flex w-full flex-col items-center pt-3">
               <div className="flex text-[1rem] justify-center w-full gap-[5px]">  
                   <p className="font-belle text-black">Don't have an account?</p>
                   <Link to="/signin">
                   <span className="font-belle text-[#332B2B] text-stroke-2 relative bottom-1"   >Sign in</span>
                   </Link>
                   </div>
             
           </div>

          
          
               
             
        </form>
</div>
</div>


    </>
  
   )
}

export default SignUp;
