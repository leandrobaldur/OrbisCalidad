import React, { useState } from "react";

const CardFlip = ({ data }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => setFlipped(!flipped);

  const cardStyle = {
    width: "380px",
    height: "380px",
    perspective: "1000px",
    cursor: "pointer",
    margin: "0 0.5rem",
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: "#e4d0a9",
    transition: "transform 0.5s",
    transformStyle: "preserve-3d",
    borderRadius: "16px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    backgroundColor: "#154734",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
  };

  const frontBackCommon = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem",
  };

  const frontStyle = {
    ...frontBackCommon,
  };

  const titleStyle = {
    fontSize: "1.6rem",
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const textStyle = {
    fontSize: "1rem",
    lineHeight: "1.5",
    marginBottom: "1rem",
    maxHeight: "140px",
    overflow: "auto",
    userSelect: "none",
  };

  const roleStyle = {
    fontWeight: "700",
    fontSize: "1.2rem",
    marginTop: "auto",
    userSelect: "none",
  };

  const backStyle = {
    ...frontBackCommon,
    transform: "rotateY(180deg)",
    overflowY: data.backType === "list" ? "auto" : "hidden",
  };

  return (
    <div style={cardStyle} onClick={handleClick} role="button" tabIndex={0} onKeyPress={(e) => e.key === "Enter" && handleClick()}>
      <div style={innerStyle}>
        {/* Front */}
        <div style={frontStyle}>
          <h2 style={titleStyle}>{data.title}</h2>
          <p style={textStyle}>{data.text.repeat(2)}</p>
          <div style={roleStyle}>{data.role}</div>
        </div>

        {/* Back */}
        <div style={backStyle}>
          {data.backType === "list" && (
            <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, width: "100%", color: "#e4d0a9", userSelect: "none" }}>
              {data.backContent.map((item, i) => (
                <li key={i} style={{ marginBottom: "0.4rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {data.backType === "image" && (
            <img
              src={data.backContent}
              alt={`Imagen de ${data.title}`}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "12px" }}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
