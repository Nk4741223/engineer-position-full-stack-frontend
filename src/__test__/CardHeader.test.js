import {fireEvent, render, screen} from "@testing-library/react";
import {CardHeader} from "../componemts/CardHeader";

describe("Test CardHeader Component", () => {
  test("CardHeader Componentにボタンが１つあること", async () => {
    render(<CardHeader />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("＋ボタンがクリックされたときにonClickが呼ばれること", () => {
    const mockOnClickAdd = jest.fn();
    render(<CardHeader onClickAdd={mockOnClickAdd} />);

    const addButton = screen.getByText("＋");
    fireEvent.click(addButton);

    expect(mockOnClickAdd).toHaveBeenCalled();
  });
});
