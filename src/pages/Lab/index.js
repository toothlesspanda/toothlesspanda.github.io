import React, { useState, useEffect, useRef } from "react";
import { getMediumPublications, getDevToPublications } from "../../services/publications";
import { PublicationType, menuItems, pixels } from "./data";
import { AboutContent, ProjectsContent, ArticlesContent, CvContent } from "./ContentPanels";
import HubMenu from "./HubMenu";
import GameScreen from "./GameScreen";
import RetroWindow from "./RetroWindow";
import Footer from "./Footer";
import "./lab.css";

const DPAD_MAP = { up: 0, right: 1, down: 2, left: 3 };

const Lab = () => {
  const [activeWindow, setActiveWindow] = useState(null);
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const [gameUnlocked, setGameUnlocked] = useState(false);
  const comboRef = useRef([]);

  useEffect(() => {
    async function fetchData() {
      const [mediumItems, devtoItems] = await Promise.all([
        getMediumPublications(),
        getDevToPublications(),
      ]);

      const medium = mediumItems.map((item) => ({
        title: item.title, image: item.thumbnail,
        type: PublicationType.MEDIUM, link: item.link, date: item.pubDate,
      }));

      const devto = devtoItems.map((item) => ({
        title: item.title, image: item.cover_image || item.social_image,
        type: PublicationType.DEVTO, link: item.url, date: item.published_at,
      }));

      setArticles([...medium, ...devto].sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const flash = (btn) => {
    setPressedBtn(btn);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const dpadPress = (dir) => {
    flash(dir);
    setSelected(DPAD_MAP[dir]);
    setShowHint(false);
  };

  const checkCombo = (btn) => {
    if (gameUnlocked) return;
    const now = Date.now();
    comboRef.current = [...comboRef.current.filter(e => now - e.t < 1500), { btn, t: now }];
    const seq = comboRef.current.map(e => e.btn).join('');
    if (seq.includes('ab') || seq.includes('ba')) {
      setGameUnlocked(true);
      comboRef.current = [];
    }
  };

  const aPress = () => {
    flash('a');
    checkCombo('a');
    if (selected !== null) {
      setActiveWindow(menuItems[selected].id);
    }
  };

  const bPress = () => {
    flash('b');
    checkCombo('b');
    if (activeWindow) {
      setActiveWindow(null);
    } else {
      setSelected(null);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (activeWindow) {
        if (e.key === "Escape" || e.key === "b" || e.key === "B") { setActiveWindow(null); }
        return;
      }
      switch (e.key) {
        case "ArrowUp":    dpadPress('up');    e.preventDefault(); break;
        case "ArrowRight": dpadPress('right'); e.preventDefault(); break;
        case "ArrowDown":  dpadPress('down');  e.preventDefault(); break;
        case "ArrowLeft":  dpadPress('left');  e.preventDefault(); break;
        case "a": case "A": case "Enter": case " ": aPress(); e.preventDefault(); break;
        case "b": case "B": case "Escape": bPress(); e.preventDefault(); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const renderContent = () => {
    switch (activeWindow) {
      case "about":    return <AboutContent />;
      case "projects": return <ProjectsContent />;
      case "articles": return <ArticlesContent articles={articles} />;
      case "cv":       return <CvContent />;
      default:         return null;
    }
  };

  return (
    <div className="lab">
      <div className="lab__vignette" />

      {pixels.map((pos, i) => (
        <div
          key={i}
          className="lab__pixel"
          style={{
            top: pos.top,
            left: pos.left,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${7 + (i % 3) * 2}s`,
          }}
        />
      ))}

      <div className="lab__console">
        {/* Left: D-pad */}
        <div className="lab__controls-left">
          {showHint && <div className="lab__hint">try me ↓</div>}
          <div className="lab__dpad">
            <button className={`lab__dpad-btn lab__dpad-up${pressedBtn === 'up' ? ' lab__dpad-btn--pressed' : ''}`} onClick={() => dpadPress('up')} aria-label="Up" />
            <button className={`lab__dpad-btn lab__dpad-left${pressedBtn === 'left' ? ' lab__dpad-btn--pressed' : ''}`} onClick={() => dpadPress('left')} aria-label="Left" />
            <div className="lab__dpad-center" />
            <button className={`lab__dpad-btn lab__dpad-right${pressedBtn === 'right' ? ' lab__dpad-btn--pressed' : ''}`} onClick={() => dpadPress('right')} aria-label="Right" />
            <button className={`lab__dpad-btn lab__dpad-down${pressedBtn === 'down' ? ' lab__dpad-btn--pressed' : ''}`} onClick={() => dpadPress('down')} aria-label="Down" />
          </div>
        </div>

        {/* Center: Screen */}
        <div className="lab__console-center">
          <div className="lab__title">Ines de Matos</div>
          <div className="lab__subtitle">team lead · dog lover · arts enthusiast</div>

          <div className="lab__led-row">
            <div className="lab__led" />
            <span className="lab__led-label">POWER</span>
          </div>

          <div className="lab__screen">
            {activeWindow === 'game' ? (
              <GameScreen />
            ) : (
              <HubMenu
                selected={selected}
                setSelected={setSelected}
                setActiveWindow={setActiveWindow}
                gameUnlocked={gameUnlocked}
              />
            )}
          </div>

          <div className="lab__branding">EST. 2017 · LISBON · v2.0</div>
        </div>

        {/* Right: A/B buttons */}
        <div className="lab__controls-right">
          <div className="lab__ab">
            <button className={`lab__ab-btn${pressedBtn === 'b' ? ' lab__ab-btn--pressed' : ''}`} onClick={bPress}>B</button>
            <button className={`lab__ab-btn${pressedBtn === 'a' ? ' lab__ab-btn--pressed' : ''}`} onClick={aPress}>A</button>
          </div>
        </div>
      </div>

      <Footer />

      {activeWindow && activeWindow !== 'game' && (
        <RetroWindow activeWindow={activeWindow} onClose={() => setActiveWindow(null)}>
          {renderContent()}
        </RetroWindow>
      )}
    </div>
  );
};

export default Lab;
