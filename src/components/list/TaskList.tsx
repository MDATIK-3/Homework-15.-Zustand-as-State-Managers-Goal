import { useShallow } from "zustand/react/shallow";
import { useTaskStore } from "../../store/useTaskStore";
import { selectFilteredTasks } from "../../store/selectors";
import { EmptyState } from "../ui/EmptyState";
import { TaskListItem } from "./TaskListItem";
import "./TaskList.css";

export function TaskList() {
  const tasks = useTaskStore(useShallow(selectFilteredTasks));
  const selectedTaskId = useTaskStore((state) => state.selectedTaskId);
  const selectTask = useTaskStore((state) => state.selectTask);
  const cycleTaskStatus = useTaskStore((state) => state.cycleTaskStatus);

  return (
    <section className="task-list glass-panel">
      <h2 className="panel-title">Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks match your filters"
          description="Try adjusting the search text or clearing the active filters."
        />
      ) : (
        <ul className="task-list__items">
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              isSelected={task.id === selectedTaskId}
              onSelect={() => selectTask(task.id)}
              onCycleStatus={() => cycleTaskStatus(task.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
