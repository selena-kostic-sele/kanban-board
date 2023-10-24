"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

function Board() {
  const getBoard = useBoardStore((state) => state.getBoard); // getting the data from global store - zustand
  const board = useBoardStore((state) => state.board);
  const setBoardState = useBoardStore((state) => state.setBoardState);
  const updateTodoInDB = useBoardStore((state) => state.updateTodoInDB);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return; // This will check if the user has dragged the card outside of the borad

    // Column dragging implementation
    if (type === "column") {
      const entries = Array.from(board.columns.entries()); // Create array from map
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const reArrangedColumns = new Map(entries);

      setBoardState({ ...board, columns: reArrangedColumns });
    }

    // ToDos dragging implementation
    const columns = Array.from(board.columns);
    const startColumnIndex = columns[Number(source.droppableId)];
    const finishColumnIndex = columns[Number(destination.droppableId)];

    const startColumn: Column = {
      id: startColumnIndex[0],
      todos: startColumnIndex[1].todos,
    };

    const finishColumn: Column = {
      id: finishColumnIndex[0],
      todos: finishColumnIndex[1].todos,
    };

    if (!startColumn || !finishColumn) return; // If we do not have starting and endding point, do nothing

    // If we want to drag and drop at the same position, do nothing
    if (source.index === destination.index && startColumn === finishColumn)
      return;

    const newTodos = startColumn.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startColumn.id === finishColumn.id) {
      // Same column task dragging - from inside ToDo for example
      newTodos.splice(destination.index, 0, todoMoved);
      const newColumn = {
        id: startColumn.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newColumn);

      setBoardState({ ...board, columns: newColumns });
    } else {
      // dragging item to another column - from ToDo to Done for example
      const finishTodos = Array.from(finishColumn.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newColumn = {
        id: startColumn.id,
        todos: newTodos,
      };

      newColumns.set(startColumn.id, newColumn);
      newColumns.set(finishColumn.id, {
        id: finishColumn.id,
        todos: finishTodos,
      });

      updateTodoInDB(todoMoved, finishColumn.id); // Update DB if there is a change bewteen columns

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="kanbanBoard" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
