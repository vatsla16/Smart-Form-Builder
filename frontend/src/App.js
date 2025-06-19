import React, { useState, useEffect } from "react";
import FieldPalette from "./components/FieldPalette";
import FormCanvas from "./components/FormCanvas";
import InspectorPanel from "./components/InspectorPanel";
import ExportBar from "./components/ExportBar";

const LOCAL_STORAGE_KEY = "smart-form-fields";

const App = () => {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Load fields from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setFields(JSON.parse(saved));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  // Save fields to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fields));
  }, [fields]);

  const addField = (type) => {
    // Count how many of this type already exist
    setFields((fs) => {
      const typeCount = fs.filter((f) => f.type === type).length + 1;
      let baseId = `${type}-field-${typeCount}`;
      // Ensure uniqueness in case of deletion and re-adding
      let uniqueId = baseId;
      let i = 2;
      while (fs.some((f) => f.id === uniqueId)) {
        uniqueId = `${type}-field-${typeCount + i - 1}`;
        i++;
      }
      const newField = { id: uniqueId, type, label: "", required: false, settings: {} };
      if (["checkbox", "radio", "select"].includes(type))
        newField.settings.options = [{ value: "opt1", label: "Option 1" }];
      if (type === "textarea") newField.settings.rows = 3;
      return [...fs, newField];
    });
  };

  const updateField = (id, updated) =>
    setFields((fs) => fs.map((f) => (f.id === id ? updated : f)));
  const deleteField = (id) => {
    setFields((fs) => fs.filter((f) => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const editField = (id) => setSelectedId(id);

  const checkAccessibility = async () => {
    try {
      const res = await fetch("http://localhost:8000/validate-form/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch {
      setSuggestions([]);
    }
  };

  const moveField = (from, to) => {
    setFields((fs) => {
      if (to < 0 || to >= fs.length) return fs;
      const updated = [...fs];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  const selectedField = fields.find((f) => f.id === selectedId) || null;

  return (
    <>
      {/* Skip links for accessibility */}
      <nav aria-label="Skip links">
        <a href="#add-fields" className="skip-link">
          Skip to Add Fields
        </a>
        <a href="#form-canvas" className="skip-link">
          Skip to Canvas
        </a>
        <a href="#field-properties" className="skip-link">
          Skip to Field Properties
        </a>
      </nav>
      <div className="d-flex flex-column" style={{ height: "100vh", minHeight: 0 }}>
        {/* Header Bar (white background, dark text) */}
        <header
          className="d-flex align-items-center justify-content-between gap-2 px-4 py-3 border-bottom bg-white shadow rounded-bottom"
          style={{ minHeight: 70 }}
        >
          <div className="d-flex align-items-center gap-2">
            <h1 className="m-0 fw-bold fs-5 text-dark">Smart Form Builder</h1>
          </div>
          <ExportBar fields={fields} onReorder={setFields} />
        </header>
        <div className="d-flex flex-grow-1 h-100" style={{ minHeight: 0 }}>
          {/* Left: Field Palette (full height, scrollable) */}
          <div
            id="add-fields"
            tabIndex={-1}
            className="border-end h-100"
            style={{
              width: 280,
              minWidth: 220,
              background: "#fafafa",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <FieldPalette onAdd={addField} />
          </div>
          {/* Center: Form Canvas (scrollable) */}
          <main
            id="form-canvas"
            tabIndex={-1}
            className="flex-grow-1 p-4 d-flex justify-content-center align-items-start"
            style={{ height: "100%", overflowY: "auto", minHeight: 0 }}
          >
            <FormCanvas
              fields={fields}
              selectedId={selectedId}
              onEdit={editField}
              onDelete={deleteField}
              onSelect={editField}
              moveField={moveField}
            />
          </main>
          {/* Right: Inspector Panel (scrollable) */}
          <div
            id="field-properties"
            tabIndex={-1}
            className="border-start"
            style={{ width: 340, minWidth: 260, height: "100%", overflowY: "auto" }}
          >
            <InspectorPanel
              field={selectedField}
              suggestions={suggestions.filter((s) => s.field_id === selectedId)}
              updateField={updateField}
              checkAccessibility={checkAccessibility}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
