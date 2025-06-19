/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import FieldText from "./FieldText";
import FieldEmail from "./FieldEmail";
import FieldTextarea from "./FieldTextarea";
import FieldCheckbox from "./FieldCheckbox";
import FieldRadio from "./FieldRadio";
import FieldSelect from "./FieldSelect";
import FieldButton from "./FieldButton";
import FieldNumber from "./FieldNumber";
import FieldDate from "./FieldDate";
import FieldPassword from "./FieldPassword";
import FieldURL from "./FieldURL";
import FieldTel from "./FieldTel";
import FieldFile from "./FieldFile";

const FormCanvas = ({ fields, selectedId, onEdit, onDelete, onSelect }) => {
  // Compute type+index for each field
  const fieldTypeLabels = {};
  fields.forEach((f, idx) => {
    const type = f.type.charAt(0).toUpperCase() + f.type.slice(1) + " Field";
    const typeCount = fields.slice(0, idx + 1).filter((ff) => ff.type === f.type).length;
    fieldTypeLabels[f.id] = `${type} ${typeCount}`;
  });

  return (
    <div className="form-canvas w-100" style={{ maxWidth: 700, height: "100%", overflowY: "auto" }}>
      <h4 className="mb-4">Form Canvas</h4>
      {fields.length === 0 ? (
        <div className="mt-2">
          Start building your form by clicking elements from the left sidebar.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`position-relative p-3 border rounded${selectedId === field.id ? " border-primary" : ""}`}
              tabIndex={0}
              role="group"
              aria-label={`${field.type} field`}
              onClick={() => onSelect(field.id)}
              onKeyDown={(e) => {
                if (["Enter", " ", "Spacebar"].includes(e.key)) onSelect(field.id);
              }}
              style={{ outline: selectedId === field.id ? "2px solid #0d6efd" : undefined }}
            >
              {/* Edit button (now next to delete button, both top-right) */}
              <button
                aria-label="Edit field properties"
                className="btn btn-sm btn-secondary position-absolute top-0 end-0 me-5 mt-2"
                style={{ zIndex: 2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(field.id);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (["Enter", " ", "Spacebar"].includes(e.key)) {
                    e.preventDefault();
                    onEdit(field.id);
                  }
                }}
              >
                ✎
              </button>
              {/* Delete button */}
              <button
                aria-label="Delete field"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 me-2 mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(field.id);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (["Enter", " ", "Spacebar"].includes(e.key)) {
                    e.preventDefault();
                    onDelete(field.id);
                  }
                }}
              >
                ×
              </button>
              {/* Field rendering */}
              {
                {
                  text: <FieldText field={field} />,
                  email: <FieldEmail field={field} />,
                  number: <FieldNumber field={field} />,
                  date: <FieldDate field={field} />,
                  password: <FieldPassword field={field} />,
                  url: <FieldURL field={field} />,
                  tel: <FieldTel field={field} />,
                  file: <FieldFile field={field} />,
                  section: <h5 className="my-3">{field.label || "Section Title"}</h5>,
                  textarea: <FieldTextarea field={field} />,
                  checkbox: <FieldCheckbox field={field} />,
                  radio: <FieldRadio field={field} />,
                  select: <FieldSelect field={field} />,
                  button: <FieldButton field={field} />,
                }[field.type]
              }
              {/* Type+index label in bottom-right */}
              <span
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 6,
                  fontSize: 12,
                  color: "#333",
                  background: "#f8f9fa",
                  borderRadius: 4,
                  padding: "2px 8px",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
                aria-hidden="true"
              >
                {fieldTypeLabels[field.id]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormCanvas;
