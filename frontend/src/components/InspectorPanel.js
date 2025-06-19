/* eslint-disable jsx-a11y/label-has-associated-control */
// InspectorPanel.js - Renders the sidebar for editing properties of the selected field
// Receives the selected field and lets the user edit its label, required, color, options, etc.
// Also shows accessibility suggestions
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Utility to calculate contrast ratio
function getContrastRatio(hex1, hex2) {
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((x) => x + x)
        .join("");
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255].map((v) => v / 255);
  }
  function luminance([r, g, b]) {
    const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  const lum1 = luminance(hexToRgb(hex1));
  const lum2 = luminance(hexToRgb(hex2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

const InspectorPanel = ({ field, updateField, checkAccessibility }) => {
  if (!field) {
    return (
      <aside className="inspector-panel p-3 border-start">
        <h5>Field Properties</h5>
        <p>Select a field to edit its properties.</p>
      </aside>
    );
  }

  const { id, type, label, required, settings = {} } = field;
  const {
    placeholder = "",
    textColor = "#000000",
    backgroundColor = "#ffffff",
    options = [],
    rows = 3,
  } = settings;

  const handleFieldChange = (key, value) => updateField(id, { ...field, [key]: value });
  const handleSettingsChange = (key, value) =>
    updateField(id, { ...field, settings: { ...settings, [key]: value } });

  useEffect(() => {
    checkAccessibility();
    // eslint-disable-next-line
  }, [field]);

  return (
    <aside className="inspector-panel p-3 border-start">
      <h5 className="inspector-heading">{field.type} Field Properties</h5>
      <div className="mb-3">
        <label className="form-label" htmlFor={`label-${id}`}>
          Label
        </label>
        <input
          id={`label-${id}`}
          type="text"
          className="form-control"
          value={label}
          onChange={(e) => handleFieldChange("label", e.target.value)}
        />
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id={`req-${id}`}
          checked={required}
          onChange={(e) => handleFieldChange("required", e.target.checked)}
        />
        <label className="form-check-label" htmlFor={`req-${id}`}>
          Required
        </label>
      </div>

      {["text", "email", "textarea"].includes(type) && (
        <div className="mb-3">
          <label className="form-label">Placeholder</label>
          <input
            type="text"
            className="form-control"
            value={placeholder}
            onChange={(e) => handleSettingsChange("placeholder", e.target.value)}
          />
        </div>
      )}

      {type === "textarea" && (
        <div className="mb-3">
          <label className="form-label">Rows</label>
          <input
            type="number"
            className="form-control"
            value={rows}
            onChange={(e) => handleSettingsChange("rows", Number(e.target.value))}
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Text Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={textColor}
          onChange={(e) => {
            handleSettingsChange("textColor", e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Background Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={backgroundColor}
          onChange={(e) => {
            handleSettingsChange("backgroundColor", e.target.value);
          }}
        />
      </div>
      {/* Live contrast preview */}
      <div className="mb-3">
        <label className="form-label">Contrast Preview</label>
        <div
          style={{
            color: textColor,
            background: backgroundColor,
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "0.5em 1em",
            display: "inline-block",
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Sample Text
        </div>
        {(() => {
          const ratio = getContrastRatio(textColor, backgroundColor);
          if (ratio < 4.5) {
            return (
              <div className="text-danger mt-1" style={{ fontSize: 13 }}>
                Contrast is {ratio.toFixed(1)}:1. Should be at least 4.5:1 for accessibility.
              </div>
            );
          }
          return (
            <div className="text-success mt-1" style={{ fontSize: 13 }}>
              Contrast is {ratio.toFixed(1)}:1 (Good)
            </div>
          );
        })()}
      </div>

      {/* Options Editor: now includes checkbox, radio, select */}
      {["checkbox", "radio", "select"].includes(type) && (
        <div className="mb-3">
          <label className="form-label">Options</label>
          {options.map((opt, idx) => (
            <div className="input-group mb-2" key={`${id}-opt-${idx}`}>
              <input
                type="text"
                className="form-control"
                value={opt.label}
                onChange={(e) =>
                  handleSettingsChange(
                    "options",
                    options.map((o, i) => (i === idx ? { ...o, label: e.target.value } : o))
                  )
                }
              />
              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  handleSettingsChange(
                    "options",
                    options.filter((_, i) => i !== idx)
                  )
                }
              >
                &times;
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-secondary"
            onClick={() =>
              handleSettingsChange("options", [
                ...options,
                { value: `opt${options.length + 1}`, label: `Option ${options.length + 1}` },
              ])
            }
          >
            Add Option
          </button>
        </div>
      )}

      {/* Number field settings */}
      {type === "number" && (
        <>
          <div className="mb-3">
            <label className="form-label">Placeholder</label>
            <input
              type="text"
              className="form-control"
              value={placeholder}
              onChange={(e) => handleSettingsChange("placeholder", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Min</label>
            <input
              type="number"
              className="form-control"
              value={settings.min || ""}
              onChange={(e) => handleSettingsChange("min", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Max</label>
            <input
              type="number"
              className="form-control"
              value={settings.max || ""}
              onChange={(e) => handleSettingsChange("max", e.target.value)}
            />
          </div>
        </>
      )}

      {/* Date field settings */}
      {type === "date" && (
        <>
          <div className="mb-3">
            <label className="form-label">Min Date</label>
            <input
              type="date"
              className="form-control"
              value={settings.min || ""}
              onChange={(e) => handleSettingsChange("min", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Max Date</label>
            <input
              type="date"
              className="form-control"
              value={settings.max || ""}
              onChange={(e) => handleSettingsChange("max", e.target.value)}
            />
          </div>
        </>
      )}

      {/* Password, URL, Tel field settings */}
      {["password", "url", "tel"].includes(type) && (
        <div className="mb-3">
          <label className="form-label">Placeholder</label>
          <input
            type="text"
            className="form-control"
            value={placeholder}
            onChange={(e) => handleSettingsChange("placeholder", e.target.value)}
          />
        </div>
      )}

      {/* File field settings */}
      {type === "file" && (
        <div className="mb-3">
          <label className="form-label">
            Accept File Types (comma separated, e.g. .jpg,.png,.pdf)
          </label>
          <input
            type="text"
            className="form-control"
            value={settings.accept || ""}
            onChange={(e) => handleSettingsChange("accept", e.target.value)}
          />
        </div>
      )}
    </aside>
  );
};

InspectorPanel.propTypes = {
  field: PropTypes.object,
  updateField: PropTypes.func.isRequired,
  checkAccessibility: PropTypes.func.isRequired,
};

export default InspectorPanel;
