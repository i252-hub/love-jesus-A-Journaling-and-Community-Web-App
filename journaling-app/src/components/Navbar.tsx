import { useState } from "react"
import { Bars3Icon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/solid'



type NavbarProps = {
Journal: string
Community: string
About: string
SignIn: string

}

const Navbar: React.FC<NavbarProps>= ({Journal, Community, About, SignIn}) => {
    const [open, setOpen] = useState(false);
    const [expand, setExpand] = useState(false);



    function Open(){
        setOpen(!open);
    }
    function Expand(){
        setExpand(prev => !prev);
        }

    {/*  function JournalOpen(){
        const content = ['Prayer', 'Gratitude', 'Truth'];
        if (content.length > 0) {
            setJournal((prev) => !prev);
          }
        }
        function CommunityOpen(){
            setCommunity(!community);
            }*/ }
  
    return (
        <>
        <nav className="bg-customBrown w-full  mobile:h-12 bg" >
            <ul className="flex w-full justify-between items-center  text-white mobile:hidden">
                <li className="font-belle ml-5">Love, Jesus</li>
                <ul className="w-[50%] justify-center flex items-center gap-20 h-[3rem]">
                    <li className="font-annie" onMouseEnter={Expand}>{Journal}</li>
                    <li className="font-annie" onMouseEnter={Expand}>{Community}</li>
                    <li className="font-annie" onMouseEnter={Expand} >{About}</li>
                </ul>
                <li className="font-annie mr-5">{SignIn}</li>
            </ul>

        {expand && (
            <div className="flex relative bottom-3 justify-center gap-[4rem] text-white" onMouseLeave={()=> setExpand(false)}>
            <ul className="flex flex-col items-center font-annie">
                <li>Prayer</li>
                <li>Gratitude</li>
                <li>Journal</li>
            </ul>
            <ul className="flex flex-col items-center font-annie">
                <li>Blessings</li>
                <li>Prayer Request</li>
                <li>Testimonial</li>
                <li>Discord</li>
            </ul>
            <ul></ul>
            </div>
        )}
           

            <div className="w-full flex items-center justify-between mr-2 desktop:hidden tablet:hidden">
            <div className="font-belle ml-3 text-white text-[1.2rem]">Love, Jesus</div>
            <button onClick={Open}><Bars3Icon className="text-white bg-transparent w-8 h-8"/></button>
            </div>
            
        </nav>

        {open && (
                <>

        <div className="bg-customYellow py-4 h-[100vh] desktop:hidden tablet:hidden">
          <div className="px-4 cursor-pointer flex justify-center items-center gap-3 font-annie text-[1.3rem]  text-customBrown font-bold " >
            {Journal}
          </div>

         
            <div className=" mt-2 w-full  overflow-hidden flex flex-col items-center font-annie text-[1.3rem]  text-customBrown">
              <div className="py-2 px-4">Prayer</div>
              <div className="py-2 px-4">Gratitude</div>
              <div className="py-2 px-4">Truth</div>
            </div>
        

          <div className="px-4 cursor-pointer mt-2 flex justify-center items-center gap-3  font-annie text-[1.3rem] font-bold text-customBrown" >
            {Community} 
          </div>

         
            <div className="w-full  mt-2 flex flex-col items-center overflow-hidden font-annie text-[1.3rem] text-customBrown ">
              <div className="py-2 px-4">Blessings</div>
              <div className="py-2 px-4">Prayer Request</div>
              <div className="py-2 px-4">Testimonial</div>
            </div>
          

<div className="w-full flex  justify-center top-[30rem] gap-5 fixed">
                 <div className="font-annie text-[1.5rem] text-customBrown"><QuestionMarkCircleIcon className="w-8"/></div>

                    <div className="font-annie text-[1.5rem] text-customBrown"><svg xmlns="http://www.w3.org/2000/svg" className="fill-customBrown w-8" x="0px" y="0px"  viewBox="0 0 24 24"
>
<path d="M19.98,5.69c-1.68-1.34-4.08-1.71-5.12-1.82h-0.04c-0.16,0-0.31,0.09-0.36,0.24c-0.09,0.23,0.05,0.48,0.28,0.52 c1.17,0.24,2.52,0.66,3.75,1.43c0.25,0.15,0.31,0.49,0.11,0.72c-0.16,0.18-0.43,0.2-0.64,0.08C15.56,5.38,12.58,5.3,12,5.3 S8.44,5.38,6.04,6.86C5.83,6.98,5.56,6.96,5.4,6.78C5.2,6.55,5.26,6.21,5.51,6.06c1.23-0.77,2.58-1.19,3.75-1.43 c0.23-0.04,0.37-0.29,0.28-0.52c-0.05-0.15-0.2-0.24-0.36-0.24H9.14C8.1,3.98,5.7,4.35,4.02,5.69C3.04,6.6,1.09,11.83,1,16.46 c0,0.31,0.08,0.62,0.26,0.87c1.17,1.65,3.71,2.64,5.63,2.78c0.29,0.02,0.57-0.11,0.74-0.35c0.01,0,0.01-0.01,0.02-0.02 c0.35-0.48,0.14-1.16-0.42-1.37c-1.6-0.59-2.42-1.29-2.47-1.34c-0.2-0.18-0.22-0.48-0.05-0.68c0.18-0.2,0.48-0.22,0.68-0.04 c0.03,0.02,2.25,1.91,6.61,1.91s6.58-1.89,6.61-1.91c0.2-0.18,0.5-0.16,0.68,0.04c0.17,0.2,0.15,0.5-0.05,0.68 c-0.05,0.05-0.87,0.75-2.47,1.34c-0.56,0.21-0.77,0.89-0.42,1.37c0.01,0.01,0.01,0.02,0.02,0.02c0.17,0.24,0.45,0.37,0.74,0.35 c1.92-0.14,4.46-1.13,5.63-2.78c0.18-0.25,0.26-0.56,0.26-0.87C22.91,11.83,20.96,6.6,19.98,5.69z M8.89,14.87 c-0.92,0-1.67-0.86-1.67-1.91c0-1.06,0.75-1.92,1.67-1.92c0.93,0,1.67,0.86,1.67,1.92C10.56,14.01,9.82,14.87,8.89,14.87z M15.11,14.87c-0.93,0-1.67-0.86-1.67-1.91c0-1.06,0.74-1.92,1.67-1.92c0.92,0,1.67,0.86,1.67,1.92 C16.78,14.01,16.03,14.87,15.11,14.87z"></path>
</svg></div>
<div className="font-annie text-[1.5rem] text-customBrown"><EnvelopeIcon className="w-8"/></div>
</div>    
        </div>
  
                {/*
                 <div className={`w-full bg-customYellow relative h-[50vh] transition-transform duration-800 ease-in-out flex justify-center flex-col items-center desktop:hidden tablet:hidden`}>
                 <ul className={`w-full flex items-center flex-col gap-0 ${journal ? 'gap-0 absolute overflow-hidden' : 'gap-0 ' }`}>
                    
                        <li ref={journalRefs.reference as React.RefObject<HTMLLIElement>}
                        className={`w-[80%] flex justify-center gap-3 items-center font-annie text-[1.5rem] border-b-[1px]  text-customBrown  ${journal ? 'pb-0  overflow-hidden' : 'pb-0' }`} onClick={JournalOpen}>{Journal} <li><ChevronDownIcon className="w-6 h-6"/></li></li>
                        {journal && (
                            <ul  ref={journalRefs.floating as React.RefObject<HTMLUListElement>}
                            style={{
                                ...journalStyles
                            }}
                             className={`w-full flex flex-col items-center overflow-hidden relative `}>
                                <li>Prayer</li>
                                <li>Gratitude</li>
                                <li>Truth</li>
                            </ul>
                    )}
                  
                   

                    
                        <li  ref={communityRefs.reference as React.RefObject<HTMLLIElement>}

                        className="w-[80%] flex justify-center gap-3 items-center font-annie text-[1.5rem] border-b-[1px]  text-customBrown pb-3" onClick={CommunityOpen}>{Community} <li><ChevronDownIcon className="w-6 h-6"/></li></li>
                        {community && (
                             <ul  ref={communityRefs.floating as React.RefObject<HTMLUListElement>}
                             style={{
                                ...communityStyles
                             }}>
                             <li>Blessings</li>
                             <li>Prayer Request</li>
                             <li>Testimonial</li>
                         </ul>
                    )}
                    
                    
                   
                 </ul>
                 <div className="w-full flex  justify-center fixed top-[20rem] gap-5">
                 <div className="font-annie text-[1.5rem] text-customBrown"><QuestionMarkCircleIcon className="w-8"/></div>

                    <div className="font-annie text-[1.5rem] text-customBrown"><svg xmlns="http://www.w3.org/2000/svg" className="fill-customBrown w-8" x="0px" y="0px"  viewBox="0 0 24 24"
>
<path d="M19.98,5.69c-1.68-1.34-4.08-1.71-5.12-1.82h-0.04c-0.16,0-0.31,0.09-0.36,0.24c-0.09,0.23,0.05,0.48,0.28,0.52 c1.17,0.24,2.52,0.66,3.75,1.43c0.25,0.15,0.31,0.49,0.11,0.72c-0.16,0.18-0.43,0.2-0.64,0.08C15.56,5.38,12.58,5.3,12,5.3 S8.44,5.38,6.04,6.86C5.83,6.98,5.56,6.96,5.4,6.78C5.2,6.55,5.26,6.21,5.51,6.06c1.23-0.77,2.58-1.19,3.75-1.43 c0.23-0.04,0.37-0.29,0.28-0.52c-0.05-0.15-0.2-0.24-0.36-0.24H9.14C8.1,3.98,5.7,4.35,4.02,5.69C3.04,6.6,1.09,11.83,1,16.46 c0,0.31,0.08,0.62,0.26,0.87c1.17,1.65,3.71,2.64,5.63,2.78c0.29,0.02,0.57-0.11,0.74-0.35c0.01,0,0.01-0.01,0.02-0.02 c0.35-0.48,0.14-1.16-0.42-1.37c-1.6-0.59-2.42-1.29-2.47-1.34c-0.2-0.18-0.22-0.48-0.05-0.68c0.18-0.2,0.48-0.22,0.68-0.04 c0.03,0.02,2.25,1.91,6.61,1.91s6.58-1.89,6.61-1.91c0.2-0.18,0.5-0.16,0.68,0.04c0.17,0.2,0.15,0.5-0.05,0.68 c-0.05,0.05-0.87,0.75-2.47,1.34c-0.56,0.21-0.77,0.89-0.42,1.37c0.01,0.01,0.01,0.02,0.02,0.02c0.17,0.24,0.45,0.37,0.74,0.35 c1.92-0.14,4.46-1.13,5.63-2.78c0.18-0.25,0.26-0.56,0.26-0.87C22.91,11.83,20.96,6.6,19.98,5.69z M8.89,14.87 c-0.92,0-1.67-0.86-1.67-1.91c0-1.06,0.75-1.92,1.67-1.92c0.93,0,1.67,0.86,1.67,1.92C10.56,14.01,9.82,14.87,8.89,14.87z M15.11,14.87c-0.93,0-1.67-0.86-1.67-1.91c0-1.06,0.74-1.92,1.67-1.92c0.92,0,1.67,0.86,1.67,1.92 C16.78,14.01,16.03,14.87,15.11,14.87z"></path>
</svg></div>
<div className="font-annie text-[1.5rem] text-customBrown"><EnvelopeIcon className="w-8"/></div>
</div>    
</div>  
                */ }
                       
                
                </>
            )}
        </>
    )
}

export default Navbar