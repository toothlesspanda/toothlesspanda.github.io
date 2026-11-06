import React, { useState, useEffect, useRef } from "react";
import { Linkedin, Medium, Github, Instagram } from "react-bootstrap-icons";

const Footer = () => {
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef(null);

  // On mobile the instructions open below the controls; bring them into view
  useEffect(() => {
    if (showHelp) helpRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [showHelp]);

  return (
    <div className="lab__footer">
      <div className="lab__controls-help">
        <span>↑ ↓ navigate</span>
        <span>[A] / [SPACE] select</span>
        <span>[B] / [ESC] back</span>
        <span>[A]+[B] unlock</span>
      </div>
      {showHelp && (
        <div ref={helpRef} className="lab__controls-help lab__controls-help--mobile">
          <span>↑ ↓ navigate</span>
          <span>[A] / [SPACE] select</span>
          <span>[B] / [ESC] back</span>
          <span>[A]+[B] unlock</span>
        </div>
      )}
      <div className="lab__social-inline">
        <button
          className="lab__help-toggle"
          onClick={() => setShowHelp((v) => !v)}
        >
          {showHelp ? '✕ close' : '? help'}
        </button>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/inesdematos/" title="LinkedIn">
          <Linkedin size={16} />
        </a>
        <a target="_blank" rel="noreferrer" href="https://inesdematos.medium.com/" title="Medium">
          <Medium size={16} />
        </a>
        <a target="_blank" rel="noreferrer" href="https://github.com/toothlesspanda" title="GitHub">
          <Github size={16} />
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/nenas.phot/" title="Instagram">
          <Instagram size={16} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
