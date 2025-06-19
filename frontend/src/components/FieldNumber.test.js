import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldNumber from "./FieldNumber";

import "@testing-library/jest-dom";

describe("FieldNumber", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldNumber
        field={{
          id: "number-field-1",
          label: "Age",
          required: true,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldNumber
        field={{
          id: "number-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
