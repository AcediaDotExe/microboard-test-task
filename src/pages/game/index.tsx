import { FC } from 'react';
import Canvas from '../../widgets/game/canvas';
import styles from './index.module.scss';

const Game: FC = () => {
  return (
    <div className={styles.gameContainer}>
      <Canvas />
    </div>
  );
};

export default Game;
