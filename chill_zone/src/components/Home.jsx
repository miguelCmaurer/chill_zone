import { VibesCarousel } from "./VibesCarousel";
import { RecentlyPlayed } from "./RecentlyPlayed";

export function Home() {
  console.log("Home");

  const vibes = [
    {
      id: "campsite",
      type: "scene",
      title: "Peaceful Campsite",
      image: "chill_tune_1.jpg",
    },
    {
      id: "green-city-1",
      type: "scene",
      title: "Green City",
      image: "chill_tune_2.jpg",
    },
    {
      id: "green-city-2",
      type: "scene",
      title: "Study Room",
      image: "chill_tune_3.jpg",
    },
    {
      id: "green-city-3",
      type: "scene",
      title: "Urban Oasis",
      image: "chill_tune_1.jpg",
    },
    {
      id: "green-city-4",
      type: "scene",
      title: "Mountain View",
      image: "chill_tune_2.jpg",
    },
    {
      id: "green-city-5",
      type: "scene",
      title: "Lakeside Calm",
      image: "chill_tune_3.jpg",
    },
  ];

  const handleCreateNewVibe = () => {
    console.log("createNewVibe");
  };

  return (
    <div>
      <VibesCarousel vibes={vibes} onCreateNew={handleCreateNewVibe} />
      <RecentlyPlayed />
    </div>
  );
}
