import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldCheckbox from "./FieldCheckbox";

import "@testing-library/jest-dom";

describe("FieldCheckbox", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldCheckbox
        field={{
          id: "checkbox-field-1",
          label: "Accept Terms",
          required: true,
          settings: {
            textColor: "#000",
            backgroundColor: "#fff",
            options: [{ value: "yes", label: "Yes" }],
          },
        }}
      />
    );
    expect(screen.getByText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldCheckbox
        field={{
          id: "checkbox-field-2",
          label: "",
          required: false,
          settings: {
            textColor: "#000",
            backgroundColor: "#fff",
            options: [{ value: "yes", label: "Yes" }],
          },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
