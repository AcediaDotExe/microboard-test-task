// src/entities/Projectile.ts

import Hero from './Hero.ts';

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

  constructor({ x, y, color, speed, direction }: IProjectile) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.direction = direction; // Изначально направлен вверх, можно изменить в зависимости от нужд
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: Hero[],
  ) {
    // Обновление позиции заклинания
    this.x += this.speed * this.direction;

    // Проверка столкновений с границами канваса
    if (this.x < 0 || this.x > canvas.width) {
      this.remove(); // Удалить заклинание, если оно вышло за границу
      return;
    }

    // Отрисовка заклинания
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    // Проверка столкновений с героями
    heroes.forEach((hero) => {
      const distance = Math.sqrt(
        (this.x - hero.x) ** 2 + (this.y - hero.y) ** 2,
      );
      if (distance < this.radius + 20) {
        // Учитываем радиус героя
        this.remove(); // Удаление заклинания при столкновении с героем
      }
    });
  }

  remove() {
    // Логика для удаления или пометки заклинания как удаленного
    // В этой версии, метод просто не будет вызываться повторно в update
  }
}

export default Projectile;
