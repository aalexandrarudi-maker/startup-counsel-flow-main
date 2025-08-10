import { NavLink } from "react-router-dom";
import { Home, CheckSquare, Edit3, Users, Menu, CalendarDays } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/content", label: "Content", icon: Edit3 },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/more", label: "More", icon: Menu },
];

export function BottomNav() {
  return (
    <nav aria-label="Bottom Navigation" className="fixed bottom-0 inset-x-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <ul className="grid grid-cols-6">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-14 text-xs ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-0.5">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
