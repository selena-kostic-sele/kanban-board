import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskTypeRadioGroup from "@/components/TaskTypeRadioGroup";

describe("TaskTypeRadioGroup", () => {
  it("renders with the initial task type selected", () => {
    const { getByText } = render(<TaskTypeRadioGroup />);
    const selectedTaskType = getByText("Todo");
    expect(selectedTaskType).toBeInTheDocument();
  });
});
