import { NavLink } from "react-router";
export function NavItem({ Icon = null, title, to = "/" }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center space-x-2 rounded p-3 transition-all duration-200",
          isActive
            ? "shadow-[0_0_12px_rgba(0,0,0,0.2)] bg-white/10 backdrop-blur-md"
            : "hover:bg-white/5",
        ].join(" ")
      }
    >
      {Icon || ""}
      <p>{title}</p>
    </NavLink>
  );
}
