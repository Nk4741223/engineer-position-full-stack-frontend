import {fireEvent, render, screen} from "@testing-library/react";
import {CardAria} from "../componemts/CardAria";

describe("Test CardAria Component", () => {
  test("カードが正しくレンダリングされること", async () => {
    const cards = [
      {
        _id: 1,
        title: "Card 1",
        content: "Card 1についてです",
        updatedAt: new Date(),
      },
      {
        _id: 2,
        title: "Card 2",
        content: "Card 2についてです",
        updatedAt: new Date(),
      },
    ];

    render(<CardAria cards={cards} />);

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });

  test("カードのactiveクラスが正しく適用されること", async () => {
    const cards = [
      {
        _id: 1,
        title: "Card 1",
        content: "Card 1についてです",
        updatedAt: new Date(),
      },
      {
        _id: 2,
        title: "Card 2",
        content: "Card 2についてです",
        updatedAt: new Date(),
      },
    ];
    const activeCardId = 1;

    render(<CardAria cards={cards} activeCardId={activeCardId} />);

    const cardElement1 = screen.getByText("Card 1");
    const cardElement2 = screen.getByText("Card 2");
    expect(cardElement1.parentElement).toHaveClass("active");
    expect(cardElement2.parentElement).not.toHaveClass("active");
    expect(cardElement1.parentElement).toHaveClass("note-cards");
    expect(cardElement2.parentElement).toHaveClass("note-cards");
  });

  test("カードをクリックしたときにonClickCardが呼ばれること", () => {
    const mockOnClickCard = jest.fn();
    const cards = [
      {
        _id: 1234,
        title: "Card 1",
        content: "Card 1についてです",
        updatedAt: new Date(),
      },
    ];

    render(<CardAria cards={cards} onClickCard={mockOnClickCard} />);

    const cardElement = screen.getByText("Card 1");
    fireEvent.click(cardElement.parentElement);

    expect(mockOnClickCard).toHaveBeenCalledWith(1234);
  });
});
