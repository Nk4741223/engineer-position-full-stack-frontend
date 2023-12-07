import {fireEvent, render, screen} from "@testing-library/react";
import {TextAria} from "../componemts/TextAria";

describe("Test TextAria Component", () => {
  test("タイトルを変更したときonChangeTextが正しく呼ばれること", () => {
    const mockOnChangeText = jest.fn();
    const workspace = {title: "Test Title", content: "Test Content"};

    render(<TextAria onChangeText={mockOnChangeText} workspace={workspace} />);

    const titleInput = screen.getByTestId("workspaceTitle");
    fireEvent.change(titleInput, {target: {value: "New Title"}});
    expect(mockOnChangeText).toHaveBeenCalledWith("New Title", "title");
  });

  test("コンテント（詳細）を変更したときonChangeTextが正しく呼ばれること", () => {
    const mockOnChangeText = jest.fn();
    const workspace = {title: "Test Title", content: "Test Content"};

    render(<TextAria onChangeText={mockOnChangeText} workspace={workspace} />);

    const titleInput = screen.getByTestId("workspaceContent");
    fireEvent.change(titleInput, {target: {value: "New Content"}});
    expect(mockOnChangeText).toHaveBeenCalledWith("New Content", "content");
  });
});
