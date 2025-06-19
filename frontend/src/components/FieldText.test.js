import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldText from "./FieldText";

describe("FieldText", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldText
        field={{
          id: "text-field-1",
          label: "Name",
          required: true,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldText
        field={{
          id: "text-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
