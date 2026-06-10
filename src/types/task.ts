export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;
}

export type StatusFilterValue = TaskStatus | "all";

export type PriorityFilterValue = TaskPriority | "all";

export type SortOption = "newest" | "oldest" | "title" | "priority";

export type ThemeMode = "light" | "dark";

export interface TaskFilters {
  search: string;
  status: StatusFilterValue;
  priority: PriorityFilterValue;
}

export interface TaskDraft {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
