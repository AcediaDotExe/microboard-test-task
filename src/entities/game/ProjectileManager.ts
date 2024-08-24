import { Hero, Projectile } from './index.ts';
import { Dispatch, SetStateAction } from 'react';

class ProjectileManager {
  private projectiles: Projectile[] = [];
  private projectileColor: string;
  private projectileDirection: number;

  constructor(projectileColor: string, projectileDirection: number) {
    this.projectileColor = projectileColor;
    this.projectileDirection = projectileDirection;
  }
  addProjectile(x, y, heroRadius, speed) {
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
    heroes: Hero[],
    setScore: Dispatch<SetStateAction<Array<number>>>,
  ) {
    this.deleteInactiveProjectiles();
    if (this.projectiles.length !== 0) {
      this.projectiles.forEach((projectile: Projectile, index) => {
        projectile.update(ctx, canvas, heroes, setScore);
        if (projectile.y <= 0 || projectile.y >= canvas.height) {
          this.projectiles.splice(index, 1);
        }
      });
    }
  }

  deleteInactiveProjectiles() {
    this.projectiles = this.projectiles.filter((p) => !p.isActive);
  }
}

export default ProjectileManager;
