import { FC } from 'react';
import ControlPanel from '../../widgets/control/СontrolPanel.tsx';
import { Hero } from '../../entities/game';
import './GameController.scss';

interface GameControllerProps {
  heroes: Hero[];
  onSpeedChange: (index: number, speed: number) => void;
  onFrequencyChange: (index: number, frequency: number) => void;
}

const GameController: FC<GameControllerProps> = ({
  heroes,
  onSpeedChange,
  onFrequencyChange,
}) => {
  return (
    <div className="gameController">
      {heroes.map((hero, index) => (
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
  );
};

export default GameController;
