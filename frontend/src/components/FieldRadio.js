// FieldRadio.js - Renders an accessible radio group with label and color support
// Receives a 'field' prop with settings and renders a group of radio buttons
import React from "react";
import PropTypes from "prop-types";

const FieldRadio = ({ field }) => {
  const {
    id,
    label,
    required,
    settings: { options = [], textColor = "#000000" },
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
            type="radio"
            name={id}
            id={`${id}-${opt.value}`}
            value={opt.value}
            required={required}
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

FieldRadio.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.shape({ options: PropTypes.array }).isRequired,
  }).isRequired,
};

export default FieldRadio;
