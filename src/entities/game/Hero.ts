import { Dispatch, SetStateAction } from 'react';
import { ProjectileManager } from './index.ts';

interface HeroParams {
  x: number;
  y: number;
  color: string;
  speed: number;
  projectileDirection: number;
  shootingFrequency: number;
  projectileColor: string;
}

class Hero {
  x: number;
  y: number;
  speed: number;
  private readonly color: string;

  private shootingFrequency: number;
  private shootingInterval: ReturnType<typeof setInterval>;
  private projectileManager: ProjectileManager;

  public hits: number = 0;
  public radius: number = 10;
  private movementYDirection: number = 1;
  private readonly startAngle: number = 0;
  private readonly endAngle: number = 2 * Math.PI;

  constructor({
    x,
    y,
    color,
    shootingFrequency,
    speed,
    projectileColor,
    projectileDirection,
  }: HeroParams) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.projectileManager = new ProjectileManager(
      projectileColor,
      projectileDirection,
    );
    this.manageShooting(shootingFrequency);
  }

  manageShooting(shootingFrequency: number) {
    this.clearShootingInterval();
    this.shootingFrequency = shootingFrequency;
    this.shootingInterval = setInterval(
      () => this.shoot(),
      1000 / this.shootingFrequency,
    );
  }

  clearShootingInterval() {
    if (this.shootingInterval) {
      clearInterval(this.shootingInterval);
    }
  }

  shoot(projectileSpeed: number = 1) {
    this.projectileManager.addProjectile(
      this.x,
      this.y,
      this.radius,
      projectileSpeed,
    );
  }

  increaseHitCount(amount: number = 1) {
    this.hits += amount;
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: Hero[],
    setScore: Dispatch<SetStateAction<Array<number>>>,
  ) {
    this.projectileManager.updateProjectiles(ctx, canvas, heroes, setScore);
    this.manageMovement(canvas);
    this.paintHero(ctx);
  }

  private manageMovement(canvas: HTMLCanvasElement) {
    this.y += this.speed * this.movementYDirection;

    if (this.y <= 0 || this.y >= canvas.height) {
      this.movementYDirection *= -1;
    }
  }

  private paintHero(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Hero;
