import { ProjectileManager } from './index.ts';

interface HeroParams {
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
  x: number;
  y: number;
  speed: number;
  shootingFrequency: number;
  hits: number = 0;
  radius: number = 10;
  private readonly color: string;
  private projectileManager: ProjectileManager;
  private onHitCallback: (heroIndex: number, hits: number) => void;
  private shootingInterval: ReturnType<typeof setInterval>;
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
    onHitCallback,
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

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: Hero[],
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
