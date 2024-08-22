// src/entities/Projectile.ts

import Hero from './Hero.ts';
import { Dispatch, SetStateAction } from 'react';

export interface IProjectile {
  x: number;
  y: number;
  color: string;
  speed: number;
  direction: number;
}

class Projectile implements IProjectile {
  x: number;
  y: number;
  color: string;
  speed: number;

  radius: number = 4;
  startAngle: number = 0;
  endAngle: number = 2 * Math.PI;
  direction: number; // Направление движения по оси Y
  isRemoved: boolean;

  constructor({ x, y, color, speed, direction }: IProjectile) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.direction = direction; // Изначально направлен вверх, можно изменить в зависимости от нужд
    this.isRemoved = false;
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: Hero[],
    setScore: Dispatch<SetStateAction<Array<number>>>,
  ) {
    // Обновление позиции заклинания
    this.x += this.speed * this.direction;

    // Проверка столкновений с границами канваса
    if (this.x < 0 || this.x > canvas.width) {
      this.remove(); // Удалить заклинание, если оно вышло за границу
      return;
    }

    heroes.forEach((hero, heroIndex) => {
      const distanceX = this.x - hero.x;
      const distanceY = this.y - hero.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < hero.radius + this.radius) {
        hero.increaseHitCount();
        setScore((prevScores) => {
          const newScores = [...prevScores];
          newScores[heroIndex] = hero.hits;
          return newScores;
        });
        this.remove();
      }
    });

    // Отрисовка заклинания
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  remove() {
    this.isRemoved = true;
  }
}

export default Projectile;
