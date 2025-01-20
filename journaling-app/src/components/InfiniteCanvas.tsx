import { useRef, useEffect, useState } from "react";

interface InfiniteCanvasProps {
    onMouseDown?: (e: React.MouseEvent) => void;
    onMouseMove?: (e: React.MouseEvent) => void;
    onMouseUp?: (e: React.MouseEvent) => void;
    onWheel?: (e: React.WheelEvent) => void;
  }
  
  const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

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
        if (context && canvasRef.current) {
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
          context.save();
          context.translate(offsetX, offsetY);
          context.scale(scale, scale);
    
          drawGrid(context);
    
          context.restore();
        }
      }, [context, offsetX, offsetY, scale]);


      const drawGrid = (ctx:  CanvasRenderingContext2D) => {
        const gridSize = 20;
        ctx.strokeStyle = "#816F51";
        ctx.lineWidth = 0.5;
        const dotSize = 1;  
        const dotSpacing = 5;
        const dotRadius = 2;
        ctx.fillStyle = "rgba(129, 111, 81, 0.18)";

        for (let x = -2000; x < 2000; x += gridSize) {
            for (let y = -2000; y < 2000; y += gridSize) {
              ctx.beginPath();
              ctx.arc(x, y, dotRadius, 0, Math.PI * 2);  
              ctx.fill();  
          }
        }
    
        ctx.setLineDash([dotSize, dotSpacing]);
        for (let x = -2000; x < 2000; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, -2000);
          ctx.lineTo(x, 2000);
        }
        for (let y = -2000; y < 2000; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(-2000, y);
          ctx.lineTo(2000, y);
        }
        ctx.setLineDash([]);
      };

      const handleMouseDown = (e: React.MouseEvent) => {
        setIsPanning(true);
        setStartX(e.clientX - offsetX);
        setStartY(e.clientY - offsetY);
        if (onMouseDown) onMouseDown(e);

      };

      const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
          setOffsetX(e.clientX - startX);
          setOffsetY(e.clientY - startY);
          if (onMouseMove) onMouseMove(e);

        }
      };

      const handleMouseUp = (e: React.MouseEvent) => {
        setIsPanning(false);
        if (onMouseUp) onMouseUp(e);

      };


      const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (canvasRef.current) {
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
        if (onWheel) onWheel(e);

        }
      };

      return(
        <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
    />
      )
}

export default InfiniteCanvas