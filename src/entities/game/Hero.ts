import { ProjectileManager } from './index.ts';
import { Position } from '../../shared/types/globals.ts';

interface HeroParams {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  projectileDirection: number;
  shootingFrequency: number;
  projectileColor: string;
  onHitCallback: (heroIndex: number, hits: number) => void;
}

class Hero {
  id: number;
  x: number;
  y: number;
  speed: number;
  shootingFrequency: number = 0;
  hits: number = 0;
  radius: number = 10;
  private projectileManager: ProjectileManager;
  private shootingInterval: ReturnType<typeof setInterval> | null = null;
  private movementYDirection: number = 1;
  private readonly startAngle: number = 0;
  private readonly endAngle: number = 2 * Math.PI;
  private readonly onHitCallback: (heroIndex: number, hits: number) => void;
  private readonly color: string;

  constructor({
    id,
    x,
    y,
    color,
    shootingFrequency,
    speed,
    projectileColor,
    projectileDirection,
    onHitCallback,
  }: HeroParams) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.projectileManager = new ProjectileManager(
      projectileColor,
      projectileDirection,
    );
    this.manageShooting(shootingFrequency);
    this.onHitCallback = onHitCallback;
  }

  manageShooting(shootingFrequency: number) {
    this.clearShootingInterval();
    this.shootingFrequency = shootingFrequency;
    this.shootingInterval = setInterval(
      () => this.shoot(),
      1000 / this.shootingFrequency,
    );
  }

  increaseHitCount(amount: number = 1) {
    this.hits += amount;
  }

  handleHeroHit(heroIndex: number) {
    this.increaseHitCount();
    if (this.onHitCallback) {
      this.onHitCallback(heroIndex, this.hits);
    }
  }

  changeDirection() {
    this.movementYDirection *= -1;
  }

  public getDistanceBetweenMouseAndHero(mousePosition: Position): number {
    const distanceX = this.x - mousePosition.x;
    const distanceY = this.y - mousePosition.y;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: ReadonlyArray<Hero>,
  ) {
    this.projectileManager.updateProjectiles(ctx, canvas, heroes);
    this.manageMovement(canvas);
    this.paintHero(ctx);
  }

  setProjectileColor(color: string) {
    this.projectileManager.projectileColor = color;
  }

  getProjectileColor(): string {
    return this.projectileManager.projectileColor;
  }

  private clearShootingInterval() {
    if (this.shootingInterval) {
      clearInterval(this.shootingInterval);
    }
  }

  private shoot(projectileSpeed: number = 1) {
    this.projectileManager.addProjectile(
      this.x,
      this.y,
      this.radius,
      projectileSpeed,
    );
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
