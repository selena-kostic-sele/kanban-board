import { useBoardStore } from "@/store/BoardStore";
import { Transition, Dialog } from "@headlessui/react";
import { useState, FormEvent, Fragment } from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  todo: Todo;
}

export const UpdateTitleModal = ({
  isOpen,
  closeModal,
  title,
  todo,
}: Props) => {
  const updateToDoTitleInDB = useBoardStore(
    (state) => state.updateToDoTitleInDB
  );

  const [updatedTitle, setUpdatedTitle] = useState("");

  if (!isOpen) {
    return null; // If the modal is closed, do not render anything
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updatedTitle === "") return;

    updateToDoTitleInDB(todo, updatedTitle);
    setUpdatedTitle("");

    closeModal();
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      appear
    >
      <Dialog
        onSubmit={handleSubmit}
        onClose={closeModal}
        as="form"
        className="absolute z-10"
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Update Task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder={title}
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={updatedTitle === ""}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100
                    px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Update Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateTitleModal;
