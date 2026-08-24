import React from "react";
import { menuItems, RADIUS, HUB } from "./data";

const center = HUB / 2;

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
