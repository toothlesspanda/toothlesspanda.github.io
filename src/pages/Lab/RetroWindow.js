import React from "react";

const RetroWindow = ({ activeWindow, onClose, children }) => (
  <>
    <div className="retro-backdrop" onClick={onClose} />
    <div className={`retro-window${activeWindow === "cv" ? " retro-window--full" : ""}`}>
      <div className="retro-window__titlebar">
        <span className="retro-window__title">&gt; {activeWindow}</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {activeWindow === "cv" && (
            <button
              className="retro-window__close"
              onClick={() => {
                try {
                  document.getElementById("cv-iframe").contentWindow.print();
                } catch (e) {
                  window.open(`${process.env.PUBLIC_URL}/cv.html`, '_blank');
                }
              }}
            >
              pdf
            </button>
          )}
          <button className="retro-window__close" onClick={onClose}>x</button>
        </div>
      </div>
      <div className={`retro-window__body${activeWindow === "cv" ? " retro-window__body--no-pad" : ""}`}>
        {children}
      </div>
    </div>
  </>
);

export default RetroWindow;
