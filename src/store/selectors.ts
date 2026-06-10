import type { Task, TaskPriority } from "../types/task";
import type { useTaskStore } from "./useTaskStore";

type TaskState = ReturnType<typeof useTaskStore.getState>;

const priorityWeight: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const selectFilteredTasks = (state: TaskState): Task[] => {
  const { search, status, priority } = state.filters;
  const query = search.trim().toLowerCase();

  const filtered = state.tasks.filter((task) => {
    const matchesSearch =
      query.length === 0 ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sorted = [...filtered];
  switch (state.sortBy) {
    case "oldest":
      sorted.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "priority":
      sorted.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
      break;
    case "newest":
    default:
      sorted.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }

  return sorted;
};

export const selectSelectedTask = (state: TaskState): Task | null =>
  state.tasks.find((task) => task.id === state.selectedTaskId) ?? null;

export interface StatusCounts {
  total: number;
  todo: number;
  "in-progress": number;
  done: number;
}

export const selectStatusCounts = (state: TaskState): StatusCounts => {
  const counts: StatusCounts = { total: 0, todo: 0, "in-progress": 0, done: 0 };
  for (const task of state.tasks) {
    counts.total += 1;
    counts[task.status] += 1;
  }
  return counts;
};

export type PriorityCounts = Record<TaskPriority, number>;

export const selectPriorityCounts = (state: TaskState): PriorityCounts => {
  const counts: PriorityCounts = { low: 0, medium: 0, high: 0 };
  for (const task of state.tasks) {
    counts[task.priority] += 1;
  }
  return counts;
};
