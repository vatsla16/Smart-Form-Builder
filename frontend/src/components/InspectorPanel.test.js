import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InspectorPanel from "./InspectorPanel";

describe("InspectorPanel", () => {
  it("shows message when no field is selected", () => {
    render(<InspectorPanel field={null} updateField={jest.fn()} checkAccessibility={jest.fn()} />);
    expect(screen.getByText(/select a field to edit/i)).toBeInTheDocument();
  });

  it("renders field properties and updates on change", () => {
    const updateField = jest.fn();
    render(
      <InspectorPanel
        field={{
          id: "text-field-1",
          type: "text",
          label: "Name",
          required: false,
          settings: { placeholder: "Enter name" },
        }}
        updateField={updateField}
        checkAccessibility={jest.fn()}
      />
    );
    expect(screen.getByDisplayValue("Name")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/label/i), { target: { value: "New Name" } });
    expect(updateField).toHaveBeenCalled();
  });
});
