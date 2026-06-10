import type { TaskPriority, TaskStatus } from "../../types/task";
import "./Badge.css";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge badge--status-${status}`}>{statusLabels[status]}</span>;
}

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <span className={`badge badge--priority-${priority}`}>{priorityLabels[priority]}</span>;
}
