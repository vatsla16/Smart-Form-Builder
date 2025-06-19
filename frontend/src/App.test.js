import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App integration", () => {
  it("deletes a field from canvas", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Text Input"));

    // Find all delete buttons and click the first one
    const deleteBtns = screen.getAllByLabelText(/delete field/i);
    fireEvent.click(deleteBtns[0]);

    // Now, check that there are no delete buttons left (or the field is gone)
    expect(screen.queryByLabelText(/delete field/i)).not.toBeInTheDocument();
  });
});
