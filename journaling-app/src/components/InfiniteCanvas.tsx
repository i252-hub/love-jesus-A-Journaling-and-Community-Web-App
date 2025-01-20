import { useRef, useEffect, useState } from "react";
import TruthJournal from "../pages/truthjournal";

const InfiniteCanvas = () => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [scale, setScale] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          setContext(canvas.getContext("2d"));
        }
      }, []);

      useEffect(() => {
        if (context) {
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
          context.save();
          context.translate(offsetX, offsetY);
          context.scale(scale, scale);
    
          drawGrid(context);
    
          context.restore();
        }
      }, [context, offsetX, offsetY, scale]);


      const drawGrid = (ctx) => {
        const gridSize = 50;
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 0.5;
    
        for (let x = -2000; x < 2000; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, -2000);
          ctx.lineTo(x, 2000);
          ctx.stroke();
        }
        for (let y = -2000; y < 2000; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(-2000, y);
          ctx.lineTo(2000, y);
          ctx.stroke();
        }
      };

      const handleMouseDown = (e) => {
        setIsPanning(true);
        setStartX(e.clientX - offsetX);
        setStartY(e.clientY - offsetY);
      };

      const handleMouseMove = (e) => {
        if (isPanning) {
          setOffsetX(e.clientX - startX);
          setOffsetY(e.clientY - startY);
        }
      };

      const handleMouseUp = () => {
        setIsPanning(false);
      };


      const handleWheel = (e) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        const deltaScale = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
    
        setScale((prevScale) => prevScale * deltaScale);
    
        const mouseX = e.clientX - canvasRef.current.offsetLeft;
        const mouseY = e.clientY - canvasRef.current.offsetTop;
    
        const newOffsetX =
          mouseX - ((mouseX - offsetX) * deltaScale) / scale;
        const newOffsetY =
          mouseY - ((mouseY - offsetY) * deltaScale) / scale;
    
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
      };

      return(
        <TruthJournal />
        <>
        </>
      )
}

export default InfiniteCanvas