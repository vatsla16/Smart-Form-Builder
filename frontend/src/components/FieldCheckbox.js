// FieldCheckbox.js - Renders an accessible checkbox group with label and color support
// Receives a 'field' prop with settings and renders a group of checkboxes
import React from "react";
import PropTypes from "prop-types";

const FieldCheckbox = ({ field }) => {
  const {
    id,
    label,
    required,
    settings: { options = [], textColor = "#000000", backgroundColor = "#ffffff" },
  } = field;
  return (
    <div id={id} className="mb-3">
      {/* Group label or missing-label warning */}
      {label ? (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      ) : (
        <label className="form-label text-warning">
          Missing Label {required && <span className="text-danger">*</span>}
        </label>
      )}
      {options.map((opt, idx) => (
        <div className="form-check" key={`${id}-${opt.value}-${idx}`}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`${id}-${opt.value}`}
            value={opt.value}
            required={required}
            style={{ backgroundColor }}
            aria-label={opt.label}
          />
          <label
            className="form-check-label"
            htmlFor={`${id}-${opt.value}`}
            style={{ color: textColor }}
          >
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  );
};

FieldCheckbox.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.shape({ options: PropTypes.array }).isRequired,
  }).isRequired,
};

export default FieldCheckbox;
