import { Hero } from './index.ts';

interface ProjectileParams {
  x: number;
  y: number;
  color: string;
  speed: number;
  direction: number;
}

class Projectile {
  x: number;
  y: number;
  private readonly color: string;
  private readonly speed: number;
  private readonly movementXDirection: number;
  isActive: boolean;

  private radius: number = 4;
  private startAngle: number = 0;
  private endAngle: number = 2 * Math.PI;

  constructor({ x, y, color, speed, direction }: ProjectileParams) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.movementXDirection = direction;
    this.isActive = false;
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: ReadonlyArray<Hero>,
  ) {
    this.manageMovement();
    this.manageCollision(heroes, canvas);
    this.paintProjectile(ctx);
  }

  manageMovement() {
    this.x += this.speed * this.movementXDirection;
  }

  manageCollision(heroes: ReadonlyArray<Hero>, canvas: HTMLCanvasElement) {
    this.manageHeroCollision(heroes);
    this.manageBorderCollision(canvas);
  }

  manageBorderCollision(canvas: HTMLCanvasElement) {
    if (this.x < 0 || this.x > canvas.width) {
      this.remove();
      return;
    }
  }

  manageHeroCollision(heroes: ReadonlyArray<Hero>) {
    heroes.forEach((hero, heroIndex) => {
      const distanceX = this.x - hero.x;
      const distanceY = this.y - hero.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < hero.radius + this.radius) {
        hero.handleHeroHit(heroIndex);
        this.remove();
      }
    });
  }

  paintProjectile(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  remove() {
    this.isActive = true;
  }
}

export default Projectile;
