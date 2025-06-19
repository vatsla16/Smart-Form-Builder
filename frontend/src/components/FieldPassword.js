/* eslint-disable jsx-a11y/label-has-associated-control */
// FieldPassword.js - Renders an accessible password input field with label and required support
import React from "react";
import PropTypes from "prop-types";

const FieldPassword = ({ field }) => {
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
      <input
        type="password"
        id={id}
        placeholder={placeholder}
        required={required}
        className="form-control"
        style={{ color: textColor, backgroundColor }}
        aria-label={label || "Password Input Field"}
      />
    </div>
  );
};

FieldPassword.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.object,
  }).isRequired,
};

export default FieldPassword;
