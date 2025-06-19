/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import PropTypes from "prop-types";
import AxeA11yCheck from "./AxeA11yCheck";

function generateFormHTML(fields) {
  // Helper to escape HTML
  const esc = (str) =>
    String(str || "")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exported Form</title>
  <style>
    .visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
  </style>
</head>
<body>
  <form role='form' aria-labelledby='form-heading'>
    <div id='form-live-region' class='visually-hidden' aria-live='polite'></div>
    ${fields
      .map((field) => {
        const { id, type, label, required, settings = {} } = field;
        const {
          placeholder = "",
          textColor = "#000000",
          backgroundColor = "#ffffff",
          options = [],
          rows = 3,
        } = settings;
        const req = required ? ' required aria-required="true"' : "";
        const style = ` style='color:${textColor};background-color:${backgroundColor};'`;
        switch (type) {
          case "text":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='text' id='${id}' name='${id}' placeholder='${esc(placeholder)}'${req}${style} aria-label='${esc(label) || "Text Input Field"}' /></div>`;
          case "email":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='email' id='${id}' name='${id}' placeholder='${esc(placeholder)}'${req}${style} aria-label='${esc(label) || "Email Input Field"}' /></div>`;
          case "number":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='number' id='${id}' name='${id}' placeholder='${esc(placeholder)}' min='${settings.min || ""}' max='${settings.max || ""}'${req}${style} aria-label='${esc(label) || "Number Input Field"}' /></div>`;
          case "date":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='date' id='${id}' name='${id}' min='${settings.min || ""}' max='${settings.max || ""}'${req}${style} aria-label='${esc(label) || "Date Input Field"}' /></div>`;
          case "password":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='password' id='${id}' name='${id}' placeholder='${esc(placeholder)}'${req}${style} aria-label='${esc(label) || "Password Input Field"}' /></div>`;
          case "url":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='url' id='${id}' name='${id}' placeholder='${esc(placeholder)}'${req}${style} aria-label='${esc(label) || "URL Input Field"}' /></div>`;
          case "tel":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='tel' id='${id}' name='${id}' placeholder='${esc(placeholder)}'${req}${style} aria-label='${esc(label) || "Phone Input Field"}' /></div>`;
          case "file":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><input type='file' id='${id}' name='${id}'${settings.accept ? ` accept='${settings.accept}'` : ""}${req}${style} aria-label='${esc(label) || "File Input Field"}' /></div>`;
          case "section":
            return `<h3 id='form-heading'${style}>${esc(label) || "Section Title"}</h3>`;
          case "textarea":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><textarea id='${id}' name='${id}' rows='${rows}' placeholder='${esc(placeholder)}'${req}${style} aria-label='${esc(label) || "Textarea Input"}'></textarea></div>`;
          case "checkbox":
            return `<fieldset${required ? ' aria-required="true"' : ""}><legend>${esc(label) || "Label"}${required ? " *" : ""}</legend>${options
              .map(
                (opt, i) =>
                  `<div><input type='checkbox' id='${id}-${i}' name='${id}' value='${esc(
                    opt.value
                  )}'${style} aria-label='${esc(opt.label)}' /><label for='${id}-${i}'>${esc(
                    opt.label
                  )}</label></div>`
              )
              .join("")}</fieldset>`;
          case "radio":
            return `<fieldset${required ? ' aria-required="true"' : ""}><legend>${esc(label) || "Label"}${required ? " *" : ""}</legend>${options
              .map(
                (opt, i) =>
                  `<div><input type='radio' id='${id}-${i}' name='${id}' value='${esc(
                    opt.value
                  )}'${style} aria-label='${esc(opt.label)}' /><label for='${id}-${i}'>${esc(
                    opt.label
                  )}</label></div>`
              )
              .join("")}</fieldset>`;
          case "select":
            return `<div><label for='${id}'>${esc(label) || "Label"}${required ? " *" : ""}</label><select id='${id}' name='${id}'${req}${style} aria-label='${esc(label)}'>${options.map((opt) => `<option value='${esc(opt.value)}'>${esc(opt.label)}</option>`).join("")}</select></div>`;
          case "button":
            return `<div><button type='button'${style} aria-label='${esc(label) || "Button"}'>${esc(label) || "Button"}</button></div>`;
          default:
            return "";
        }
      })
      .join("\n    ")}
  </form>
</body>
</html>`;
}

const ExportBar = ({ fields, onReorder }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [a11yResults, setA11yResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);
  const [reorderFields, setReorderFields] = useState([]);

  const handleExport = () => {
    const html = generateFormHTML(fields);
    const win = window.open();
    if (win) {
      win.document.open();
      win.document.write(
        `<!DOCTYPE html><html><head><title>Exported Form</title></head><body>` +
          `<div style='background:#f8f9fa;padding:1em;border-bottom:1px solid #ccc;font-family:sans-serif;'>` +
          `<strong>Copy the HTML below or use your browser's Save As feature.</strong></div>` +
          `<pre style='margin:0;padding:1em;font-size:14px;background:#fff;overflow:auto;'>` +
          html.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
          `</pre></body></html>`
      );
      win.document.close();
    }
  };

  const handleA11yCheck = async () => {
    setLoading(true);
    setModalOpen(true);
    try {
      const res = await fetch("http://localhost:8000/validate-form/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setA11yResults(Array.isArray(data) ? data : []);
    } catch {
      setA11yResults([
        {
          field_id: "-",
          issue: "Error",
          suggestion: "Could not check accessibility.",
          severity: "high",
        },
      ]);
    }
    setLoading(false);
  };

  // Group results by field and map field_id to type and index
  const fieldIdToTypeIndex = {};
  fields.forEach((f, idx) => {
    const type = f.type.charAt(0).toUpperCase() + f.type.slice(1) + " Field";
    // Count how many of this type before this index
    const typeCount = fields.slice(0, idx + 1).filter((ff) => ff.type === f.type).length;
    fieldIdToTypeIndex[f.id] = `${type} ${typeCount}`;
  });

  const groupedResults = a11yResults.reduce((acc, item) => {
    if (!acc[item.field_id]) acc[item.field_id] = [];
    acc[item.field_id].push(item);
    return acc;
  }, {});

  // Open reorder modal and set local order state
  const openReorderModal = () => {
    setReorderFields(fields);
    setReorderOpen(true);
  };

  // Move field up/down in local reorderFields
  const moveReorderField = (from, to) => {
    setReorderFields((fs) => {
      if (to < 0 || to >= fs.length) return fs;
      const updated = [...fs];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  // Save new order
  const saveReorder = () => {
    if (onReorder) onReorder(reorderFields);
    setReorderOpen(false);
  };

  return (
    <div className="d-flex flex-column align-items-end" style={{ width: "100%" }}>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-outline-secondary btn-lg rounded-pill px-4"
          onClick={handleA11yCheck}
          disabled={fields.length === 0}
        >
          Quick Check
        </button>
        {/* Axe accessibility scan button (always show) */}
        <AxeA11yCheck disabled={fields.length === 0} />
        <button
          className="btn btn-outline-primary btn-lg rounded-pill px-4"
          onClick={openReorderModal}
          disabled={fields.length === 0}
        >
          Reorder Fields
        </button>
        <button
          className="btn btn-primary btn-lg rounded-pill px-4"
          onClick={handleExport}
          disabled={fields.length === 0}
        >
          Export HTML
        </button>
      </div>
      {/* Modal for accessibility results */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              maxWidth: 600,
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 2px 16px #0002",
              padding: 24,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                border: "none",
                background: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h4>Accessibility Suggestions</h4>
            {loading ? (
              <div>Checking accessibility...</div>
            ) : a11yResults.length === 0 ? (
              <div className="text-success">No accessibility issues found! 🎉</div>
            ) : (
              <div>
                {Object.entries(groupedResults).map(([fieldId, issues]) => (
                  <div key={fieldId} style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                      {fieldIdToTypeIndex[fieldId] || `Field (${fieldId})`}
                    </div>
                    <ul style={{ marginBottom: 0 }}>
                      {issues.map((issue, i) => (
                        <li
                          key={i}
                          style={{
                            color:
                              issue.severity === "high"
                                ? "#dc3545"
                                : issue.severity === "medium"
                                  ? "#fd7e14"
                                  : "#0d6efd",
                          }}
                        >
                          <strong>{issue.issue}:</strong> {issue.suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Modal for reorder fields */}
      {reorderOpen && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              maxWidth: 500,
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 2px 16px #0002",
              padding: 24,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                border: "none",
                background: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
              onClick={() => setReorderOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h4>Reorder Fields</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {reorderFields.map((f, idx) => (
                <li
                  key={f.id}
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ flex: 1 }}>
                    {f.label || `${f.type.charAt(0).toUpperCase() + f.type.slice(1)} Field`}
                  </span>
                  <button
                    className="btn btn-sm btn-light border"
                    style={{ padding: "2px 6px", marginRight: 2 }}
                    aria-label="Move up"
                    onClick={() => moveReorderField(idx, idx - 1)}
                    disabled={idx === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="btn btn-sm btn-light border"
                    style={{ padding: "2px 6px" }}
                    aria-label="Move down"
                    onClick={() => moveReorderField(idx, idx + 1)}
                    disabled={idx === reorderFields.length - 1}
                  >
                    ↓
                  </button>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-end mt-3" style={{ gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => setReorderOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveReorder}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ExportBar.propTypes = {
  fields: PropTypes.array.isRequired,
  onReorder: PropTypes.func.isRequired,
};

export default ExportBar;
