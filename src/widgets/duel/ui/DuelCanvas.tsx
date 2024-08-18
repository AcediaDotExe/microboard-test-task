import { FC, useEffect, useRef } from 'react';
import { colors } from '../../../shared/config/styles/variables.ts';

const DuelCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colors.background;
      }
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DuelCanvas;
