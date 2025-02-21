import Navbar from "../components/Navbar";
import { gsap } from "gsap";
import { useEffect, useRef, useState} from "react";
import gaons from '../assets/gaons.png'
import gce from '../assets/gce.png'
import gdnw from '../assets/gdnw.png'
import ghf from '../assets/ghf.png'
import gias from '../assets/gias.png'
import gid from '../assets/Gid.png'
import gii from '../assets/gii.png'
import giind from '../assets/giind.png'
import gimm from '../assets/gimm.png'
import ginp from '../assets/ginp.png'
import gisam from '../assets/gisam.png'
import giu from '../assets/giu.png'
import jfr from '../assets/jfr.png'
import jiad from '../assets/jiad.png'
import jiah from '../assets/jiah.png'
import jiap from '../assets/jiap.png'
import jne from '../assets/jne.png'
import js from '../assets/js.png'
import centerverse from '../assets/centerverse.png'

const images = Array(30).fill([
    gaons, gce, gdnw, ghf, gias,
    gid, gii, giind, gimm, ginp, gisam, giu, 
    jfr, jiad, jiah, jiap, jne, js
]).flat();



export default function Home(){


    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [initialPositions, setInitialPositions] = useState<{ x: number; y: number; rotation: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
    
        const storedPositions = localStorage.getItem("imagePositions");

        let positions;
        if (storedPositions) {
          positions = JSON.parse(storedPositions);
        } else {
          positions = images.map(() => ({
            x: Math.random() * (containerWidth - 100),
            y: Math.random() * (containerHeight - 100),
            rotation: Math.random() * 60 - 30,
          }));
          localStorage.setItem("imagePositions", JSON.stringify(positions));
        }
        setInitialPositions(positions);
       
          }, []);

          useEffect(() => {
            if (initialPositions.length > 0) {
              setTimeout(() => setIsLoading(false), 9000); 
            }
          }, [initialPositions]);

      useEffect(() => {

        if (initialPositions.length === 0) return;
    
        imageRefs.current.forEach((img, index) => {
          if (img) {
            gsap.set(img, {
              x: initialPositions[index].x,
              y: initialPositions[index].y,
              rotation: initialPositions[index].rotation,
            });
          }
        });
      }, [initialPositions]);
    
      const handleMouseEnter = (index: number) => {
        const img = imageRefs.current[index];
        if (!img || !containerRef.current) return;
    
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
    
        const newX = Math.random() * (containerWidth - 100);
        const newY = Math.random() * (containerHeight - 100);
        const newRotation = Math.random() * 60 - 30;
    
        gsap.to(img, {
          x: newX,
          y: newY,
          rotation: newRotation,
          duration: 0.6,
          ease: "power2.out",
        });
      };
    
     
    return(
        <>
        <div className="bg-customBrown h-screen  overflow-hidden">
        <Navbar
        Journal='Journal'
        Community = 'Community'
        About = 'About'
         />
   {isLoading &&  (
        <div className="absolute inset-0 flex items-center justify-center bg-customBrown">
          <p className="text-white text-2xl animate-pulse">Loading visuals...</p>
        </div>
   )}
          <div>
            <img src={centerverse} className="absolute left-[25rem] tablet:left-[10rem] tablet:top-[8rem] mobile:left-0" />
          </div>

          <div ref={containerRef} className="relative w-full h-full">
            {initialPositions.length > 0 &&
              images.map((src, index) => (
                <img
                  key={index}
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={src}
                  alt={`Image ${index}`}
                  className="absolute w-[20%] h-[10%] tablet:w-[40%] mobile:w-[50%] mobile:h-[8%] transition-opacity duration-500"
                  style={{
                    left: `${initialPositions[index].x}px`,
                    top: `${initialPositions[index].y}px`,
                    transform: `rotate(${initialPositions[index].rotation}deg)`,
                    opacity: 1,
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                />
              ))}
          </div>
      
     
  
  
      
        
   </div>
        </>
    )

}
