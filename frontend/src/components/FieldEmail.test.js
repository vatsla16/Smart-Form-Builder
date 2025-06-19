import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldEmail from "./FieldEmail";

import "@testing-library/jest-dom";

describe("FieldEmail", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldEmail
        field={{
          id: "email-field-1",
          label: "Email",
          required: true,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldEmail
        field={{
          id: "email-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
