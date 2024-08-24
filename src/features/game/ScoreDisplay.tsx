import { FC, memo } from 'react';

interface ScoreDisplayProps {
  score: number[];
}

const ScoreDisplay: FC<ScoreDisplayProps> = memo(({ score }) => {
  const [scoreHero1, scoreHero0] = score;

  return (
    <h1 className="alignCenter">
      Score <br />
      {scoreHero0} | {scoreHero1}
    </h1>
  );
});

export default ScoreDisplay;
