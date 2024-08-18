// src/entities/Hero.ts
import Projectile from './Projectile.ts';

export interface IHero {
  x: number;
  y: number;
  color: string;
  speed: number;
  projectileDirection: number;
  shootingFrequency: number;
  projectileColor: string;
}

class Hero implements IHero {
  x: number;
  y: number;
  color: string;
  speed: number;
  direction: number;
  shootingFrequency: number;
  projectileColor: string;
  projectileDirection: number;
  projectiles: Projectile[] = [];

  radius: number = 10;
  startAngle: number = 0;
  endAngle: number = 2 * Math.PI;

  constructor({
    x,
    y,
    color,
    shootingFrequency,
    speed,
    projectileColor,
    projectileDirection,
  }: IHero) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.shootingFrequency = shootingFrequency;
    this.projectileColor = projectileColor;
    this.direction = 1;
    this.projectileDirection = projectileDirection;
    this.shoot = this.shoot.bind(this);
    setInterval(() => this.shoot(), 1000 / this.shootingFrequency);
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: Hero[],
  ) {
    // Обновление и отрисовка заклинаний
    this.projectiles.forEach((projectile, index) => {
      projectile.update(ctx, canvas, heroes);

      // Логика столкновения заклинания с границей
      if (projectile.y <= 0 || projectile.y >= canvas.height) {
        this.projectiles.splice(index, 1); // Удаление заклинания при выходе за границу
      }
    });

    // Логика движения
    this.y += this.speed * this.direction;

    // Отталкивание от границ поля
    if (this.y <= 0 || this.y >= canvas.height) {
      this.direction *= -1;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  shoot() {
    const projectile = new Projectile({
      x: this.x,
      y: this.y,
      color: this.projectileColor,
      speed: 5,
      direction: this.projectileDirection,
    });
    this.projectiles.push(projectile);
  }
}

export default Hero;
