import { useState } from "react";
import "./card.css";

const PubCard = ({ title, thumbnail, link, type }) => {
  const [imgError, setImgError] = useState(false);

  const showFallback = !thumbnail || imgError;

  return (
    <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <div className="pub-card" style={{ height: "140px", position: "relative", overflow: "hidden" }}>
        {showFallback ? (
          <div style={{
            height: "100%",
            background: type?.color ?? "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {type?.logo && (
              <img src={type.logo} alt={type.name} style={{ width: "52px", opacity: 0.7 }} />
            )}
          </div>
        ) : (
          <img
            src={thumbnail}
            alt={title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        <div className="overlay">
          <span className="overlay__badge">{type?.name ?? ""}</span>
          <div className="overlay__text">{title}</div>
        </div>
      </div>
    </a>
  );
};

export default PubCard;
