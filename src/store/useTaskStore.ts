import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { initialTasks } from "../data/initialTasks";
import type {
  PriorityFilterValue,
  SortOption,
  StatusFilterValue,
  Task,
  TaskDraft,
  TaskFilters,
  TaskStatus,
  ThemeMode,
} from "../types/task";

const statusCycle: TaskStatus[] = ["todo", "in-progress", "done"];

const defaultFilters: TaskFilters = {
  search: "",
  status: "all",
  priority: "all",
};

interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
  filters: TaskFilters;
  sortBy: SortOption;
  theme: ThemeMode;
  addTask: (draft: TaskDraft) => void;
  updateTask: (id: string, draft: TaskDraft) => void;
  deleteTask: (id: string) => void;
  cycleTaskStatus: (id: string) => void;
  selectTask: (id: string | null) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: StatusFilterValue) => void;
  setPriorityFilter: (priority: PriorityFilterValue) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
  toggleTheme: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      selectedTaskId: null,
      filters: defaultFilters,
      sortBy: "newest",
      theme: "light",

      addTask: (draft) =>
        set((state) => {
          const newTask: Task = {
            id: `task-${Date.now()}`,
            createdAt: Date.now(),
            ...draft,
          };
          return {
            tasks: [newTask, ...state.tasks],
            selectedTaskId: newTask.id,
          };
        }),

      updateTask: (id, draft) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...draft } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
        })),

      cycleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== id) return task;
            const nextIndex = (statusCycle.indexOf(task.status) + 1) % statusCycle.length;
            return { ...task, status: statusCycle[nextIndex] };
          }),
        })),

      selectTask: (id) => set({ selectedTaskId: id }),

      setSearch: (search) =>
        set((state) => ({ filters: { ...state.filters, search } })),

      setStatusFilter: (status) =>
        set((state) => ({ filters: { ...state.filters, status } })),

      setPriorityFilter: (priority) =>
        set((state) => ({ filters: { ...state.filters, priority } })),

      setSortBy: (sortBy) => set({ sortBy }),

      resetFilters: () => set({ filters: defaultFilters, sortBy: "newest" }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "task-board-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        filters: state.filters,
        sortBy: state.sortBy,
        theme: state.theme,
      }),
    }
  )
);
