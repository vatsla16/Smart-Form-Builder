/* eslint-disable jsx-a11y/label-has-associated-control */
// FieldNumber.js - Renders an accessible number input field with label, min/max, and required support
import React from "react";
import PropTypes from "prop-types";

const FieldNumber = ({ field }) => {
  const {
    id,
    label,
    required,
    settings: {
      placeholder = "",
      min = "",
      max = "",
      textColor = "#000000",
      backgroundColor = "#ffffff",
    } = {},
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
        type="number"
        id={id}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="form-control"
        style={{ color: textColor, backgroundColor }}
        aria-label={label || "Number Input Field"}
      />
    </div>
  );
};

FieldNumber.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.object,
  }).isRequired,
};

export default FieldNumber;
