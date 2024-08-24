import { Hero, Projectile } from './index.ts';

class ProjectileManager {
  projectileColor: string;
  private projectiles: Projectile[] = [];
  private readonly projectileDirection: number;

  constructor(projectileColor: string, projectileDirection: number) {
    this.projectileColor = projectileColor;
    this.projectileDirection = projectileDirection;
  }

  addProjectile(x: number, y: number, heroRadius: number, speed: number) {
    const startRangeMultiplier = 2;
    const projectile = new Projectile({
      x: x + this.projectileDirection * heroRadius * startRangeMultiplier,
      y: y,
      color: this.projectileColor,
      speed: speed,
      direction: this.projectileDirection,
    });
    this.projectiles.push(projectile);
  }

  updateProjectiles(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heroes: ReadonlyArray<Hero>,
  ) {
    this.deleteInactiveProjectiles();
    if (this.projectiles.length !== 0) {
      this.projectiles.forEach((projectile: Projectile, index) => {
        this.deleteOutOfBoundsProjectile(projectile, canvas, index);
        projectile.update(ctx, canvas, heroes);
      });
    }
  }

  private deleteInactiveProjectiles() {
    this.projectiles = this.projectiles.filter((p) => !p.isActive);
  }

  private deleteOutOfBoundsProjectile(
    projectile: Projectile,
    canvas: HTMLCanvasElement,
    index: number,
  ) {
    if (projectile.y <= 0 || projectile.y >= canvas.height) {
      this.projectiles.splice(index, 1);
    }
  }
}

export default ProjectileManager;
