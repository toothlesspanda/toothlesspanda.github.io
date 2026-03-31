import { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import "./card.css";

const PubCard = ({ title, thumbnail, link, type }) => {
  const [imgError, setImgError] = useState(false);

  const showFallback = !thumbnail || imgError;

  return (
    <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
      <Card
        style={{ height: "130px", position: "relative" }}
        bg={"dark"}
        text={"white"}>
        {showFallback ? (
          <div
            style={{
              height: "100%",
              background: type?.color ?? "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {type?.logo && (
              <img src={type.logo} alt={type.name} style={{ width: "60px", opacity: 0.9 }} />
            )}
          </div>
        ) : (
          <Card.Img
            style={{ height: "100%", objectFit: "cover" }}
            variant="top"
            src={thumbnail}
            alt={title}
            onError={() => setImgError(true)}
          />
        )}
        <div className="overlay">
          <div>
            <Badge className={"overlay__badge"} bg="light" text="dark">
              {type?.name ?? ""}
            </Badge>
          </div>
          <div className={"overlay__text"}>{title}</div>
        </div>
      </Card>
    </a>
  );
};

export default PubCard;
