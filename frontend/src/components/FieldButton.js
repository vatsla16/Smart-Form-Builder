// FieldButton.js - Renders an accessible button with label and color support
// Receives a 'field' prop with settings and renders a <button> element
import React from "react";
import PropTypes from "prop-types";

const FieldButton = ({ field }) => {
  const {
    id,
    label,
    settings: { textColor = "#ffffff", backgroundColor = "#0d6efd" } = {},
  } = field;

  return (
    <div className="mb-4" id={id}>
      <button
        type="button"
        className="btn"
        style={{ color: textColor, backgroundColor }}
        aria-label={label || "Button"}
      >
        {label || "Button"}
      </button>
    </div>
  );
};

FieldButton.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    settings: PropTypes.object,
  }).isRequired,
};

export default FieldButton;
