// src/features/ControlPanel/index.tsx
import { FC, useState } from 'react';

interface ControlPanelProps {
  heroIndex: number;
  onSpeedChange: (speed: number) => void;
  onFrequencyChange: (frequency: number) => void;
}

const ControlPanel: FC<ControlPanelProps> = ({
  // heroIndex,
  onSpeedChange,
  onFrequencyChange,
}) => {
  const [speed, setSpeed] = useState(2);
  const [frequency, setFrequency] = useState(1);

  return (
    <div>
      <label>
        Speed:
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => {
            const newSpeed = Number(e.target.value);
            setSpeed(newSpeed);
            onSpeedChange(newSpeed);
          }}
        />
      </label>
      <label>
        Frequency:
        <input
          type="range"
          min="1"
          max="10"
          value={frequency}
          onChange={(e) => {
            const newFrequency = Number(e.target.value);
            setFrequency(newFrequency);
            onFrequencyChange(newFrequency);
          }}
        />
      </label>
    </div>
  );
};

export default ControlPanel;
