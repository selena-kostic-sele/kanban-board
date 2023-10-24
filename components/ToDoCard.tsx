"use client";

import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function ToDoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [isCloseIconHovered, setIsCloseIconHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsCloseIconHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCloseIconHovered(false);
  };

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>

        {isCloseIconHovered && (
          <button
            className={`text-red-500 hover:text-red-600`}
            onClick={() => deleteTask(index, todo, id)}
          >
            <XCircleIcon className="ml-5 h-8 w-8" />
          </button>
        )}
      </div>

      {/* ToDo Image */}
    </div>
  );
}

export default ToDoCard;
