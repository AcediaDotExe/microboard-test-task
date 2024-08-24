// src/features/Modal/ColorModal.tsx
import { FC, memo, useState } from 'react';
import { createPortal } from 'react-dom';
import './ColorModal.scss';

interface ColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onColorChange: (color: string) => void;
  initialColor: string;
}

const ColorModal: FC<ColorModalProps> = memo(
  ({ isOpen, onClose, onColorChange, initialColor }) => {
    const [color, setColor] = useState<string>(initialColor);

    if (!isOpen) return null;

    return createPortal(
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Change Hero Color</h2>
          <label className="color-label">
            Color:
            <input
              className="color-input"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <div>
            <button
              className="modal-button"
              onClick={() => onColorChange(color)}
            >
              Apply
            </button>
            <button className="modal-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );
  },
);

export default ColorModal;
