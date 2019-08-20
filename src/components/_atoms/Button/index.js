import React from "react";
import "./styles.css";

export default function Button({ type, action, children, className = "", ...props }) {
  let typeclass = `${type === "icon" ? "Button--icon" : ""}`;
  return (
    <div
      className={`Button ${typeclass} ${className}`}
      {...action && {
        onClick: e => {
          action(e);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}
