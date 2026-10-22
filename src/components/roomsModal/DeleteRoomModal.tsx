import { API_BASE } from "../../services/api";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteRoomModal({
  isOpen,
  setIsopen,
  rooms,
  setrooms,
  index,
}: any) {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const roomId = rooms[index]._id;

  const DeleteRoom = async () => {
    setisLoading(true);
    try {
      await axios.delete(
        `${API_BASE}/api/rooms/${roomId}`
      );

      setrooms(
        rooms.filter((_item: any, indexRoom: number) => {
          return indexRoom != index;
        })
      );

      toast.success("Room is deleted");

      setisLoading(false);
      setIsopen(false);
    } catch (error) {
      toast.error("Error delete room");
      setisLoading(false);
      console.error("Error delete item:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={setIsopen} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-Grey_15/40 backdrop-blur-[2px] transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-[60] w-screen overflow-y-auto">
        <div className="flex min-h-[80%] lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl border-2 border-Grey_15 bg-white text-left shadow-[5px_5px_0_#262626] transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-[18px] font-[800] text-dimBlack"
                  >
                    Delete Room
                  </DialogTitle>
                  <div className="mt-2 text-lg">
                    Are you sure you want to delete this room..?
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-Orange_97 border-t-2 border-Grey_15/10 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
              <button
                type="button"
                onClick={() => DeleteRoom()}
                className="inline-flex w-full items-center justify-center h-10 rounded-lg px-4 text-sm font-semibold text-white border-2 sm:w-auto bg-red-500 border-red-600 hover:bg-red-600"
              >
                <svg
                  className={` ${
                    isLoading ? "block" : "hidden"
                  }  animate-spin h-5 w-5 mr-3 rounded-full border-t-4 border-s-4 border-gray-100`}
                  viewBox="0 0 24 24"
                ></svg>
                Delete Room
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  setIsopen(false);
                  setisLoading(false);
                }}
                className="mt-3 inline-flex w-full items-center justify-center h-10 rounded-lg bg-white px-4 text-sm font-semibold text-Grey_15 border-2 border-Grey_15 hover:bg-Orange_95 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
