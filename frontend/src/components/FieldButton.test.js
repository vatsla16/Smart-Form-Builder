import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldButton from "./FieldButton";

import "@testing-library/jest-dom";

describe("FieldButton", () => {
  it("renders with label", () => {
    render(
      <FieldButton
        field={{
          id: "button-field-1",
          label: "Submit",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it("renders default label if label is empty", () => {
    render(
      <FieldButton
        field={{
          id: "button-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/button/i)).toBeInTheDocument();
  });
});
