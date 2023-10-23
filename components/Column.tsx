import { Draggable } from "react-beautiful-dnd";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

function Column({ id, todos, index }: Props) {
  return (
    <Draggable>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* Render droppable todos in the column */}
        </div>
      )}
    </Draggable>
  );
}

export default Column;
