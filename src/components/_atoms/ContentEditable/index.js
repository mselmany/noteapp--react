import React from "react";
import "./styles.css";

export default function ContentEditable({ input, onUpdate }) {
  return (
    <div className="ContentEditable">
      <div
        className="ContentEditable__Input"
        contentEditable
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: input }}
        onInput={e => {
          onUpdate(e.target.innerHTML);
        }}
      />
    </div>
  );
}
