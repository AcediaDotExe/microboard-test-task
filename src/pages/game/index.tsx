import { FC, useRef, useState } from 'react';
import Canvas from '../../widgets/game/canvas';
import './index.scss';
import ControlPanel from '../../widgets/game/control/СontrolPanel.tsx';
import Hero from '../../entities/game/Hero.ts';
import { colors } from '../../shared/config/styles/variables.ts';
import ColorModal from '../../widgets/game/control/ColorModal.tsx';

const Game: FC = () => {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number | null>(
    null,
  );
  const [isModalOpen, setModalOpen] = useState(false);
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

  const handleCloseModal = () => {
    setSelectedHeroIndex(null);
    setModalOpen(false);
  };

  const handleColorChange = (color: string) => {
    if (selectedHeroIndex) {
      heroesRef.current[selectedHeroIndex].projectileColor = color;
      handleCloseModal();
    }
  };

  return (
    <>
      <div className="gameContainer">
        <Canvas
          heroes={heroesRef.current}
          setModalOpen={setModalOpen}
          setSelectedHeroIndex={setSelectedHeroIndex}
        />
      </div>
      <h3 className="click-info">
        Click on the hero to change the color of the spell
      </h3>
      <div className="gameController">
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
      {selectedHeroIndex !== null && (
        <ColorModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onColorChange={handleColorChange}
          initialColor={heroesRef.current[selectedHeroIndex].projectileColor}
        />
      )}
    </>
  );
};

export default Game;
