import React from "react";

export default function Loader() {
  return React.createElement(
    "div",
    { style: { display: "flex", alignItems: "center", justifyContent: "center", padding: 40 } },
    React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 18,
        background: "linear-gradient(90deg,var(--accent),var(--accent-dark))",
        opacity: 0.95,
      },
    })
  );
}
