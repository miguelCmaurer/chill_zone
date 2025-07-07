import { Outlet } from "react-router";
import { SideNav } from "./components/SideNav";
import { useStore } from "./hooks/useStore";
import { BottomSoundControl } from "./components/BottomSoundControl";
function App() {
  const hasSong = useStore((state) => {
    return state.hasSong;
  });
  console.log(hasSong);
  return (
    <div className="flex flex-col h-screen">
      <div className="h-1 flex flex-1">
        <div className="w-75 shrink-0 px-3 py-2">
          <SideNav />
        </div>

        <div className="flex-1 overflow-hidden p-2">
          <Outlet />
        </div>
      </div>

      {hasSong && <BottomSoundControl />}
    </div>
  );
}

export default App;
