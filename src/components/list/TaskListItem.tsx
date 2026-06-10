import type { Task } from "../../types/task";
import { PriorityBadge, StatusBadge } from "../ui/Badge";
import "./TaskListItem.css";

interface TaskListItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  onCycleStatus: () => void;
}

export function TaskListItem({ task, isSelected, onSelect, onCycleStatus }: TaskListItemProps) {
  return (
    <li className={`task-item ${isSelected ? "task-item--selected" : ""}`}>
      <button className="task-item__main" onClick={onSelect}>
        <span className="task-item__title">{task.title}</span>
        <span className="task-item__badges">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </span>
      </button>
      <button
        className="task-item__cycle"
        onClick={(event) => {
          event.stopPropagation();
          onCycleStatus();
        }}
        title="Cycle status"
      >
        ↻
      </button>
    </li>
  );
}
