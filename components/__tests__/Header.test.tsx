import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header"; // Import the Header component

// Mock the useBoardStore function
jest.mock("@/store/BoardStore", () => {
  return {
    useBoardStore: jest.fn(),
  };
});

describe("Header Component", () => {
  beforeEach(() => {
    // Mock useBoardStore to provide expected values and functions
    require("@/store/BoardStore").useBoardStore.mockReturnValue([
      "",
      jest.fn(),
    ]);
  });

  it("should render the component", () => {
    render(<Header />);
    const logoImage = screen.getByAltText("Kanban Board Logo");
    const searchInput = screen.getByPlaceholderText("Search");

    expect(logoImage).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it("should call setSearchString when the input changes", () => {
    // Mock setSearchString function
    const setSearchString = jest.fn();
    require("@/store/BoardStore").useBoardStore.mockReturnValue([
      "",
      setSearchString,
    ]);

    render(<Header />);
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "New search string" } });

    expect(setSearchString).toHaveBeenCalledWith("New search string");
  });

  it("should call setSearchString when the input changes", () => {
    const setSearchString = jest.fn();
    require("@/store/BoardStore").useBoardStore.mockReturnValue([
      "",
      setSearchString,
    ]);

    render(<Header />);
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "New search string" } });

    expect(setSearchString).toHaveBeenCalledWith("New search string");
  });
});
