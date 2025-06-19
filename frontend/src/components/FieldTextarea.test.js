import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldTextarea from "./FieldTextarea";

import "@testing-library/jest-dom";

describe("FieldTextarea", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldTextarea
        field={{
          id: "textarea-field-1",
          label: "Message",
          required: true,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldTextarea
        field={{
          id: "textarea-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
