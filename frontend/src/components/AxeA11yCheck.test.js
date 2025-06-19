import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AxeA11yCheck from "./AxeA11yCheck";

// Mock axe-core to return violations
jest.mock("axe-core", () => ({
  run: (node, options, callback) => {
    callback(null, {
      passes: [],
      violations: [
        {
          help: "Form element must have labels",
          description: "Some form elements do not have associated labels.",
          nodes: [
            {
              target: ["#text-field-1"],
              failureSummary: "Fix any of the following: Add a label to the input.",
            },
          ],
        },
      ],
    });
  },
}));

describe("AxeA11yCheck", () => {
  beforeEach(() => {
    // Add a dummy form-canvas node to the DOM
    const div = document.createElement("div");
    div.id = "form-canvas";
    document.body.appendChild(div);
  });
  afterEach(() => {
    document.getElementById("form-canvas")?.remove();
  });

  it("shows violations when Full Scan is clicked", async () => {
    render(<AxeA11yCheck disabled={false} />);
    fireEvent.click(screen.getByRole("button", { name: /full scan/i }));
    expect(
      await screen.findByText((content) => content.includes("Form element must have labels"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(/some form elements do not have associated labels/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/add a label to the input/i)).toBeInTheDocument();
  });

  it("button is disabled when prop is set", () => {
    render(<AxeA11yCheck disabled={true} />);
    expect(screen.getByRole("button", { name: /full scan/i })).toBeDisabled();
  });
});
