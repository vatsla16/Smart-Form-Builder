import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldRadio from "./FieldRadio";

import "@testing-library/jest-dom";

describe("FieldRadio", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldRadio
        field={{
          id: "radio-field-1",
          label: "Gender",
          required: true,
          settings: {
            textColor: "#000",
            backgroundColor: "#fff",
            options: [{ value: "m", label: "Male" }],
          },
        }}
      />
    );
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldRadio
        field={{
          id: "radio-field-2",
          label: "",
          required: false,
          settings: {
            textColor: "#000",
            backgroundColor: "#fff",
            options: [{ value: "m", label: "Male" }],
          },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
