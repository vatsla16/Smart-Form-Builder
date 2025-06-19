import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FieldURL from "./FieldURL";

import "@testing-library/jest-dom";

describe("FieldURL", () => {
  it("renders with label and required asterisk", () => {
    render(
      <FieldURL
        field={{
          id: "url-field-1",
          label: "Website",
          required: true,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders missing label warning if label is empty", () => {
    render(
      <FieldURL
        field={{
          id: "url-field-2",
          label: "",
          required: false,
          settings: { textColor: "#000", backgroundColor: "#fff" },
        }}
      />
    );
    expect(screen.getByText(/missing label/i)).toBeInTheDocument();
  });
});
