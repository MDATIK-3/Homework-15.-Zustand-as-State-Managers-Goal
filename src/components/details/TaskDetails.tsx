import { useTaskStore } from "../../store/useTaskStore";
import { selectSelectedTask } from "../../store/selectors";
import { PriorityBadge, StatusBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import "./TaskDetails.css";

interface TaskDetailsProps {
  onEdit: () => void;
}

export function TaskDetails({ onEdit }: TaskDetailsProps) {
  const task = useTaskStore(selectSelectedTask);
  const cycleTaskStatus = useTaskStore((state) => state.cycleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <section className="task-details glass-panel">
      <h2 className="panel-title">Details</h2>
      {task === null ? (
        <EmptyState
          title="No task selected"
          description="Select a task from the list to see its full description and actions."
        />
      ) : (
        <div className="task-details__content">
          <h3 className="task-details__title">{task.title}</h3>
          <div className="task-details__badges">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
          <p className="task-details__description">{task.description}</p>
          <p className="task-details__meta">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <div className="task-details__actions">
            <Button variant="ghost" onClick={() => cycleTaskStatus(task.id)}>
              Cycle status
            </Button>
            <Button variant="ghost" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
