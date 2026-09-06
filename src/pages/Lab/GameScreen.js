import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  runSprite, jumpSprite, dogSprite, celebrateSprite,
  sadSprite, sadDogSprite,
  bugSprite, bossSprite, deadlineSprite,
  DOG_DX, DOG_DY, COMBO_W,
} from "./data";

const PX = 3;            // pixel scale
const SP = 24;            // sprite size (24x24)
const W = 580;            // canvas width matches .lab__hub
const H = 580;            // canvas height
const GROUND = H - 30;    // ground Y (bottom of sprites)
const CHAR_X = 60;        // character fixed X
const SCROLL = 2.2;       // base scroll speed (px/frame)

// Jump tuning — high arc, enough airtime to clear obstacles
const JUMP_VEL = -12;
const GRAVITY = 0.35;

const OBSTACLE_TYPES = [bugSprite, bossSprite, deadlineSprite];

const BOSS_PHRASES = [
  ["I WANT TO CHANGE", "REQUIREMENTS!"],
  ["WHAT ABOUT...", "JUST...AI?"],
  ["LET'S MAKE A 1-WEEK", "PROJECT IN 1 DAY"],
];

// Get bounding box of non-null pixels in a sprite
function spriteBounds(sprite) {
  let minX = 23, maxX = 0, minY = 23, maxY = 0;
  for (let y = 0; y < SP; y++) {
    for (let x = 0; x < SP; x++) {
      if (sprite[y]?.[x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

function drawSprite(ctx, sprite, sx, sy) {
  for (let y = 0; y < SP; y++) {
    for (let x = 0; x < SP; x++) {
      if (sprite[y]?.[x]) {
        ctx.fillStyle = sprite[y][x];
        ctx.fillRect(sx + x * PX, sy + y * PX, PX, PX);
      }
    }
  }
}

function generateObstacles() {
  // 4 of each type = 12 total, shuffled
  const pool = [];
  for (let i = 0; i < 4; i++) {
    OBSTACLE_TYPES.forEach((sprite) => pool.push(sprite));
  }
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // Space them out — start after a gap, then random spacing
  let x = W + 150;
  return pool.map((sprite) => {
    const gap = 180 + Math.random() * 160;
    const phrase = sprite === bossSprite
      ? BOSS_PHRASES[Math.floor(Math.random() * BOSS_PHRASES.length)]
      : null;
    const ob = { sprite, x, bounds: spriteBounds(sprite), passed: false, phrase };
    x += gap;
    return ob;
  });
}

const GameScreen = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [phase, setPhase] = useState("ready"); // ready | playing | won | lost

  const initGame = useCallback(() => {
    stateRef.current = {
      playerY: 0,
      velY: 0,
      jumping: false,
      obstacles: generateObstacles(),
      scroll: 0,
      frame: 0,
      rainCols: Array.from({ length: Math.ceil(W / 12) }, () => ({
        y: Math.random() * H,
        speed: 1 + Math.random() * 2,
        chars: Array.from({ length: 8 }, () => Math.random() > 0.5 ? "1" : "0"),
      })),
    };
  }, []);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s || s.jumping) return;
    s.jumping = true;
    s.velY = JUMP_VEL;
  }, []);

  // Handle jump input
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e) => {
      if (["ArrowUp", " ", "a", "A", "Enter"].includes(e.key)) {
        jump();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, jump]);

  // Touch/click jump
  const handleInteraction = useCallback(() => {
    if (phase === "ready") {
      initGame();
      setPhase("playing");
    } else if (phase === "playing") {
      jump();
    } else if (phase === "won" || phase === "lost") {
      setPhase("ready");
    }
  }, [phase, jump, initGame]);

  // Game loop
  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const charBounds = spriteBounds(runSprite);
    const dogBounds = spriteBounds(dogSprite);

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;
      s.frame++;

      // Physics
      if (s.jumping) {
        s.velY += GRAVITY;
        s.playerY += s.velY;
        if (s.playerY >= 0) {
          s.playerY = 0;
          s.velY = 0;
          s.jumping = false;
        }
      }

      // Move obstacles
      const speed = SCROLL + s.frame * 0.001; // slight acceleration
      s.obstacles.forEach((ob) => { ob.x -= speed; });

      // Collision detection
      const charSpriteY = GROUND - SP * PX + s.playerY;
      const cx = CHAR_X + charBounds.x * PX;
      const cy = charSpriteY + charBounds.y * PX;
      const cw = charBounds.w * PX;
      const ch = charBounds.h * PX;
      const margin = PX * 2; // small forgiveness

      for (const ob of s.obstacles) {
        const ox = ob.x + ob.bounds.x * PX;
        const oy = GROUND - SP * PX + ob.bounds.y * PX;
        const ow = ob.bounds.w * PX;
        const oh = ob.bounds.h * PX;

        if (
          cx + cw - margin > ox + margin &&
          cx + margin < ox + ow - margin &&
          cy + ch - margin > oy + margin &&
          cy + margin < oy + oh - margin
        ) {
          setPhase("lost");
          return;
        }
      }

      // Check win — all obstacles passed
      const allPassed = s.obstacles.every((ob) => ob.x + SP * PX < CHAR_X);
      if (allPassed) {
        setPhase("won");
        return;
      }

      // ── Draw ──
      // Background — Game Boy green
      ctx.fillStyle = "#9aa890";
      ctx.fillRect(0, 0, W, H);

      // Matrix rain
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(74, 90, 66, 0.3)";
      s.rainCols.forEach((col, i) => {
        col.y += col.speed;
        if (col.y > H + 100) col.y = -80;
        col.chars.forEach((ch, j) => {
          ctx.fillText(ch, i * 12, col.y + j * 12);
        });
      });

      // Ground line
      ctx.fillStyle = "#6a7a62";
      ctx.fillRect(0, GROUND, W, 2);

      // Obstacles
      s.obstacles.forEach((ob) => {
        if (ob.x > -SP * PX && ob.x < W + SP * PX) {
          drawSprite(ctx, ob.sprite, ob.x, GROUND - SP * PX);
        }
      });

      // Speech bubbles for boss obstacles
      ctx.font = "bold 10px monospace";
      const lineH = 13;
      s.obstacles.forEach((ob) => {
        if (ob.phrase && ob.x > -100 && ob.x < W) {
          const lines = ob.phrase;
          const pad = 6;
          const maxW = Math.max(...lines.map(l => ctx.measureText(l).width));
          const bw = maxW + pad * 2;
          const bh = lines.length * lineH + pad * 2 - 4;
          const bx = ob.x - 10;
          const by = GROUND - SP * PX - bh - 8;
          // Bubble
          ctx.fillStyle = "#e8e0d0";
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeStyle = "#4a5a42";
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
          // Triangle pointer
          ctx.fillStyle = "#e8e0d0";
          ctx.beginPath();
          ctx.moveTo(bx + 15, by + bh);
          ctx.lineTo(bx + 20, by + bh + 6);
          ctx.lineTo(bx + 25, by + bh);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#4a5a42";
          ctx.beginPath();
          ctx.moveTo(bx + 15, by + bh);
          ctx.lineTo(bx + 20, by + bh + 6);
          ctx.lineTo(bx + 25, by + bh);
          ctx.stroke();
          // Text lines
          ctx.fillStyle = "#2a3228";
          lines.forEach((line, i) => {
            ctx.fillText(line, bx + pad, by + pad + 9 + i * lineH);
          });
        }
      });

      // Character (run/jump sprite)
      const isJumping = s.jumping;
      const charSprite = isJumping ? jumpSprite : runSprite;
      drawSprite(ctx, charSprite, CHAR_X, charSpriteY);

      // Dog
      const dogX = CHAR_X + DOG_DX * PX;
      const dogDy = isJumping ? 0 : DOG_DY;
      drawSprite(ctx, dogSprite, dogX, charSpriteY + dogDy * PX);

      // Progress bar
      const lastOb = s.obstacles[s.obstacles.length - 1];
      const totalDist = lastOb ? (W + 150 + (s.obstacles.length - 1) * 250) : 1;
      const scrolled = s.obstacles[0] ? (W + 150 - s.obstacles[0].x) : 0;
      const progress = Math.min(1, Math.max(0, scrolled / totalDist));
      const barW = W - 40;
      const barH = 8;
      const barX = 20;
      const barY = 12;
      ctx.fillStyle = "rgba(74, 90, 66, 0.3)";
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = "#4a5a42";
      ctx.fillRect(barX, barY, barW * progress, barH);

      // Sprint label
      ctx.fillStyle = "#4a5a42";
      ctx.font = "11px monospace";
      ctx.fillText("sprint", barX, barY + barH + 14);
      ctx.fillText("deploy →", barX + barW - 60, barY + barH + 14);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Draw celebrate sprite + dog on a mini canvas
  const celebrateRef = useRef(null);
  useEffect(() => {
    if (phase !== "won" || !celebrateRef.current) return;
    const ctx = celebrateRef.current.getContext("2d");
    const s = 4;
    ctx.clearRect(0, 0, COMBO_W * s, SP * s);
    // Character (celebrate pose)
    for (let y = 0; y < SP; y++) {
      for (let x = 0; x < SP; x++) {
        if (celebrateSprite[y]?.[x]) {
          ctx.fillStyle = celebrateSprite[y][x];
          ctx.fillRect(x * s, y * s, s, s);
        }
      }
    }
    // Dog with offset
    for (let y = 0; y < SP; y++) {
      for (let x = 0; x < SP; x++) {
        if (dogSprite[y]?.[x]) {
          const dx = x + DOG_DX;
          const dy = y + DOG_DY;
          if (dx < COMBO_W && dy < SP) {
            ctx.fillStyle = dogSprite[y][x];
            ctx.fillRect(dx * s, dy * s, s, s);
          }
        }
      }
    }
    // Happy tail wagging to the right
    ctx.fillStyle = "#1a1a1a";
    [[16,17],[17,16],[17,15],[16,14]].forEach(([tx,ty]) => {
      const dx = tx + DOG_DX;
      const dy = ty + DOG_DY;
      if (dx < COMBO_W) ctx.fillRect(dx * s, dy * s, s, s);
    });
    // Confetti — 2x1 pieces for visibility
    [
      [1,1,'#cc3030'],[7,0,'#e8d070'],[14,2,'#88b8d8'],[20,0,'#cc3030'],
      [26,1,'#e8d070'],[4,4,'#7a9ab8'],[30,3,'#cc3030'],[10,3,'#e8d070'],
      [24,1,'#88b8d8'],[18,5,'#7a9ab8'],[2,7,'#e8d070'],[28,5,'#cc3030'],
      [6,6,'#cc3030'],[22,4,'#88b8d8'],[16,1,'#e8d070'],[0,3,'#7a9ab8'],
      [29,0,'#e8d070'],[12,6,'#cc3030'],[3,10,'#88b8d8'],[25,8,'#e8d070'],
    ].forEach(([cx,cy,c]) => {
      ctx.fillStyle = c;
      ctx.fillRect(cx * s, cy * s, s * 2, s);
    });
  }, [phase]);

  // Draw sad sprite + dog on a mini canvas for game-over
  const sadRef = useRef(null);
  useEffect(() => {
    if (phase !== "lost" || !sadRef.current) return;
    const ctx = sadRef.current.getContext("2d");
    const s = 4;
    ctx.clearRect(0, 0, COMBO_W * s, SP * s);
    // Character (sad pose)
    for (let y = 0; y < SP; y++) {
      for (let x = 0; x < SP; x++) {
        if (sadSprite[y]?.[x]) {
          ctx.fillStyle = sadSprite[y][x];
          ctx.fillRect(x * s, y * s, s, s);
        }
      }
    }
    // Dog (sad) with offset
    for (let y = 0; y < SP; y++) {
      for (let x = 0; x < SP; x++) {
        if (sadDogSprite[y]?.[x]) {
          const dx = x + DOG_DX;
          const dy = y + DOG_DY;
          if (dx < COMBO_W && dy < SP) {
            ctx.fillStyle = sadDogSprite[y][x];
            ctx.fillRect(dx * s, dy * s, s, s);
          }
        }
      }
    }
  }, [phase]);

  // Ready / end screens
  const overlay = (text, sub, actionText, showCelebrate, showSad) => (
    <div className="lab__game-overlay">
      {showCelebrate && (
        <canvas
          ref={celebrateRef}
          className="lab__game-sprite"
          width={COMBO_W * 4}
          height={SP * 4}
        />
      )}
      {showSad && (
        <canvas
          ref={sadRef}
          className="lab__game-sprite"
          width={COMBO_W * 4}
          height={SP * 4}
        />
      )}
      <p className="lab__game-title">{text}</p>
      <p className="lab__game-sub">{sub}</p>
      <button className="lab__game-btn" onClick={handleInteraction}>
        {actionText}
      </button>
      <p className="lab__game-hint">press B to go back</p>
    </div>
  );

  return (
    <div className="lab__hub lab__game-screen" style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: "100%", height: "100%", imageRendering: "pixelated", display: "block" }}
        onClick={handleInteraction}
      />
      {phase === "ready" && overlay("sprint runner", "dodge the office obstacles", "► start", false, false)}
      {phase === "won" && overlay("deployed!", "sprint complete — ship it", "► again", true, false)}
      {phase === "lost" && overlay("bug in prod", "an obstacle got you", "► retry", false, true)}
    </div>
  );
};

export default GameScreen;
