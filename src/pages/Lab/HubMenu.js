import React, { useRef, useEffect } from "react";
import { menuItems, RADIUS, HUB, runSprite, dogSprite, DOG_DX, DOG_DY, COMBO_W } from "./data";

const center = HUB / 2;
const SCALE = 4;

const ComboSprite = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    ctx.clearRect(0, 0, COMBO_W * SCALE, 24 * SCALE);

    // Draw character
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 24; x++) {
        if (runSprite[y]?.[x]) {
          ctx.fillStyle = runSprite[y][x];
          ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
        }
      }
    }

    // Draw dog with offset
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
    <svg className="lab__lines" width="100%" height="100%" viewBox={`0 0 ${HUB} ${HUB}`}>
      {menuItems.map((item, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        return (
          <line
            key={item.id}
            x1={center} y1={center}
            x2={center + Math.cos(angle) * RADIUS}
            y2={center + Math.sin(angle) * RADIUS}
            className="lab__line"
          />
        );
      })}
    </svg>

    <div className="lab__center">
      {gameUnlocked && <ComboSprite />}
      <button
        className={`lab__play${gameUnlocked ? ' lab__play--unlocked' : ''}`}
        onClick={() => gameUnlocked && setActiveWindow('game')}
      >
        {gameUnlocked ? '► play' : '⬒ locked'}
      </button>
    </div>

    {menuItems.map((item, i) => {
      const angle = (i * 90 - 90) * (Math.PI / 180);
      const pct = (RADIUS / HUB) * 100;
      const xPct = Math.cos(angle) * pct;
      const yPct = Math.sin(angle) * pct;
      return (
        <button
          key={item.id}
          className={`lab__menu-item${selected === i ? ' lab__menu-item--selected' : ''}`}
          style={{
            top:  `calc(50% + ${yPct}%)`,
            left: `calc(50% + ${xPct}%)`,
            animationDelay: `${i * 0.8}s`,
          }}
          onClick={() => { setSelected(i); setActiveWindow(item.id); }}
        >
          {item.label}
        </button>
      );
    })}
  </div>
);

export default HubMenu;
