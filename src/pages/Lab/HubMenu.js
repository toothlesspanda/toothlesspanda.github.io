import React, { useRef, useEffect } from "react";
import { menuItems, runSprite, dogSprite, DOG_DX, DOG_DY, COMBO_W } from "./data";

const SCALE = 4;

const ComboSprite = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    ctx.clearRect(0, 0, COMBO_W * SCALE, 24 * SCALE);

    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 24; x++) {
        if (runSprite[y]?.[x]) {
          ctx.fillStyle = runSprite[y][x];
          ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
        }
      }
    }

    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 24; x++) {
        if (dogSprite[y]?.[x]) {
          const dx = x + DOG_DX;
          const dy = y + DOG_DY;
          if (dx < COMBO_W && dy < 24) {
            ctx.fillStyle = dogSprite[y][x];
            ctx.fillRect(dx * SCALE, dy * SCALE, SCALE, SCALE);
          }
        }
      }
    }
  }, []);

  return (
    <canvas
      ref={ref}
      width={COMBO_W * SCALE}
      height={24 * SCALE}
      style={{ imageRendering: "pixelated", marginBottom: 12 }}
    />
  );
};

const HubMenu = ({ selected, setSelected, setActiveWindow, gameUnlocked }) => (
  <div className="lab__hub">
    <div className="lab__center">
      {gameUnlocked && <ComboSprite />}
      <button
        className={`lab__play${gameUnlocked ? ' lab__play--unlocked' : ''}`}
        onClick={() => gameUnlocked && setActiveWindow('game')}
      >
        {gameUnlocked ? '► play' : '► 🔒'}
      </button>
    </div>

    <div className="lab__menu-list">
      {menuItems.map((item, i) => (
        <button
          key={item.id}
          className={`lab__menu-item${selected === i ? ' lab__menu-item--selected' : ''}`}
          style={{ animationDelay: `${i * 0.8}s` }}
          onClick={() => { setSelected(i); setActiveWindow(item.id); }}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

export default HubMenu;
