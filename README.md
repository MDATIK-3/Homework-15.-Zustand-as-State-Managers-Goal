# Task Board

A small single-page task board built with React, TypeScript, and Vite, using
**Zustand** as the shared state manager. The UI uses a soft green
glassmorphism style with a light/dark theme toggle.

## Project idea

A task board where you can browse a list of tasks, inspect the details of a
selected task, search and filter the list, create or edit tasks, and see
summary statistics derived from the task data.

## Chosen library: Zustand

Zustand was chosen for its single-store model with colocated state and
actions, simple selector-based subscriptions, and built-in `persist`
middleware.

## How to run the project

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

To create a production build:

```bash
npm run build
npm run preview
```

## State structure

### Shared state (Zustand store - `src/store/useTaskStore.ts`)

- `tasks` - the list of tasks (id, title, description, status, priority,
  createdAt). This is the core shared domain data: it is shown in the list,
  read by the details panel, and updated by the form.
- `selectedTaskId` - id of the task currently shown in the details panel.
- `filters` - `{ search, status, priority }`, the active search/filter
  criteria used by both the list and the toolbar.
- `sortBy` - the active sort order for the task list.
- `theme` - `"light" | "dark"`, the active color theme.
- **Actions** (colocated with state): `addTask`, `updateTask`, `deleteTask`,
  `cycleTaskStatus`, `selectTask`, `setSearch`, `setStatusFilter`,
  `setPriorityFilter`, `setSortBy`, `resetFilters`, `toggleTheme`.

### Persistence

The store uses Zustand's `persist` middleware with `partialize` to save only
`tasks`, `filters`, `sortBy`, and `theme` to `localStorage` under the key
`task-board-storage`. `selectedTaskId` is intentionally left out of
persistence - it is transient UI focus, not data worth restoring.

### Derived state (`src/store/selectors.ts`)

Nothing derived is stored - it is computed on read via selector functions:

- `selectFilteredTasks` - applies `filters` and `sortBy` to `tasks` to
  produce the list shown in the `TaskList` panel.
- `selectSelectedTask` - looks up the task object for `selectedTaskId`.
- `selectStatusCounts` - counts of tasks per status plus a completion
  percentage, shown in the "By status" summary block.
- `selectPriorityCounts` - counts of tasks per priority, shown in the "By
  priority" summary block (second derived summary).

### Local component state (not in Zustand)

- `TaskForm` keeps its draft fields (`title`, `description`, `status`,
  `priority`) in local `useState`. This is ephemeral form-input state that
  only matters while the user is typing - it is only written to the shared
  store when the form is submitted.
- `App` keeps a local `isEditing` flag that toggles between "create" and
  "edit" mode for the form. This is pure UI state with no reason to be
  shared or persisted.

## Features

- **List panel** - all tasks with status/priority badges and a quick
  status-cycle button.
- **Details panel** - full description, badges, and actions (cycle status,
  edit, delete) for the selected task.
- **Filter toolbar** - text search, status filter, priority filter, sort
  order, and a reset-filters action.
- **Create/edit form** - add a new task or edit the selected task, with
  required-title validation.
- **Summary panels** - derived counts by status (with completion %) and by
  priority.
- **Theme toggle** - light/dark soft-green glassmorphism theme, persisted
  across reloads.
#
