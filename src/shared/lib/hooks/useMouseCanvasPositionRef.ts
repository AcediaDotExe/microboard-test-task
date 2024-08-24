import { RefObject, useEffect, useRef } from 'react';
import { Position } from '../../types/globals.ts';

const useMouseCanvasPositionRef = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const mouseCanvasPositionRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect: DOMRect = canvas.getBoundingClientRect();
        mouseCanvasPositionRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef]);

  return mouseCanvasPositionRef;
};

export default useMouseCanvasPositionRef;
