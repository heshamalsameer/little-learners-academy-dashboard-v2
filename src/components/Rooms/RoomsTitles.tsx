import { RoomType } from "../../pages/rooms/Rooms";

interface RoomTitlesProps {
  rooms: RoomType[];
  roomSelected: string;
  setroomSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomTitles = ({ rooms, roomSelected, setroomSelected }: RoomTitlesProps) => {
  const items = [{ _id: "All", name: "All" }, ...rooms];
  return (
    <div className="overflow-x-auto mb-8 pb-1">
      <ul className="flex gap-2 whitespace-nowrap w-fit">
        {items.map((room) => (
          <li key={room._id}>
            <button
              type="button"
              onClick={() => setroomSelected(room._id)}
              className={`h-9 px-4 rounded-lg border-2 border-Grey_15 text-[14px] font-[600] transition-colors ${
                roomSelected === room._id ? "bg-Orange_90" : "bg-white hover:bg-Orange_95"
              }`}
            >
              {room.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
