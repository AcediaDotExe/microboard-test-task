import { FC, memo, useState } from 'react';

interface ControlPanelProps {
  index: number;
  initialOpt: { speed: number; frequency: number };
  onSpeedChange: (index: number, speed: number) => void;
  onFrequencyChange: (index: number, frequency: number) => void;
}

const ControlPanel: FC<ControlPanelProps> = memo(
  ({ index, initialOpt, onSpeedChange, onFrequencyChange }) => {
    const [speed, setSpeed] = useState<number>(initialOpt.speed);
    const [frequency, setFrequency] = useState<number>(initialOpt.frequency);

    return (
      <>
        <label>
          Speed:
          <input
            type="range"
            min="0"
            max="3"
            value={speed}
            onChange={(e) => {
              const newSpeed = Number(e.target.value);
              setSpeed(newSpeed);
              onSpeedChange(index, newSpeed);
            }}
          />
        </label>
        <div>
          <label>
            Frequency:
            <input
              type="range"
              min="0"
              max="20"
              value={frequency}
              onChange={(e) => {
                const newFrequency = Number(e.target.value);
                setFrequency(newFrequency);
                onFrequencyChange(index, newFrequency);
              }}
            />
          </label>
        </div>
      </>
    );
  },
);

export default ControlPanel;
