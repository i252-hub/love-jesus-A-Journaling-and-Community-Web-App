import Navbar from "../components/Navbar"

export default function About(){
    return (
        <>
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        />
         <div className=" bg-customBrown w-full h-screen flex justify-center items-center">
          <div className="w-[50%] h-[90%] tablet:w-[80%] mobile:w-[95%] relative top-7  bg-customYellow border-[5px] border-textBlackish">
            <p className="text-[1.5rem] font-annie tablet:text-[2rem] mobile:text-[1.2rem]">
              Dear Reader,
              <br/> <br/>
              I was inspired by the thought of worshipping Jesus in creative ways
              and seeing my journals for prayer and gratitude, I thought of
              creating a website where people can write their prayers and gratitude
              towards God. As time passed, my ideas expanded where I remember 
              Ashley Hetherington's truth mirror and decided to create a digital
              truth journal while being inspired by the Glorify App's Community
              feature. I wanted to create a space where people can share their
              walk with God that others who might be struggling
              with their faith may see the light through them. 
              I hope you find this website helpful and inspiring.
              I pray you may finish the race with joy. In Jesus name.

              Have a blessed day!

            <br/>  <br/>
            <p className="w-full flex justify-end relative right-3">-Kirsten</p>  
            </p>
          </div>
         </div>
        </>
    )
}