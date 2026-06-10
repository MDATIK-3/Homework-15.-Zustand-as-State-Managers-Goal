import { useShallow } from "zustand/react/shallow";
import { useTaskStore } from "../../store/useTaskStore";
import { selectStatusCounts } from "../../store/selectors";
import { StatItem } from "../ui/StatItem";
import "./Summary.css";

export function StatusSummary() {
  const counts = useTaskStore(useShallow(selectStatusCounts));
  const completion = counts.total === 0 ? 0 : Math.round((counts.done / counts.total) * 100);

  return (
    <div className="summary-block">
      <h3 className="summary-block__title">By status</h3>
      <div className="summary-block__grid">
        <StatItem label="Total" value={counts.total} />
        <StatItem label="To do" value={counts.todo} />
        <StatItem label="In progress" value={counts["in-progress"]} />
        <StatItem label="Done" value={counts.done} />
        <StatItem label="Completed" value={`${completion}%`} />
      </div>
    </div>
  );
}
