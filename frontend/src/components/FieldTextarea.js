// FieldTextarea.js - Renders an accessible textarea field with label, color, and placeholder support
// Receives a 'field' prop with settings and renders a <textarea> element
import React from "react";
import PropTypes from "prop-types";

const FieldTextarea = ({ field }) => {
  const {
    id,
    label,
    required,
    settings: {
      placeholder = "",
      rows = 3,
      textColor = "#000000",
      backgroundColor = "#ffffff",
    } = {},
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

      <textarea
        id={id}
        rows={rows}
        className="form-control"
        required={required}
        placeholder={placeholder}
        style={{ color: textColor, backgroundColor }}
        aria-label={label || "Textarea Input"}
      />
    </div>
  );
};

FieldTextarea.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    settings: PropTypes.object,
  }).isRequired,
};

export default FieldTextarea;
