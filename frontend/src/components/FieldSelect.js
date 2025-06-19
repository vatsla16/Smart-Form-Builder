// FieldSelect.js - Renders an accessible select dropdown with label and color support
// Receives a 'field' prop with settings and renders a <select> element
import React from "react";
import PropTypes from "prop-types";

const FieldSelect = ({ field }) => {
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
      <select
        id={id}
        className="form-select"
        required={required}
        style={{ color: textColor, backgroundColor }}
        aria-label={label}
      >
        {options.map((opt, idx) => (
          <option key={`${id}-${opt.value}-${idx}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

FieldSelect.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.shape({ options: PropTypes.array }).isRequired,
  }).isRequired,
};

export default FieldSelect;
