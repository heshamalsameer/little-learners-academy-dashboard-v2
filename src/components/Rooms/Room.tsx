import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditRoom from "../roomsModal/EditRoom";
import DeleteRoomModal from "../roomsModal/DeleteRoomModal";
import { ui } from "../common/ui/ui";

export const Room = ({ rooms, room, setRooms, index }: any) => {
  const swiperRef = useRef<any>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const images: { url: string }[] = room.images ?? [];

  return (
    <div className="relative">
      <EditRoom index={index} isOpen={openEditModal} setIsopen={setOpenEditModal} rooms={rooms} setrooms={setRooms} />
      <DeleteRoomModal index={index} isOpen={openDeleteModal} setIsopen={setOpenDeleteModal} rooms={rooms} setrooms={setRooms} />
      <div className="px-6 relative z-10">
        <Swiper
          ref={swiperRef}
          spaceBetween={14}
          slidesPerView={1.2}
          breakpoints={{ 640: { slidesPerView: 2 }, 1280: { slidesPerView: 4 } }}
          freeMode={true}
          loop={images.length > 4}
          modules={[FreeMode]}
          className="cursor-grab"
        >
          {images.map((item, i) => (
            <SwiperSlide key={i}>
              <img
                src={item.url}
                alt={room.name}
                loading="lazy"
                className="rounded-xl border-2 border-Grey_15 w-full aspect-[4/3] object-cover bg-Orange_95"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`${ui.card} -mt-16 pt-20 pb-6 px-6`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[20px] md:text-[24px] font-[800]">{room.name}</h3>
          <div className="flex items-center gap-2">
            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                  className={`${ui.iconBtn} bg-white border-Grey_15 hover:bg-Orange_95`}
                >
                  <FaArrowLeft />
                </button>
                <button
                  aria-label="Next image"
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                  className={`${ui.iconBtn} bg-white border-Grey_15 hover:bg-Orange_95`}
                >
                  <FaArrowRight />
                </button>
                <span className="w-px h-6 bg-Grey_15/20 mx-1" />
              </>
            )}
            <button
              aria-label="Edit room"
              onClick={() => setOpenEditModal(true)}
              className={`${ui.iconBtn} bg-white border-Grey_15 text-Grey_15 hover:bg-Orange_90`}
            >
              <MdEdit />
            </button>
            <button
              aria-label="Delete room"
              onClick={() => setOpenDeleteModal(true)}
              className={`${ui.iconBtn} bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white`}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
        <p className={`${ui.cardText} mt-2`}>{room.description}</p>
      </div>
    </div>
  );
};
