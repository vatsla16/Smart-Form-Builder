// FieldPalette.js - Renders the sidebar with available field types to add
// Used in the Smart Form Builder project
// Calls onAdd(type) when a field type is clicked or activated with keyboard
//
// Author: Your Name

import React from "react";
import PropTypes from "prop-types";

const FieldPalette = ({ onAdd }) => {
  const items = [
    { type: "text", label: "Text Input" },
    { type: "email", label: "Email Input" },
    { type: "number", label: "Number Input" },
    { type: "date", label: "Date Input" },
    { type: "password", label: "Password Input" },
    { type: "url", label: "URL Input" },
    { type: "tel", label: "Phone Input" },
    { type: "file", label: "File Upload" },
    { type: "button", label: "Button Input" },
    { type: "checkbox", label: "Checkbox Input" },
    { type: "radio", label: "Radio Input" },
    { type: "select", label: "Select Input" },
    { type: "textarea", label: "Textarea Input" },
    { type: "section", label: "Section Title" },
  ];
  return (
    <aside className="field-palette p-3 border-end">
      <h5>Add Fields</h5>
      {items.map((item) => (
        <div
          key={item.type}
          role="button"
          tabIndex={0}
          className="palette-item palette-item-animate my-2 p-3 bg-white rounded shadow-sm"
          onClick={() => onAdd(item.type)}
          onKeyDown={(e) => {
            if (["Enter", " "].includes(e.key)) onAdd(item.type);
          }}
        >
          {item.label}
        </div>
      ))}
    </aside>
  );
};

FieldPalette.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default FieldPalette;
