import React from "react";

const GameScreen = () => (
  <div className="lab__hub lab__game-screen">
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", color: "#2a3228", fontFamily: "var(--font)",
    }}>
      <p style={{ fontSize: "2em", marginBottom: "8px" }}>?</p>
      <p style={{ letterSpacing: "2px" }}>coming soon</p>
      <p style={{ fontSize: "0.7em", marginTop: "12px", color: "#4a5a42" }}>press B to go back</p>
    </div>
  </div>
);

export default GameScreen;
