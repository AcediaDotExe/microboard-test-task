import { useCallback, useRef, useState } from 'react';
import { Hero } from '../../../entities/game';
import { colors } from '../../config/styles/variables.ts';

export const useHeroes = () => {
  const [score, setScore] = useState<number[]>([0, 0]);

  const handleHeroHit = useCallback((heroIndex: number, hits: number) => {
    setScore((prevScores) => {
      const newScores = [...prevScores];
      newScores[heroIndex] = hits;
      return newScores;
    });
  }, []);

  const heroesRef = useRef<Hero[]>([
    new Hero({
      x: 0,
      y: 10,
      color: colors.primary,
      shootingFrequency: 5,
      projectileColor: colors.secondary,
      speed: 1,
      projectileDirection: 1,
      onHitCallback: handleHeroHit,
    }),
    new Hero({
      x: 0,
      y: 10,
      color: colors.primary,
      shootingFrequency: 5,
      projectileColor: colors.secondary,
      speed: 1,
      projectileDirection: -1,
      onHitCallback: handleHeroHit,
    }),
  ]);

  const onSpeedChange = useCallback((index: number, speed: number): void => {
    heroesRef.current[index].speed = speed;
  }, []);

  const onFrequencyChange = useCallback(
    (index: number, frequency: number): void => {
      heroesRef.current[index].manageShooting(frequency);
    },
    [],
  );

  return {
    heroes: heroesRef.current,
    score,
    onSpeedChange,
    onFrequencyChange,
  };
};
