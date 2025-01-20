import { useRef, useEffect, useState, useCallback } from "react";

interface InfiniteCanvasProps {
    onMouseDown?: (e: React.MouseEvent) => void;
    onMouseMove?: (e: React.MouseEvent) => void;
    onMouseUp?: (e: React.MouseEvent) => void;
    onWheel?: (e: React.WheelEvent) => void;
    onDragOver: (e: React.DragEvent<HTMLCanvasElement>) => void;
    onDrop: (e: React.DragEvent<HTMLCanvasElement>) => void;
    width: number,
    height: number
  }
  
  const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel,
    onDragOver,
    onDrop,
    width,
    height
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [scale, setScale] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
        const gridSize = 20;
        ctx.strokeStyle = "#816F51";
        ctx.lineWidth = 0.5;
        const dotSize = 1;  
        const dotSpacing = 5;
        const dotRadius = 2;
        ctx.fillStyle = "rgba(129, 111, 81, 0.30)";

        const gridScaleFactor = Math.max(1, scale);

        const startX = Math.floor((-offsetX / scale) / gridSize) * gridSize;
        const endX = Math.ceil((width - offsetX) / scale / gridSize) * gridSize;
        const startY = Math.floor((-offsetY / scale) / gridSize) * gridSize;
        const endY = Math.ceil((height - offsetY) / scale / gridSize) * gridSize;

        for (let x = startX; x < endX; x += gridSize) {
            for (let y = startY; y < endY; y += gridSize) {
              ctx.beginPath();
              ctx.arc(x, y, dotRadius * gridScaleFactor, 0, Math.PI * 2);
              ctx.fill();
            }
          }
    
          ctx.setLineDash([dotSize, dotSpacing]);
          for (let x = startX; x < endX; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();
          }
          for (let y = startY; y < endY; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
          }
          ctx.setLineDash([]);
        },
        [offsetX, offsetY, scale, width, height]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(offsetX, offsetY);
        context.scale(scale, scale);
        drawGrid(context);
        context.restore();
      }
    }
  }, [drawGrid, offsetX, offsetY, scale, width, height]);

      


     
      
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(offsetX, offsetY);
        context.scale(scale, scale);
        drawGrid(context);
        context.restore();
      }
    }
  }, [offsetX, offsetY, scale, drawGrid, width, height]);
     
      
      useEffect(() => {
        const drawCanvas = () => {
            const canvas = document.getElementById("canvas") as HTMLCanvasElement;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height); 
              drawGrid(ctx);
            }
          };
        window.addEventListener("resize", drawCanvas);
        return () => window.removeEventListener("resize", drawCanvas);
      }, [drawGrid]);

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
    
        setScale((prevScale) => {
            const newScale = prevScale * deltaScale;
            return Math.max(0.1, Math.min(newScale, 5)); 
          });    
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

      const handleDragOver = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (onDragOver) onDragOver(e);
      };
      
      const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (onDrop) onDrop(e);
      };
      

      return(
        <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ width: "100%", height: "100%" }}

    />
      )
}

export default InfiniteCanvas