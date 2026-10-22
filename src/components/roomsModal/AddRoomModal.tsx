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

export default function AddRoomModal({
  isOpen,
  setIsopen,
  rooms,
  setRooms,
}: any) {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });

  const handleChange = (e: any) => {
    setisLoading(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function onImageChange(e: any) {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Array.from(files),
    }));
  }

  const addRoom = async () => {
    setisLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    formData.images.forEach((file) => {
      form.append("images", file);
    });

    try {
      const res = await axios.post(
        `${API_BASE}/api/rooms`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRooms([...rooms, res.data.data]);
      toast.success("Room is added");

      setisLoading(false);
      setFormData({ name: "", description: "", images: [] });
      setIsopen(false);
    } catch (error) {
      toast.error("Error adding room");
      setisLoading(false);
      console.error("Error adding item:", error);
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
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-[20px] font-[800] text-dimBlack"
                  >
                    Add New Room
                  </DialogTitle>
                  <div className="mt-2">
                    <label
                      htmlFor="name"
                      className="field-label block mt-4"
                    >
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Add name of room"
                      onChange={handleChange}
                      required
                      className="field-input"
                    />
                    <label
                      htmlFor="description"
                      className="field-label block mt-4"
                    >
                      Description:
                    </label>
                    <input
                      id="description"
                      type="text"
                      name="description"
                      value={formData.description}
                      placeholder="Add description"
                      onChange={handleChange}
                      required
                      className="field-input"
                    />
                    <label
                      htmlFor="images"
                      className="field-label block mt-4"
                    >
                      Images:
                    </label>
                    <input
                      type="file"
                      name="images"
                      onChange={onImageChange}
                      multiple
                      required
                      className="field-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-Orange_97 border-t-2 border-Grey_15/10 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
              <button
                type="button"
                onClick={() => addRoom()}
                className="inline-flex w-full items-center justify-center h-10 rounded-lg px-4 text-sm font-semibold text-white border-2 sm:w-auto bg-primary border-Grey_15 shadow-[3px_3px_0_#262626] hover:shadow-[1px_1px_0_#262626]"
              >
                <svg
                  className={` ${
                    isLoading ? "block" : "hidden"
                  }  animate-spin h-5 w-5 mr-3 rounded-full border-t-4 border-s-4 border-gray-100`}
                  viewBox="0 0 24 24"
                ></svg>
                Add Room
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
