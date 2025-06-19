// FieldText.js - Renders an accessible text input field with label, color, and placeholder support
// Receives a 'field' prop with settings and renders an <input type="text"> element
import React from "react";
import PropTypes from "prop-types";

const FieldText = ({ field }) => {
  const {
    id,
    label,
    required,
    settings: { placeholder = "", textColor = "#000000", backgroundColor = "#ffffff" } = {},
  } = field;

  return (
    <div className="mb-4" id={id}>
      {label ? (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      ) : (
        <label className="form-label text-warning">
          Missing Label {required && <span className="text-danger">*</span>}
        </label>
      )}

      {/* Text Input Field */}
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required={required}
        className="form-control"
        style={{ color: textColor, backgroundColor: backgroundColor }}
        aria-label={label || "Text Input Field"}
      />
    </div>
  );
};

FieldText.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired, // must be a string, required
    label: PropTypes.string, // optional string
    required: PropTypes.bool, // boolean, not required
    settings: PropTypes.object, // object, flexible
  }).isRequired, // entire field object is required
};

export default FieldText;
