import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ExportBar from "./ExportBar";

// Mock window.open for jsdom
beforeAll(() => {
  window.open = jest.fn(() => ({
    document: {
      open: jest.fn(),
      write: jest.fn(),
      close: jest.fn(),
    },
  }));
});

describe("ExportBar", () => {
  const fields = [
    {
      id: "text-field-1",
      type: "text",
      label: "Name",
      required: false,
      settings: {},
    },
  ];

  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls window.open when export is clicked", () => {
    render(<ExportBar fields={fields} onReorder={jest.fn()} />);
    const exportBtn = screen.getByRole("button", { name: /export html/i });
    fireEvent.click(exportBtn);
    expect(window.open).toHaveBeenCalled();
  });

  it("opens accessibility check modal", async () => {
    render(<ExportBar fields={fields} onReorder={jest.fn()} />);
    const a11yBtn = screen.getByRole("button", { name: /quick check/i });
    fireEvent.click(a11yBtn);
    expect(await screen.findByText(/accessibility suggestions/i)).toBeInTheDocument();
  });
});
