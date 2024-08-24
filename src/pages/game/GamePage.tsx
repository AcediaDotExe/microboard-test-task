import { FC, useCallback } from 'react';
import Canvas from '../../widgets/canvas/Canvas.tsx';
import ColorModal from '../../widgets/control/ColorModal';
import { useHeroes, useHeroSelection } from '../../shared/lib/hooks';
import { GameController, ScoreDisplay } from '../../features/game';
import './GamePage.scss';

const GamePage: FC = () => {
  const { heroes, score, setScore, onSpeedChange, onFrequencyChange } =
    useHeroes();
  const { selectedHeroIndex, isModalOpen, handleOpenModal, handleCloseModal } =
    useHeroSelection();

  const handleColorChange = useCallback(
    (color: string) => {
      if (selectedHeroIndex !== null) {
        heroes[selectedHeroIndex].setProjectileColor(color);
      }
      handleCloseModal();
    },
    [selectedHeroIndex, heroes, handleCloseModal],
  );

  return (
    <>
      <ScoreDisplay score={score} />
      <div className="gameContainer">
        <Canvas
          heroes={heroes}
          handleOpenModal={handleOpenModal}
          setSelectedHeroIndex={handleOpenModal}
          setScore={setScore}
        />
      </div>
      <h3 className="alignCenter">
        Click on the hero to change the color of the spell
      </h3>
      <GameController
        heroes={heroes}
        onFrequencyChange={onFrequencyChange}
        onSpeedChange={onSpeedChange}
      />
      {selectedHeroIndex !== null && (
        <ColorModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onColorChange={handleColorChange}
          initialColor={heroes[selectedHeroIndex].getProjectileColor()}
        />
      )}
    </>
  );
};

export default GamePage;
