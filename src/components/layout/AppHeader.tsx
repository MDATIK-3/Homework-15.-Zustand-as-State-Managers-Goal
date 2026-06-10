import { useTaskStore } from "../../store/useTaskStore";
import { Button } from "../ui/Button";
import "./AppHeader.css";

export function AppHeader() {
  const theme = useTaskStore((state) => state.theme);
  const toggleTheme = useTaskStore((state) => state.toggleTheme);

  return (
    <header className="app-header glass-panel">
      <div className="app-header__text">
        <h1 className="app-header__title">Task Board</h1>
        <p className="app-header__subtitle">
          Plan, filter, and track your work
        </p>
      </div>
      <Button variant="ghost" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
      </Button>
    </header>
  );
}
