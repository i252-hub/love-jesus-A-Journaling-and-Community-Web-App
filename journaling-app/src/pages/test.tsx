import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useCount } from '../components/useCount'
import { PlusCircleIcon, XMarkIcon, HeartIcon, ChatBubbleBottomCenterIcon} from '@heroicons/react/24/solid';
import crown from '../assets/crown.png';
import sheep from '../assets/sheep.png';
import tree from '../assets/tree.png';
import whale from '../assets/whale.png';

export default function Testimonial(){

  const [addTest, setAddTest] = useState(false);
  const [title, setTitle] = useState("");  
  const [subtitle, setSubTitle] = useState("");  
  const [desc, setDesc] = useState("");  
  const [submittedTests, setSubmittedTests] = useState<{ title: string; subtitle: string; desc: string; username: string; avatar: string; date:string }[]>([]); 
  const { heartcount, commentCount } = useCount();

  useEffect(() => {
    const savedTestimonials = localStorage.getItem("testimonials");
    if (savedTestimonials) {
      setSubmittedTests(JSON.parse(savedTestimonials));
    }
  }, []);

  function AddTest(){
    setAddTest(true)
  }

  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }
  
  
  
  function publishTest() {
    if (title.trim() && desc.trim()) {
      const arrImage = [crown, sheep, whale, tree]
      const usernames = ["FaithfulServant", "ChildofGod", "BlessedSoul", "SavedByGrace", "JesusLover", "HolyPilgrim"];
      const randomizeImage = Math.floor(Math.random() * arrImage.length)
      const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
      const formattedDate = formatDate(new Date());
      const newTestimonial = { title, subtitle, desc, username: randomUsername, avatar: arrImage[randomizeImage], date: formattedDate };
      console.log("Formatted Date:", formattedDate);
      console.log("New Testimonial:", newTestimonial);
      setSubmittedTests(prevTests => {
        const updatedTests = [...prevTests, newTestimonial];
        localStorage.setItem("testimonials", JSON.stringify(updatedTests));
        console.log(updatedTests)
        return updatedTests;
      });
    
      setTitle(""); 
      setSubTitle(""); 
      setDesc(""); 
      setAddTest(false); 
    }
  }

  

  
  
    return (
      <>
      <div className="bg-customGradient  h-[100vh] scrollbar-hide overflow-hidden"
      >
         <Navbar
       Journal='Journal'
       Community = 'Community'
       About = 'About'
       SignIn = 'Sign-in' />

<div className="relative top-[3rem] h-full w-full">
<div className="relative w-full font-belle flex justify-center items-center text-white text-[2rem] pt-5">Testimony</div>

{addTest && (
            <>
          <div className= 'fixed inset-0 backdrop-blur-sm  bg-opacity-50 z-40'></div>

          <div className="h-[90.5%] w-[50%] top-1 z-50 mobile:h-screen mobile:top-0 mobile:w-full mobile:left-0  bg-customYellow  shadow-md absolute  left-[25%] pb-2" >
          <div className="flex justify-end items-center">
          <XMarkIcon 
           onClick={()=> setAddTest(false)}
           className="h-6 w-6 mr-1 relative top-[2px] fill-customBrown cursor-pointer"/> 
          </div>
        
          <div className="pl-3 flex-col w-full mobile:w-full gap-5 h-full flex justify-center items-start relative ">
    <div className="relative flex  items-center w-full">
    <input 
          className="z-20 peer bg-transparent  focus:outline-none w-full h-10 focus:text-[3rem] text-[3rem] font-annie focus:text-textBlackish focus:font-annie relative right-2 placeholder:text-textBlackish"
          type="text"
          value={title}  
          onChange={(e) => setTitle(e.target.value)}
          placeholder= 'Title'
          />
    </div>
    <input 
          className="z-20 peer bg-transparent placeholder:text-textBlackish focus:outline-none w-full h-10 text-[1.5rem] focus:text-[1.5rem]  font-annie focus:text-textBlackish focus:font-annie relative"
          type="text"
          value={subtitle}  
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder= 'Subtitle'
          />
       
          <textarea
          className="w-full h-full mobile:pl-5 resize-none placeholder:text-textBlackish placeholder:font-annie focus:text-textBlackish focus:font-annie bg-transparent focus:outline-none"
          value={desc}  
          onChange={(e) => setDesc(e.target.value)}
          placeholder= 'How did the Lord Jesus change your life?'
          />
        </div>

             <div className="flex justify-end gap-2 mr-3 relative bottom-[4rem] mobile:relative mobile:bottom-[2rem]">
             <button className="p-1 pl-5 pr-5 rounded-2xl bg-customBrown text-white font-annie"
            >Delete</button>
             <button 
             onClick={publishTest}
             className="p-1 pl-5 pr-5 rounded-2xl bg-customBrown text-white font-annie">Publish</button>

             </div>
            
          </div>
          </>
           )}

<PlusCircleIcon
  onClick={AddTest}
    className="h-12 w-12 fixed left-[90%] mobile:left-[85%] bottom-[1.3rem] mr-[2.3rem] fill-customBrown cursor-pointer"
  />

<div className="px-5">
            {submittedTests.map((test, index) => (
              <Link key={index} to="/viewtest" state={{ test }}>
              <div  className="bg-[#BCA983] opacity-59 p-5 rounded-md shadow-md my-3">
                <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-2xl bg-customBrown border-2 border-[#554B35] border-opacity-80"><img className="h-full w-full" src={test.avatar}/></div>
                <p className="text-white font-annie text-[1.1rem]">{test.username}</p>
                </div>
                <h3 className="text-2xl font-bold text-[#554B35] font-annie">{test.title}</h3>
                <p className="text-[#554B35] font-annie">{test.subtitle}</p>
                <div className="flex items-center gap-2">
                  <div><p className="text-[#554B35] font-annie text-[12px]">{test.date || "No date"}</p></div>
                  <div className="flex items-center">
                    <HeartIcon className="w-3 h-3 fill-customBrown"/>
                    <p className="text-customBrown text-stroke-2 text-[12.5px] font-annie">{heartcount}</p></div>
                    <div className="flex items-center gap-[1px]">
                    <ChatBubbleBottomCenterIcon className="w-3 h-3 fill-customBrown"/>
                    <p className="text-customBrown text-stroke-2 text-[12.5px] font-annie">{commentCount}</p></div>
              </div>
                </div>
                </Link>
            ))}
           
          </div>
</div>

    </div>
       </>
    )
}