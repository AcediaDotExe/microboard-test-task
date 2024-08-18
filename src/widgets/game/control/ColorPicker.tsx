// src/features/ColorPicker/ColorPicker.tsx
import { ChangeEvent, FC, useState } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ onColorChange }) => {
  const [color, setColor] = useState('#ffffff');

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    onColorChange(event.target.value);
  };

  return (
    <div>
      <input type="color" value={color} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
