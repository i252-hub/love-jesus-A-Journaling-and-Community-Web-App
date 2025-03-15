import Navbar from "../components/Navbar"
import { ArrowUturnLeftIcon, WindowIcon, TrashIcon} from '@heroicons/react/24/solid';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useLocation} from "react-router-dom";
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
  const [previousCanvasIds, setPreviousCanvasIds] = useState<number[]>([]);
  const location = useLocation();
  const noteWidth = window.innerWidth < 768 ? 120 : 200; 
  const noteHeight = window.innerWidth < 768 ? 40 : 10;
  const entries: Entry[] = useMemo(() => {
    return location.state?.entries || [];
  }, [location.state?.entries]);  
  

  const loadIcons = (id: number) => {
    const savedIcons = localStorage.getItem(`icons-${id}`);
    if (savedIcons) {
      setIcons(JSON.parse(savedIcons));
    } else {
      setIcons([
        { id: "note", type: "note", x: 50, y: 12, text: "", showInput: false, showIcon: true },
        { id: "delicious", type: "delicious", x: 110, y: 10, text: "", showInput: false, showIcon: true },
      ]);
    }
  };
  
  useEffect(() => {
    const savedIcons = localStorage.getItem(`icons-${canvasId}`);
    if (!savedIcons) {
      const defaultIcons = [
        { id: "note", type: "note", x: 50, y: 12, text: "", showInput: false, showIcon: true },
        { id: "delicious", type: "delicious", x: 110, y: 10, text: "", showInput: false, showIcon: true },
      ];
      
      setIcons(defaultIcons);
      localStorage.setItem(`icons-${canvasId}`, JSON.stringify(defaultIcons)); 
    } else {
      setIcons(JSON.parse(savedIcons));
    }
  }, [canvasId]); 
  

  useEffect(() => {
    const savedCanvasIds = localStorage.getItem("canvas-ids");
    if (savedCanvasIds) {
      const parsedIds = JSON.parse(savedCanvasIds);
      setPreviousCanvasIds(parsedIds);
      setCanvasId(parsedIds[parsedIds.length - 1] || 1);
    } else {
      setPreviousCanvasIds([1]);
      setCanvasId(1);
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
    
    setPreviousCanvasIds((prev) => {
      const updatedIds = [...prev, newCanvasId];
      localStorage.setItem("canvas-ids", JSON.stringify(updatedIds));
      return updatedIds;
    });

    setIcons([
      { id: "note", type: "note", x: 50, y: 12, text: "", showInput: false, showIcon: true },
      { id: "delicious", type: "delicious", x: 110, y: 10, text: "", showInput: false, showIcon: true },
    ]);

    return newCanvasId;
  });

  setShowCanvas(true);
};

  
const handleBackClick = () => {
  setPreviousCanvasIds((prev) => {
    if (prev.length > 1) {
      const updatedIds = prev.slice(0, -1);
      const prevCanvasId = updatedIds[updatedIds.length - 1] || 1;
        console.log(previousCanvasIds)
      setCanvasId(prevCanvasId);
      localStorage.setItem("canvas-ids", JSON.stringify(updatedIds));
      
      return updatedIds;
    }
    return prev; 
  });
};


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

const handleTrashDrop = (e: React.DragEvent<SVGSVGElement>) => {
  e.preventDefault();

  const droppedIconId = e.dataTransfer.getData("icon-id");
  console.log("Dropped on trash!", droppedIconId);

  if (droppedIconId) {
    setIcons((prevIcons) => {
      const updatedIcons = prevIcons.filter((icon) => icon.id !== droppedIconId);
      localStorage.setItem(`icons-${canvasId}`, JSON.stringify(updatedIcons));
      return updatedIcons;
    });
  }
};



  
const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
  e.preventDefault();

  const droppedIconId = e.dataTransfer.getData("icon-id");
 


  

  const canvasBounds = e.currentTarget.getBoundingClientRect();
  const mouseX = e.clientX - canvasBounds.left;
  const mouseY = e.clientY - canvasBounds.top;
  const imageType = e.dataTransfer.getData("image-type");

  if (imageType) {
    const newIcon = {
      id: `${imageType}-${Date.now()}`,
      type: imageType,
      x: mouseX,
      y: mouseY,
      text: "",
      showInput: imageType === "note",
      isLabel: imageType === "delicious",
      showIcon: imageType !== "note",
      dropped: true,
    };

    setIcons((prevIcons) => [...prevIcons, newIcon]);
    localStorage.setItem(`icons-${canvasId}`, JSON.stringify([...icons, newIcon]));
  } else if (droppedIconId) {
    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === droppedIconId ? { ...icon, x: mouseX, y: mouseY } : icon
      )
    );
  }
};


const handleDragStart = (e: React.DragEvent<HTMLDivElement | HTMLInputElement>, icon: IconData) => {
  if (icon.dropped) {
    console.log("Dragging existing icon:", icon.id);
    e.dataTransfer.setData("icon-id", icon.id);
  } else {
    console.log("Dragging new icon type:", icon.type);
    e.dataTransfer.setData("image-type", icon.type);
  }
};




const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
  setIcons((prevIcons) => {
    const updatedIcons = prevIcons.map((icon) =>
      icon.id === id ? { ...icon, text: e.target.value } : icon
    );
    localStorage.setItem(`icons-${canvasId}`, JSON.stringify(updatedIcons));
    return updatedIcons;
  });
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
      const updatedIcons = entries.map((entry) => {
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
          id: `entry-${crypto.randomUUID()}`,
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
         />

<div>



         <div  className="bg-customYellow relative h-screen w-screen top-[3rem]" >
        

        
       
        
        <div className="w-full  h-[3em]  flex items-center justify-between pt-5 relative z-30 right-5 ">
      
        <div className="relative bottom-[5rem] h-full w-screen pointer-events-none">
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
        </div>
        <div className="absolute w-full mobile:top-[34rem]">
       
          <div className="relative w-full h-[3rem]">
          <div className="mr-3 flex gap-3 absolute top-[1rem] left-[90%]">
          {canvasId >= 2 && (
         <ArrowUturnLeftIcon onClick={handleBackClick} className="w-8 h-8 fill-customBrown relative left-[3rem]"/>
          )}
            
           
            </div>
          <TrashIcon 
          onDrop={handleTrashDrop}
          onDragOver={(e) => e.preventDefault()}
         id="trash-icon" className="absolute w-[2rem] top-[8px] tablet:top-[8px] h-[3rem] left-[10.5rem] z-10" fill="#816F51"/>
          
       
         {icons.map((icon) => (
          <div key={icon.id}
           className="w-[15%] flex items-center justify-center gap-2 object-contain ">
                   
                   {icon.showInput ? (
                    <input
                    
                    draggable="true"
                       onDragStart={(e) => handleDragStart(e, icon)}
                      type="text"
                      value={icon.text}
                      onChange={(e) => handleInputChange(e, icon.id)}
                      autoFocus
                      style={{left: `${Math.max(0, Math.min(icon.x, window.innerWidth - noteWidth))}px`,
                      top: `${Math.max(0, Math.min(icon.y, window.innerHeight - noteHeight))}px`,
                      }}
                      className="absolute cursor-default font-annie pl-3 placeholder-white  text-[12px] text-white border-none bg-customBrown w-[18rem] h-[3rem]"
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
                    <div
                    
                    onClick={handleCreateNewCanvas}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, icon)}
                    className="w-[2.5rem] h-[2.5rem] object-contain border-box absolute"
                    style={{
                      left: `${icon.x}px`,
                      top: `${icon.y}px`,
                      width: "2rem",
                      height: "3rem",
                    }}
                  >
                    {icon.type === "note" ? (
                     <StickyNote2Icon sx={{ width: "2rem", height: "3rem", color: "#816F51" }} className="w-[2rem] h-[3rem]"  />
                    ) : icon.type === "delicious" ? (
                      <WindowIcon className="w-[2rem] h-[3rem]" fill="#816F51" />
                    ) : null}
                  </div>
       
          )}
          
                     
                             </div> 

                  ))}
</div>
</div>
           
                  
          
                    
   
            </div>
            
       
           
                </div>
               
              
              </div>
              </div>
             
             
          
         
      

        </>
       
    )
}