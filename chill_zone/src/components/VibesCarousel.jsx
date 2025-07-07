import { useState } from "react";
import { SceneCard } from "./SceneCard";
import { LoadImg } from "./LoadImg";
import { useNavigate } from "react-router";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const defaultVibes = [
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

export function VibesCarousel({ vibes = defaultVibes, onCreateNew }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % vibes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + vibes.length) % vibes.length);
  };

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      console.log("Create new vibe clicked");
    }
  };

  return (
    <div className="max-w-full mx-auto h-96 px-4 pt-4">
      <h2 className="pb-8 font-bold text-4xl font-shadows">My Vibes</h2>
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 p-3 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 p-3 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="overflow-hidden px-16">
          <div
            className="flex transition-transform duration-500 ease-out gap-x-4"
            style={{
              transform: `translateX(-${currentIndex * 350}px)`,
            }}
          >
            <SceneCard className="shadow-lg border-2 border-solid border-gray-300 bg-gray-50 hover:bg-gray-100">
              <div className="h-full flex flex-col justify-center items-center">
                <p className="font-semibold text-2xl text-gray-700 mb-4">
                  Add New Vibe
                </p>
                <button
                  onClick={handleCreateNew}
                  className="bg-black px-6 py-3 text-white font-bold transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create
                </button>
              </div>
            </SceneCard>
            {vibes.map((vibe) => (
              <SceneCard
                onClick={() => {
                  console.log("Click: " + vibe.title);
                  navigate(`zone?zone=${vibe.title}&base=${vibe.image}`);
                }}
                key={vibe.id}
                className="relative overflow-hidden shadow-lg group cursor-pointer"
              >
                <LoadImg
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  img={vibe.image}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-shadows text-white text-xl font-semibold drop-shadow-lg">
                    {vibe.title}
                  </h3>
                </div>
              </SceneCard>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-3 gap-2">
          {vibes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-sm transition-all duration-200 ${
                index === currentIndex
                  ? "bg-black scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
