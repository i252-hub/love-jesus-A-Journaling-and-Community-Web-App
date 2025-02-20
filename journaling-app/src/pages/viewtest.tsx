import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import {HeartIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon} from '@heroicons/react/24/solid';
import { useState} from "react";
import { useCount } from '../components/useCount'
import crown from '../assets/crown.png';
import sheep from '../assets/sheep.png';
import tree from '../assets/tree.png';
import whale from '../assets/whale.png';

const ViewTest = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location)
    console.log(navigate)

    const test = location.state?.test;
    const [isExpanded, setIsExpanded] = useState(false);
    const [show, setShow] = useState(false)
    const [response, setResponse] = useState('')
    const [submitResponse, setSubmitResponse] = useState<{response:string; username: string; avatar:string}[]>([])
   
    const { heartcount, commentCount, incrementHeartCount, incrementCommentCount } = useCount();

    function Respond(){
        const arrImage = [crown, sheep, whale, tree]
        const usernames = ["FaithfulServant", "ChildofGod", "BlessedSoul", "SavedByGrace", "JesusLover", "HolyPilgrim"];
        const randomizeImage = Math.floor(Math.random() * arrImage.length)
        const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
        if(response.trim()){
            setResponse('')
            setSubmitResponse(prevRes => {
                const updatedRes = [...prevRes, {response,username: randomUsername, avatar: arrImage[randomizeImage]}];
                return updatedRes;
                
        })
        incrementCommentCount();
      
    }}

    function HeartCount(){
        incrementHeartCount();
        }
    return (
    <>
    <div className="bg-customGradient  h-screen scrollbar-hide overflow-auto ">
       <Navbar
     Journal='Journal'
     Community = 'Community'
     About = 'About'
     />
     <div className="relative top-[3rem]   w-full flex justify-center ">
       <div className="w-[60%] pt-10  bg-transparent mobile:w-[95%] mobile:h-[90vh]">
       <h3 className="text-5xl mt-5  font-bold text-[#554B35] font-annie ">{test.title}</h3>
       <p className="text-[#554B35] opacity-45 text-3xl font-annie">{test.subtitle}</p>
       
       <div className="flex items-center gap-2 ">
                <div className="w-9 h-9 rounded-3xl bg-customBrown border-2 border-[#554B35] border-opacity-80"><img className="h-full w-full" src={test.avatar}/></div>
                <div className="flex flex-col gap-0 ">
                <p className="text-white font-annie text-[1rem]">{test.username}</p>
                <p className="text-[#554B35] font-annie text-[12px]">{test.date || "No date"}</p>
                </div>
                </div>
                
                <div className=" flex justify-center w-full pt-5">
                    <div className=" w-full border-b border-customBrown border-opacity-50"></div>
                </div>
                
                <p className="text-[#554B35] pt-3 w-full h-auto font-annie text-[1.2rem]">{test.desc}</p>
                <div className="flex items-center pt-10 gap-3">
                <div className="flex items-center gap-1">
                    <HeartIcon
                    onClick={HeartCount}
                     className="w-5 h-5 fill-[#554B35]"/>
                    <p className={`text-[#554B35] font-annie text-[1.1rem] ${heartcount ? 'relative' : 'hidden'} `}>{heartcount}</p></div>
                    <div className="flex items-center gap-1">
                    <ChatBubbleBottomCenterIcon className="w-5 h-5 fill-[#554B35]"/>
                    <p className={`text-[#554B35] font-annie text-[1.1rem] ${commentCount ? 'relative' : 'hidden'} `}>{commentCount}</p>
                    </div>
                </div>

                <div className="w-full border-b pb-5 border-customBrown border-opacity-50 "></div>
                <div className="mobile:h-[50%] mobile:flex mobile:items-end desktop:hidden tablet:hidden">

               <div className="mobile:w-full desktop:hidden tablet:hidden">
                <div className="pt-[3rem] mb-[2rem]">
                    <h3 className="text-[1.8rem] font-annie text-[#554B35] font-bold">Responses</h3>
                </div>
                <div>
                {show && (
                    <div
                    style={{ 
                        boxShadow: '0 0 #0000, 0 0 #0000, 0 0 3px 0px rgb(0,0,0,0.1), 0 2px 4px -2px rgb(0,0,0,0.0)'
                    }}
                className=' flex items-center gap-2 shadow-md pb-3  bg-transparent opacity-59 pt-2'>
                <div className="ml-3 w-9 h-9 rounded-3xl bg-customBrown border-2 border-[#554B35] border-opacity-80"><img className="h-full w-full" src={test.avatar}/></div>
                <p className="text-white font-annie text-[1rem]">{test.username}</p>
                </div>
                )}
                
                </div>
                <div className="w-full flex justify-center items-center relative">
                    <textarea
                    value={response}  
                    onChange={(e) => setResponse(e.target.value)}
                    maxLength={400}
                     onClick={() =>{  setShow(true); setIsExpanded(true)}}
                     className={`w-full z-20 pl-3 bg-transparent scrollbar-none pt-3  pb-3  focus:text-[#554B35] text-[#554B35] focus:font-annie font-annie shadow-md opacity-59 relative transition-all duration-300 ease-in-out resize-none focus:outline-none ${
                    isExpanded ? "h-40" : "h-10"
                }`}>
                    </textarea>
                    <button 
                    onClick={() =>{  setShow(false); setIsExpanded(false)}}
                    className={`${isExpanded ? 'absolute' : 'hidden'} z-30 w-[5rem] pt-[3px] pb-[3px] rounded-3xl bg-customBrown text-white text-[14px] bottom-[5px] right-[6.2rem]`}>Cancel</button>
                    <button 
                    onClick={() =>{  Respond(); setIsExpanded(false); setShow(false);}}
                    className="absolute w-[5rem] pt-[3px] pb-[3px] z-30 rounded-3xl bg-customBrown text-white text-[14px] bottom-[5px] right-[14px]">Respond</button>
                </div>
               
              
                {submitResponse.map((res, index)=>(
                <div key={index} className="bg-transparent opacity-59 rounded-md pb-5 my-3 border-b border-customBrown border-opacity-50">
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-2xl bg-customBrown border-2 border-[#554B35] border-opacity-80"><img className="h-full w-full" src={res.avatar}/></div>
                    <div className="flex flex-col gap-0 w-full">
                <p className="text-white font-annie text-[1rem]">{res.username}</p>
                <div className="flex justify-between items-center"><p className="text-[#554B35] font-annie text-[12px]">{test.date || "No date"}</p>
                <EllipsisHorizontalIcon className="h-6 w-6 fill-[#554B35] mr-3"/>
                </div>
                </div>
                </div>
                <div>
                    <p className="text-[#554B35] font-annie">{res.response}</p>
                </div>
                </div>
                ))}
       </div>
</div>
     </div>
     </div>
     </div>
     </>
    )
}

export default ViewTest