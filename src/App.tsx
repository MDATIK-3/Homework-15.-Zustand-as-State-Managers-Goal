import { useEffect, useState } from "react";
import { useTaskStore } from "./store/useTaskStore";
import { selectSelectedTask } from "./store/selectors";
import { AppHeader } from "./components/layout/AppHeader";
import { FilterToolbar } from "./components/filters/FilterToolbar";
import { TaskList } from "./components/list/TaskList";
import { TaskDetails } from "./components/details/TaskDetails";
import { TaskForm } from "./components/form/TaskForm";
import { SummaryPanel } from "./components/summary/SummaryPanel";
import "./App.css";

function App() {
  const theme = useTaskStore((state) => state.theme);
  const selectedTask = useTaskStore(selectSelectedTask);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const editingTask = selectedTask?.id === editingTaskId ? selectedTask : null;

  return (
    <div className="app">
      <AppHeader />
      <FilterToolbar />
      <div className="app__layout">
        <TaskList />
        <div className="app__center">
          <TaskDetails onEdit={() => setEditingTaskId(selectedTask?.id ?? null)} />
          <TaskForm
            key={editingTask?.id ?? "new"}
            editingTask={editingTask}
            onDone={() => setEditingTaskId(null)}
          />
        </div>
        <SummaryPanel />
      </div>
    </div>
  );
}

export default App;
