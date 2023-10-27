import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import UpdateTitleModal from "./UpdateTitleModal";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };

      fetchImage();
    }
  }, [todo]);

  const handleMouseEnter = () => {
    setIsCloseIconHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCloseIconHovered(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
        className="bg-white rounded-md space-y-2 drop-shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
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
        {imageUrl && (
          <div className="h-full w-full rounded-b-md">
            <Image
              alt="Task image"
              src={imageUrl}
              width={400}
              height={200}
              className="w-full object-contain rounded-b-md"
            />
          </div>
        )}
      </div>
      <UpdateTitleModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={todo.title}
        todo={todo}
      />
    </>
  );
}

export default ToDoCard;
