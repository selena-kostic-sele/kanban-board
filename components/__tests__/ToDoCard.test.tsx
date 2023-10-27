import React from "react";
import { render, screen } from "@testing-library/react";
import ToDoCard from "@/components/ToDoCard";
import { act } from "react-dom/test-utils"; // Import act from react-dom/test-utils

// Mock the useBoardStore function
jest.mock("@/store/BoardStore", () => ({
  useBoardStore: jest.fn(),
}));

// Mock the getUrl function
jest.mock("@/lib/getUrl", () => ({
  __esModule: true,
  default: async () => "https://kanbantool.com/developer/images/logo.png",
}));

describe("ToDoCard Component", () => {
  const todo = {
    title: "Test Task",
    image: { bucketId: "mockBucket", fileId: "mockFileId" },
  };
  const index = 0;
  const id = "todo";
  const innerRef = jest.fn();
  const draggableProps = {};
  const dragHandleProps = null;

  it("should render the title", async () => {
    await act(async () => {
      render(
        <ToDoCard
          todo={todo}
          index={index}
          id={id}
          innerRef={innerRef}
          draggableProps={draggableProps}
          dragHandleProps={dragHandleProps}
        />
      );
    });

    // Check if the title is rendered
    const titleElement = screen.getByText("Test Task");
    expect(titleElement).toBeInTheDocument();
  });
});
