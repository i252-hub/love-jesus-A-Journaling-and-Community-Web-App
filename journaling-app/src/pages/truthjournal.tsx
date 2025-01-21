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
  text: string;
  showInput: boolean;
  isLabel?: boolean;
};

export default function TruthJournal(){
  const [icons, setIcons] = useState<IconData[]>([
    { id: "note", type: "note", x: 50, y: 12, text: "", showInput: true },
    { id: "delicious", type: "delicious", x: 110, y: 6, text: "", showInput: true},
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
      text: "", 
      showInput: imageType === "note",
      isLabel: imageType === "delicious",
    };
    setIcons((prevIcons) => [...prevIcons, newIcon]);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === id ? { ...icon, text: e.target.value } : icon
      )
    );
  };

  const handleBlur = (id: string) => {
    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === id ? { ...icon, showInput: false } : icon
      )
    );
  };

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



         <div  className="bg-customYellow relative top-[3rem] w-full" >
         <InfiniteCanvas
                        width={window.innerWidth}
                        height={window.innerHeight}
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
                   
                   {icon.showInput ? (
                    <input
                      type="text"
                      value={icon.text}
                      onChange={(e) => handleInputChange(e, icon.id)}
                      onBlur={() => handleBlur(icon.id)}
                      autoFocus
                      className="absolute bottom-0 left-0 w-full text-center border-none bg-transparent"
                      placeholder="Enter text"
                    />
                  ) : icon.isLabel ? (
                    <div
                      className="absolute bottom-0 left-0 text-sm"
                      style={{ top: `${icon.y + 30}px`, left: `${icon.x}px` }}
                    >
                      <label>{icon.text || "Label"}</label>
                    </div>
                  ) : (
                    <img
                      draggable="true"
                      onDragStart={(e) =>
                        e.dataTransfer.setData("image-type", icon.type)
                      }
                      src={
                        icon.type === "note"
                          ? "https://img.icons8.com/pastel-glyph/64/816f51/note.png"
                          : icon.type === "delicious"
                          ? "https://img.icons8.com/ios-filled/80/816f51/delicious.png"
                          : ""
                      }
                      alt={icon.type}
                      className="w-[2.5rem] h-[2.5rem] object-contain border-box"
                      style={{
                        position: "absolute",
                        left: `${icon.x}px`,
                        top: `${icon.y}px`,
                        width: "2rem",
                        height: "3rem",
                      }}
                    />
       
          )}
          
                     
                             </div> 

                  ))}
                  

                   <img 
                      className="absolute w-[2.5rem] right-[83.5%]"
                      src = "https://img.icons8.com/glyph-neue/64/816f51/trash.png"/>

          
                    
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