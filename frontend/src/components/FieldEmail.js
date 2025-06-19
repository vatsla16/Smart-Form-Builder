// FieldEmail.js - Renders an accessible email input field with label, color, and placeholder support
// Receives a 'field' prop with settings and renders an <input type="email"> element
import React from "react";
import PropTypes from "prop-types";

const FieldEmail = ({ field }) => {
  const {
    id,
    label,
    required,
    settings: { placeholder = "", textColor = "#000000", backgroundColor = "#ffffff" } = {},
  } = field;

  return (
    <div className="my-4" id={id}>
      {label ? (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      ) : (
        <label className="form-label text-warning">
          Missing Label {required && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        type="email"
        id={id}
        label={label}
        placeholder={placeholder}
        required={required}
        className="form-control"
        style={{ color: textColor, backgroundColor }}
        aria-label={label || "Email Input Field"}
      />
    </div>
  );
};

FieldEmail.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.object,
  }).isRequired,
};

export default FieldEmail;
