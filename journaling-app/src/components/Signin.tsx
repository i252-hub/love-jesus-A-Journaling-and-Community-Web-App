import { EnvelopeIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from './UseAuth';
import crown from '../assets/crown.png';
import sheep from '../assets/sheep.png';
import tree from '../assets/tree.png';
import whale from '../assets/whale.png';

  const Sign=() => {  
    const { setUser } = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const savedUser = localStorage.getItem("userSignUpData");
        if (!savedUser) {
          window.alert("No account found. Please sign up.");
          return;
        }
    
        const { email, password, name } = JSON.parse(savedUser);
        const arrImage = [crown, sheep, whale, tree]
        const randomizeImage = Math.floor(Math.random() * arrImage.length)

        if (formData.email === email && formData.password === password) {
            window.alert("Sign-in successful!");
            console.log("User logged in:", formData);
            navigate("/"); 
            setUser({
              name: name,
              profilePic: arrImage[randomizeImage]
          });
          } else {
            window.alert("Invalid email or password!");
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
 <h1 className="text-[3rem] font-belle text-customBrown text-stroke-1">Sign in</h1>
 </div>
 <div className="w-full flex flex-col items-center pt-3 gap-2">
     <div className="flex justify-center relative bg-white w-[75%] rounded-[8px] border-inputBrown border-[2px]">
     <div className="w-10 flex  justify-center items-center"><EnvelopeIcon className="w-6 h-6 fill-customBrown"/></div>
     
     <input className="w-[95%] rounded-[8px] p-[5px] focus:text[3px] flex items-center  font-belle text-inputBrown  focus:outline-none focus:font-belle  placeholder:font-belle placeholder:text-placeBrown placeholder:relative placeholder: left-[2rem]" placeholder="Enter your email" 
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
    
 </div>

 <div className="w-full flex flex-col items-center pt-5 gap-2">
     <div className="flex justify-center w-full">
         <button className="p-2 bg-customBrown rounded-2xl text-[1.5rem] font-belle flex justify-center items-center text-white w-[120px] h-[35px]" type="submit">Sign in</button>
     </div>
     <div className="w-[60%] flex justify-center border-black border-b-[1px] pb-5">
         <p className="font-belle text-customBrown text-stroke-1 text-[1.5rem]">or</p>
     </div>
     
   
 </div>

 <div className="flex w-full flex-col items-center pt-3">
 <div className="flex items-center justify-center dark:bg-white rounded">
    <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-300 rounded-lg text-slate-700  hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img className="w-6 h-6 rounded-lg" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span>Signin with Google</span>
    </button>
</div>
     <div className="flex text-[14px] justify-start w-[60%] gap-[5px]">  
         <p className="font-belle text-black">Don't have an account?</p>
         <Link to="/signup">
         <span className="font-belle text-[#332B2B] text-stroke-2"  >Sign up</span>
        </Link>
        
         </div>
   
 </div>
</form>
</div>
</div>
       
        
            
          
     
    
       

      


</>
     
      
    )
}

export default Sign;