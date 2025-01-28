import Navbar from "../components/Navbar"
import { PlusCircleIcon, ArrowUturnLeftIcon} from '@heroicons/react/24/solid';
import {Link, useLocation} from "react-router-dom";
import InfiniteCanvas from "../components/InfiniteCanvas";
import { useState, useEffect, useMemo} from "react";

type IconData = {
  id: string;
  type: string; 
  x: number;
  y: number;
  text: string;
  showInput: boolean;
  isLabel?: boolean;
  showIcon: boolean; 
  dropped?: boolean;
};

type Entry = {
  id: string;
  description: string[]
}

export default function TruthJournal(){
  const [icons, setIcons] = useState<IconData[]>([
    { id: "note", type: "note", x: 50, y: 12, text: "", showInput: false, showIcon: true },
    { id: "delicious", type: "delicious", x: 110, y: 10, text: "", showInput: false, showIcon: true},
  ]);

  const [showCanvas, setShowCanvas] = useState(true);
  const [canvasId, setCanvasId] = useState(1);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [previousCanvasIds, setPreviousCanvasIds] = useState<number[]>([]);
  const location = useLocation();
  const entries: Entry[] = useMemo(() => {
    return location.state?.entries || [];
  }, [location.state?.entries]);  
  

  const loadIcons = (id: number) => {
    const savedIcons = localStorage.getItem(`icons-${id}`);
    if (savedIcons) {
      setIcons(JSON.parse(savedIcons));
    } else {
      setIcons([]); 
    }
  };

  useEffect(() => {
    const savedCanvasIds = localStorage.getItem("canvas-ids");
    if (savedCanvasIds) {
      const parsedIds = JSON.parse(savedCanvasIds);
      setPreviousCanvasIds(parsedIds);
      setCurrentCanvasIndex(parsedIds.length - 1);
    }
  }, []);

  useEffect(() => {
    if (canvasId) {
      loadIcons(canvasId);
    }
  }, [canvasId]);
  
  const handleCreateNewCanvas = () => {
    setCanvasId((prevId) => {
      const newCanvasId = prevId + 1;  
  
      setPreviousCanvasIds((prevCanvasIds) => {
        const updatedCanvasIds = [...prevCanvasIds, prevId, newCanvasId];  
        localStorage.setItem("canvas-ids", JSON.stringify(updatedCanvasIds));
        setCurrentCanvasIndex(updatedCanvasIds.length - 1);
  
        const currentIcons = icons.filter(icon => !icon.dropped); 
      
        localStorage.setItem(`icons-${newCanvasId}`, JSON.stringify(currentIcons));
        return updatedCanvasIds;
      });
  
      return newCanvasId;  
    });
  
    setShowCanvas(true);
    
  };
  
  

const handleBackClick = () => {
  if (currentCanvasIndex > 0) {
    const previousIndex = currentCanvasIndex - 1;
    const previousCanvasId = previousCanvasIds[previousIndex];


    setCurrentCanvasIndex(previousIndex);
    setCanvasId(previousCanvasId);


    const savedIcons = localStorage.getItem(`icons-${previousCanvasId}`);
    if (savedIcons) {
      setIcons(JSON.parse(savedIcons));
    } else {
      console.warn(`No saved icons for canvas ID: ${previousCanvasId}`);
      setIcons([]); 
    }
  } else {
    console.warn("No previous canvas available.");
  }
};


  useEffect(() => {
    console.log("Canvas ID:", canvasId);
    console.log("Current Index:", currentCanvasIndex);
    console.log("Previous Canvas IDs:", previousCanvasIds);
  }, [canvasId, currentCanvasIndex, previousCanvasIds]);
  



  


  
  

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
      isLabel: imageType === "delicious" ,
      showIcon: imageType !== "note", 
      dropped: true
       };
   
       const updatedIcons = [...icons, newIcon];
    setIcons(updatedIcons);
    localStorage.setItem(`icons-${canvasId}`, JSON.stringify(updatedIcons));

  }

  
}

const handleDragStart = (e: React.DragEvent<HTMLImageElement>, imageType: string) => {
  e.dataTransfer.setData("image-type", imageType); 
  console.log(`Drag started with type: ${imageType}`);  
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
  setIcons((prevIcons) =>
    prevIcons.map((icon) =>
      icon.id === id ? { ...icon, text: e.target.value } : icon
    )
  );
};




console.log(showCanvas);

useEffect(() => {
  const savedIcons = localStorage.getItem("icons");
  if (savedIcons) {
    setIcons(JSON.parse(savedIcons));
  }
}, []);

useEffect(() => {
  if (entries.length > 0) {
    setIcons((prevIcons) => {
      const updatedIcons = entries.map((entry, index) => {
        const generateRandomPosition = () => {
          const canvasWidth = window.innerWidth;
          const canvasHeight = window.innerHeight;
          return {
            x: Math.floor(Math.random() * (canvasWidth - 100)),
            y: Math.floor(Math.random() * (canvasHeight - 100)), 
          };
        };

        const isOverlapping = (x: number, y: number, icons: IconData[]) => {
          const margin = 20; 
          return icons.some(
            (icon) =>
              Math.abs(icon.x - x) < margin && Math.abs(icon.y - y) < margin
          );
        };

        let position = generateRandomPosition();
        while (isOverlapping(position.x, position.y, prevIcons)) {
          position = generateRandomPosition();
        }

        return {
          id: `entry-${entry.id || index}`,
          type: "note",
          x: position.x,
          y: position.y,
          text: entry.description.join(", "),
          showInput: true,
          showIcon: false,
          isLabel: false,
          dropped: true,
        };
      });

      return [...prevIcons, ...updatedIcons];
    });
  }
}, [entries]); 




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

        {showCanvas &&
        (
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
        )}
        
       
        
        <div className="w-full  h-[3em]  flex items-center justify-between pt-5 relative bottom-[40em]">
         
         {icons.map((icon) => (
          <div key={icon.id} className="w-[15%] flex items-center justify-center gap-2 object-contain ">
                   
                   {icon.showInput ? (
                    <input
                      type="text"
                      value={icon.text}
                      onChange={(e) => handleInputChange(e, icon.id)}
                      autoFocus
                      style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
                      className="absolute font-annie pl-3 placeholder-white  text-[12px] text-white border-none bg-customBrown w-[18rem] h-[3rem]"
                      placeholder="Enter text"
                    />
                  ) : icon.isLabel  && (
                    <div
                      className="absolute bottom-0 left-0 text-sm"
                      style={{ top: `${icon.y + 30}px`, left: `${icon.x}px` }}
                    >
                     <input
                      type="text"
                      value={icon.text}
                      onChange={(e) => handleInputChange(e, icon.id)}
                      autoFocus
                      className="font-annie placeholder-customBrown text-[12px] text-center border-none text-customBrown  bg-transparent w-[5rem] relative top-3 right-[1.50rem] focus:border-none focus:outline-none"
                      placeholder="Enter text"
                    />
                     
                    </div>
                  )} 
                  
                   {icon.showIcon && (
                    <img
                    onClick={handleCreateNewCanvas}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, icon.type)
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

          
                    
         <div className="mr-3 flex gap-3">
         <ArrowUturnLeftIcon onClick={handleBackClick} className="w-8 h-8 fill-customBrown"/>
            <Link to="/journalentrythree">
            <PlusCircleIcon className="w-9 h-9 fill-customBrown"/>
            </Link>
           
            </div>
            </div>
            
       
           
                </div>
               
              
              </div>
              </div>
             
             
          
         
      

        </>
       
    )
}