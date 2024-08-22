import { FC, useRef } from 'react';
import Canvas from '../../widgets/game/canvas';
import styles from './index.module.scss';
import ControlPanel from '../../widgets/game/control/СontrolPanel.tsx';
import Hero from '../../entities/game/Hero.ts';
import { colors } from '../../shared/config/styles/variables.ts';

const Game: FC = () => {
  const heroesRef = useRef<Hero[]>([
    new Hero({
      x: 0,
      y: 0,
      color: colors.primary,
      shootingFrequency: 5,
      projectileColor: colors.secondary,
      speed: 1,
      projectileDirection: 1,
    }),
    new Hero({
      x: 0,
      y: 0,
      color: colors.primary,
      shootingFrequency: 5,
      projectileColor: colors.secondary,
      speed: 1,
      projectileDirection: -1,
    }),
  ]);

  const onSpeedChange = (index: number, speed: number): void => {
    heroesRef.current[index].speed = speed;
  };
  const onFrequencyChange = (index: number, frequency: number): void => {
    const hero = heroesRef.current[index];
    clearInterval(hero.shootInterval);
    hero.shootingFrequency = frequency;
    if (frequency == 0) {
      return;
    }
    hero.shootInterval = setInterval(
      () => hero.shoot(),
      1000 / hero.shootingFrequency,
    );
  };

  return (
    <>
      <div className={styles.gameContainer}>
        <Canvas heroes={heroesRef.current} />
      </div>
      <div className={styles.gameController}>
        {heroesRef.current.map((hero, index) => (
          <div key={index}>
            <h3>Hero {index}</h3>
            <ControlPanel
              index={index}
              initialOpt={{
                speed: hero.speed,
                frequency: hero.shootingFrequency,
              }}
              onSpeedChange={onSpeedChange}
              onFrequencyChange={onFrequencyChange}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
