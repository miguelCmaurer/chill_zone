import { Play } from "lucide-react";
import { useStore } from "../hooks/useStore";
import { LoadImg } from "./LoadImg";

const recentlyPlayedData = [
  {
    image: "chill_tune_1.jpg",
    song: "chill_tune_1.mp3",
    title: "Chill Zone - Episode #12",
    artist: "Ambient Studios",
    release: "20 Aug 2023",
    length: "1 hr 18 min",
  },
  {
    image: "chill_tune_2.jpg",
    song: "chill_tune_2.mp3",
    title: "Study Room - Deep Focus",
    artist: "Ambient Studios",
    release: "18 Aug 2023",
    length: "45 min",
  },
  {
    image: "chill_tune_3.jpg",
    song: "chill_tune_3.mp3",
    title: "Urban Oasis - Morning Vibes",
    artist: "Ambient Studios",
    release: "15 Aug 2023",
    length: "2 hr 15 min",
  },
  {
    image: "chill_tune_1.jpg",
    song: "chill_tune_4.mp3",
    title: "Lakeside Calm - Evening Meditation",
    artist: "Ambient Studios",
    release: "12 Aug 2023",
    length: "30 min",
  },
  {
    image: "chill_tune_2.jpg",
    song: "chill_tune_5.mp3",
    title: "Mountain View - Ambient Sounds",
    artist: "Ambient Studios",
    release: "10 Aug 2023",
    length: "1 hr 45 min",
  },
  {
    image: "chill_tune_3.jpg",
    song: "chill_tune_6.mp3",
    title: "Peaceful Campsite - Night Sounds",
    artist: "Ambient Studios",
    release: "8 Aug 2023",
    length: "3 hr 20 min",
  },
];

export function RecentlyPlayed() {
  console.log("RecentlyPlayed");
  return (
    <div className="max-h-fit">
      <h2 className="pb-4 pt-4 font-bold text-4xl font-shadows">
        Recently played
      </h2>
      <div className="h-96 overflow-y-auto space-y-3 pb-32 p-4">
        {recentlyPlayedData.map((item, index) => (
          <RecentlyPlayedItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

function RecentlyPlayedItem({ data }) {
  const { setSong, setHasSong } = useStore((state) => state);
  console.log("RecentlyPlayedItem");
  return (
    <div className="flex flex-row justify-between items-center shadow-[0_0_5px_rgba(0,0,0,0.2)] p-4 bg-white">
      <div className="flex">
        <LoadImg
          img={data.image}
          className="h-17 w-17 object-cover rounded-sm"
          alt="Episode thumbnail"
        />
        <div className="pl-3 flex flex-col justify-around">
          <h3 className="font-bold">{data.title}</h3>
          <p className="text-sm text-gray-500">by {data.artist}</p>
          <div className="flex space-x-2 items-center">
            <p className="text-gray-600">{data.release}</p>
            <span className="h-0.5 w-0.5 bg-black rounded-full"></span>
            <p className="text-gray-600">{data.length}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setHasSong(true);
          setSong({
            title: data.title,
            artist: data.artist,
            img: data.image,
            song: data.song,
          });
        }}
        className="bg-black flex p-4 justify-center items-center rounded"
      >
        <Play className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
