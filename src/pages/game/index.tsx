import { FC } from 'react';
import DuelCanvas from '../../widgets/duel/ui/DuelCanvas.tsx';
import styles from './index.module.scss';
const Game: FC = () => {
  return (
    <div className={styles.gameContainer}>
      <DuelCanvas />
    </div>
  );
};

export default Game;
