import { FC, useCallback, useEffect, useRef } from 'react';
import { colors } from '../../../shared/config/styles/variables.ts';
import './index.module.scss';
import Hero from '../../../entities/game/Hero.ts';

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroesRef = useRef<Hero[]>([
    new Hero({
      x: 0,
      y: 0,
      color: colors.primary,
      shootingFrequency: 5,
      projectileColor: colors.secondary,
      speed: 0.5,
      projectileDirection: 1,
    }),
    new Hero({
      x: 0,
      y: 0,
      color: colors.primary,
      shootingFrequency: 5,
      projectileColor: colors.secondary,
      speed: 0.1,
      projectileDirection: -1,
    }),
  ]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      heroesRef.current[0].x = 30;
      heroesRef.current[1].x = canvas.width - 30;
      draw(); // Перерисовать после изменения размера
    }
  }, []);

  useEffect(() => {
    resizeCanvas(); // Устанавливаем размер при монтировании
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Пример рисования круга
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colors.background;
        const update = () => {
          // Очистка канваса перед каждой отрисовкой
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Обновление и отрисовка героев
          heroesRef.current.forEach((hero) => {
            hero.update(ctx, canvas, heroesRef.current);
          });

          // Запрос следующего кадра
          requestAnimationFrame(update);
        };

        update();
      }
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      heroesRef.current.forEach((hero) => {
        if (
          Math.abs(hero.x - clientX) < 30 &&
          Math.abs(hero.y - clientY) < 30
        ) {
          hero.direction *= -1; // Отталкивание от курсора
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
