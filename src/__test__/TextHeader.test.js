import {fireEvent, render, screen} from "@testing-library/react";
import {TextHeader} from "../componemts/TextHeader";

describe("Test TextHeader Component", () => {
  test("TextHeader Componentにボタンが１つあること", async () => {
    render(<TextHeader />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("✕ボタンがクリックされたときにonClickが呼ばれること", () => {
    const mockOnClickDelete = jest.fn();
    render(<TextHeader onClickDelete={mockOnClickDelete} />);

    const deleteButton = screen.getByText("✕");
    fireEvent.click(deleteButton);

    expect(mockOnClickDelete).toHaveBeenCalled();
  });

  test("savedFlagがtrueのとき、savedが表示されること", () => {
    const savedFlag = true;
    render(<TextHeader savedFlag={savedFlag} />);
    expect(screen.getByText("saved")).toBeInTheDocument();
  });

  test("savedFlagがfalseのとき、savedが表示されないこと", () => {
    const savedFlag = false;
    render(<TextHeader savedFlag={savedFlag} />);
    expect(screen.queryByText("saved")).not.toBeInTheDocument();
  });
});
