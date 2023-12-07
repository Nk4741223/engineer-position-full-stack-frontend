// import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

describe("Test App", () => {
  test("Notesが正しく表示されること", () => {
    render(<App />);
    const HeaderText = screen.getByText("Notes");
    expect(HeaderText).toBeInTheDocument();
  });
});
