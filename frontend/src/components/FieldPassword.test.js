import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldPassword from "./FieldPassword";

import "@testing-library/jest-dom";

describe("FieldPassword", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldPassword
        field={{
          id: "password-field-1",
          label: "Password",
          required: true,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldPassword
        field={{
          id: "password-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
