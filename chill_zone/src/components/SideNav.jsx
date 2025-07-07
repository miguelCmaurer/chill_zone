import { House, Search, Rewind, Palette, Settings, LogOut } from "lucide-react";
import { UpgradeCard } from "./UpgradeCard";
import { NavItem } from "./NavItem";
export function SideNav() {
  return (
    <div className="h-full p-5 bg-white rounded-sm shadow-[0_0_12px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between flex-col h-full">
        <div>
          <h1 className="font-shadows text-4xl font-extrabold">Chill Zone</h1>
          <div className="font-default pt-8 space-y-2 text-base">
            <NavItem Icon={<House className="w-8" />} title="Home" to="/" />
            <NavItem
              Icon={<Search className="w-8" />}
              title="Listen"
              to="/listen"
            />
            <NavItem
              Icon={<Rewind className="w-8" />}
              title="Recently Played"
              to="/recent"
            />
            <NavItem
              Icon={<Palette className="w-8" />}
              title="Saved"
              to="/saved"
            />
          </div>
        </div>
        <div className="">
          <UpgradeCard />
          <div className="font-default pt-8 space-y-2 text-base">
            <NavItem
              Icon={<Settings className="w-8" />}
              title="Settings"
              to="/settings"
            />
            <NavItem
              Icon={<LogOut className="w-8" />}
              title="Log Out"
              to="/logout"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
