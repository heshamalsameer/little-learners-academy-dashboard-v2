import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditServices from "./EditServices";
import DeleteServicesModal from "./DeleteServicesModal";
import { ui } from "../common/ui/ui";

export const RowofServices = ({ index, ele, services, setservices }: any) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const service = services[index];

  return (
    <tr className="hover:bg-Orange_97 transition-colors">
      <td className={`${ui.td} font-[600] text-dimBlack`}>{ele.service}</td>
      <td className={`${ui.td} whitespace-nowrap`}>{ele.price}</td>
      <td className={ui.td}>
        <div className="flex justify-end gap-2">
          <button
            aria-label="Edit"
            onClick={() => setOpenEditModal(true)}
            className={`${ui.iconBtn} bg-white border-Grey_15 text-Grey_15 hover:bg-Orange_90`}
          >
            <MdEdit />
          </button>
          <button
            aria-label="Delete"
            onClick={() => setOpenDeleteModal(true)}
            className={`${ui.iconBtn} bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white`}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
        <EditServices
          index={index}
          isOpen={openEditModal}
          setIsopen={setOpenEditModal}
          service={service}
          services={services}
          setservices={setservices}
        />
        <DeleteServicesModal
          index={index}
          isOpen={openDeleteModal}
          setIsopen={setOpenDeleteModal}
          service={service}
          services={services}
          setservices={setservices}
        />
      </td>
    </tr>
  );
};
