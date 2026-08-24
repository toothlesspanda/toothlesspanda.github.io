import React from "react";
import { Linkedin, Medium, Github, Instagram } from "react-bootstrap-icons";

const Footer = () => (
  <div className="lab__footer">
    <div className="lab__controls-help">
      <span>↑ ↓ ← → navigate</span>
      <span>[A] / [SPACE] select</span>
      <span>[B] / [ESC] back</span>
      <span>[A]+[B] unlock</span>
    </div>
    <div className="lab__social-inline">
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

export default Footer;
