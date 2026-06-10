import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import type {
  Task,
  TaskDraft,
  TaskPriority,
  TaskStatus,
} from "../../types/task";
import { Button } from "../ui/Button";
import "./TaskForm.css";

interface TaskFormProps {
  editingTask: Task | null;
  onDone: () => void;
}

const emptyDraft: TaskDraft = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
};

export function TaskForm({ editingTask, onDone }: TaskFormProps) {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [draft, setDraft] = useState<TaskDraft>(() =>
    editingTask
      ? {
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          priority: editingTask.priority,
        }
      : emptyDraft,
  );
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (draft.title.trim().length === 0) {
      setTitleError(true);
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, draft);
    } else {
      addTask(draft);
    }

    setDraft(emptyDraft);
    onDone();
  };

  const handleCancel = () => {
    setDraft(emptyDraft);
    onDone();
  };

  return (
    <section className="task-form glass-panel">
      <h2 className="panel-title">{editingTask ? "Edit task" : "New task"}</h2>
      <form className="task-form__fields" onSubmit={handleSubmit}>
        <label className="task-form__field">
          <span>Title</span>
          <input
            type="text"
            value={draft.title}
            onChange={(event) => {
              setDraft({ ...draft, title: event.target.value });
              setTitleError(false);
            }}
            placeholder="What needs to be done?"
          />
          {titleError && (
            <span className="task-form__error">Title is required.</span>
          )}
        </label>

        <label className="task-form__field">
          <span>Description</span>
          <textarea
            value={draft.description}
            onChange={(event) =>
              setDraft({ ...draft, description: event.target.value })
            }
            placeholder="Add more context..."
            rows={3}
          />
        </label>

        <div className="task-form__row">
          <label className="task-form__field">
            <span>Status</span>
            <select
              value={draft.status}
              onChange={(event) =>
                setDraft({ ...draft, status: event.target.value as TaskStatus })
              }
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <label className="task-form__field">
            <span>Priority</span>
            <select
              value={draft.priority}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  priority: event.target.value as TaskPriority,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <div className="task-form__actions">
          <Button type="submit">
            {editingTask ? "Save changes" : "Add task"}
          </Button>
          {editingTask && (
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
