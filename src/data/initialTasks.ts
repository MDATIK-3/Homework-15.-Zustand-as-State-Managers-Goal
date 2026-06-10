import type { Task } from "../types/task";

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design landing page hero section",
    description: "Sketch a soft green glassmorphism hero with a clear call to action.",
    status: "in-progress",
    priority: "high",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "task-2",
    title: "Set up project linting rules",
    description: "Configure ESLint and Prettier so the codebase stays consistent.",
    status: "done",
    priority: "low",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
  {
    id: "task-3",
    title: "Write API integration tests",
    description: "Cover the task creation and update endpoints with integration tests.",
    status: "todo",
    priority: "medium",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "task-4",
    title: "Plan sprint retrospective",
    description: "Collect feedback from the team and prepare discussion topics.",
    status: "todo",
    priority: "low",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "task-5",
    title: "Fix dashboard chart overflow bug",
    description: "Charts overflow their container on small screens, needs a responsive fix.",
    status: "in-progress",
    priority: "high",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "task-6",
    title: "Update onboarding documentation",
    description: "Add the new authentication flow to the onboarding guide.",
    status: "done",
    priority: "medium",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
];
