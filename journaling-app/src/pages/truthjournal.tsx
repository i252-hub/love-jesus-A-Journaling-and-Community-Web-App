import Navbar from "../components/Navbar"
import { PlusCircleIcon} from '@heroicons/react/24/solid';
import { Link} from "react-router-dom";
import InfiniteCanvas from "../components/InfiniteCanvas";
import { useState } from "react";

type IconData = {
  id: string;
  type: string; 
  x: number;
  y: number;
};

export default function TruthJournal(){
  const [icons, setIcons] = useState<IconData[]>([
    { id: "note", type: "note", x: 50, y: 12 },
    { id: "delicious", type: "delicious", x: 110, y: 6 },
    { id: "trash", type: "trash", x: 170, y: 14 },
  ]);


  const handleMouseDown = (e: React.MouseEvent) => {
    console.log("Mouse down", e);
};

const handleMouseMove = (e: React.MouseEvent) => {
    console.log("Mouse move", e);
};

const handleMouseUp = () => {
    console.log("Mouse up");
};

const handleWheel = (e: React.WheelEvent) => {
    console.log("Mouse wheel", e);
};

const handleDragStart = (e: React.DragEvent<HTMLImageElement>, imageType: string) => {
  e.dataTransfer.setData("image-type", imageType); 
  console.log(`Drag started with type: ${imageType}`);  
};

const handleDragOver = (e: React.DragEvent<HTMLCanvasElement>) => {
  e.preventDefault(); 
};

const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
  e.preventDefault();
  const imageType = e.dataTransfer.getData("image-type");
  const canvasBounds = e.currentTarget.getBoundingClientRect();
  const mouseX = e.clientX - canvasBounds.left;
  const mouseY = e.clientY - canvasBounds.top;

  if (imageType) {
    const newIcon = {
      id: `${imageType}-${Date.now()}`, 
      type: imageType,
      x: mouseX,
      y: mouseY,
    };
    setIcons((prevIcons) => [...prevIcons, newIcon]);
  }

}






    return (
        <>
        <div className="bg-customYellow  h-[100vh] ref={divRef} overflow-hidden">
          <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
        SignIn = 'Sign-in' />

<div>



         <div  className="bg-customYellow relative top-[3rem] h-[100vh] w-full" >
         <InfiniteCanvas
                        width={800}
                        height={1000}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onWheel={handleWheel}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
        
        <div className="w-full  h-[3em]  flex items-center justify-between pt-5 relative bottom-[40em]">
         
         {icons.map((icon) => (
          <div className="w-[15%] flex items-center justify-center gap-2 object-contain ">
                    <img
                      key={icon.id}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, icon.type)}
                      src={
                        icon.type === "note"
                          ? "https://img.icons8.com/pastel-glyph/64/816f51/note.png"
                          : icon.type === "delicious"
                          ? "https://img.icons8.com/ios-filled/80/816f51/delicious.png"
                          : "https://img.icons8.com/glyph-neue/64/816f51/trash.png"
                      }
                      alt={icon.type}
                      className="w-[2.5rem] h-[2.5rem]  object-contain border-box"
                      style={{
                        position: "absolute",
                        left: `${icon.x}px`,
                        top: `${icon.y}px`,
                        width: icon.type === "note" ? "2rem" : icon.type === "delicious" ? "2.1rem" : "2.5rem", 
                        height: icon.type === "note" ? "3rem" : icon.type === "delicious" ? "3.5rem" : "2.3rem", 
                      }}
                    />
                             </div> 

                  ))}
         <div className="mr-3">
            <Link to="/">
            <PlusCircleIcon className="w-9 h-9 fill-customBrown"/>
            </Link></div>
            </div>
            
            {/*
                  <div className="mr-5">
                    
                  <Link to="/journalentrytwo">
                   
                   <PlusCircleIcon className="w-9 h-9 fill-customBrown"/>
                   </Link>
                  
                  </div>*/}
                </div>

              
              </div>
              </div>
             
             
          
         
      

        </>
       
    )
}