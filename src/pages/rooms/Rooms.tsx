import { useEffect, useMemo, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Room } from "../../components/Rooms/Room";
import { RoomTitles } from "../../components/Rooms/RoomsTitles";
import AddRoomModal from "../../components/roomsModal/AddRoomModal";
import PageHeader from "../../components/common/ui/PageHeader";
import { ui } from "../../components/common/ui/ui";
import { Bone } from "../../components/common/ui/Skeleton";
import { EmptyState } from "../../components/common/GridList/GridList";
import Loading from "../../components/common/Loading/Loading";
import { API_BASE } from "../../services/api";

export type RoomType = {
  name: string;
  description: string;
  images: any[];
  _id: string;
};

const RoomsSkeleton = () => (
  <div className="flex flex-col gap-10">
    {[0, 1].map((r) => (
      <div key={r}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 relative z-10">
          {[0, 1, 2, 3].map((i) => (
            <Bone key={i} className={`h-36 !rounded-xl ${i > 1 ? "hidden lg:block" : ""}`} />
          ))}
        </div>
        <div className="bg-white border-2 border-Grey_15/15 rounded-xl -mt-16 pt-24 pb-6 px-6">
          <Bone className="h-6 w-40" />
          <Bone className="h-4 w-2/3 mt-3" />
        </div>
      </div>
    ))}
  </div>
);

const Rooms = () => {
  const [roomSelected, setroomSelected] = useState<string>("All");
  const [rooms, setrooms] = useState<RoomType[]>([]);
  const [status, setStatus] = useState<"Pending" | "Success" | "Fail">("Pending");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/rooms`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((data) => {
        setrooms(data.data ?? []);
        setStatus("Success");
      })
      .catch(() => setStatus("Fail"));
  }, []);

  const visible = useMemo(
    () => (roomSelected === "All" ? rooms : rooms.filter((room) => room._id === roomSelected)),
    [rooms, roomSelected]
  );

  return (
    <div className="page">
      <PageHeader
        title="Rooms"
        subtitle={status === "Pending" ? undefined : `${rooms.length} room${rooms.length === 1 ? "" : "s"}`}
        action={
          <button className={`${ui.btn} ${ui.primary}`} onClick={() => setOpen(true)}>
            <RiAddLine size={18} /> Add Room
          </button>
        }
      />
      <AddRoomModal isOpen={open} setIsopen={setOpen} rooms={rooms} setRooms={setrooms} />
      {status === "Pending" ? (
        <RoomsSkeleton />
      ) : (
        <Loading status={status} error="Couldn't load rooms" hasData={rooms.length > 0}>
          {rooms.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <RoomTitles rooms={rooms} roomSelected={roomSelected} setroomSelected={setroomSelected} />
              <div className="flex flex-col gap-10">
                {visible.map((item) => (
                  <Room
                    key={item._id}
                    index={rooms.findIndex((r) => r._id === item._id)}
                    rooms={rooms}
                    room={item}
                    setRooms={setrooms}
                  />
                ))}
              </div>
            </>
          )}
        </Loading>
      )}
    </div>
  );
};

export default Rooms;
