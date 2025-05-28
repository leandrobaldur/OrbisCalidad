import React, { useState } from "react";

const TestimonialCard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => setFlipped(!flipped);

  const cardContainerStyle = {
    width: 360,
    height: 360,
    perspective: 1000,
    cursor: "pointer",
  };

  const cardInnerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    transition: "transform 0.5s ease",
    transformStyle: "preserve-3d",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    backgroundColor: "#154734",
    color: "#e4d0a9",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1.5rem",
    userSelect: "none",
    boxSizing: "border-box",
  };

  const frontStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const backStyle = {
    ...frontStyle,
    transform: "rotateY(180deg)",
    overflowY: card.backType === "list" ? "auto" : "hidden",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };

  const titleStyle = {
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#e4d0a9",
  };

  const textStyle = {
    fontSize: "1rem",
    lineHeight: 1.5,
    marginBottom: "1.5rem",
    maxHeight: "140px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  };

  const roleStyle = {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginTop: "auto",
  };

  const backListStyle = {
    listStyle: "none",
    padding: 0,
    margin: "0 auto",
    width: "fit-content",
    color: "#e4d0a9",
    textAlign: "center",
    overflowY: "auto",
    maxHeight: "300px",  // Más pequeño para evitar que empuje
    boxSizing: "border-box",
  };

  const backListItemStyle = {
    fontSize: "1.1rem",
    margin: "0.4rem 0",
  };

  const backImageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "12px",
    objectFit: "contain",
    userSelect: "none",
  };

  return (
    <div
      style={cardContainerStyle}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" ? handleClick() : null)}
      aria-label={`Card de ${card.title}, click para girar`}
    >
      <div style={cardInnerStyle}>
        {/* Frente */}
        <div style={frontStyle}>
          <h3 style={titleStyle}>{card.title}</h3>
          <p style={textStyle}>{card.text.repeat(2)}</p>
          <div style={roleStyle}>{card.role}</div>
        </div>

        {/* Reverso */}
        <div style={backStyle}>
          {card.backType === "list" ? (
            <ul style={backListStyle}>
              {card.backContent.map((item, i) => (
                <li key={i} style={backListItemStyle}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <img
              src={card.backContent}
              alt={`Imagen de ${card.title}`}
              style={backImageStyle}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
