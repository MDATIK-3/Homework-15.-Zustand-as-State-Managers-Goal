import { useShallow } from "zustand/react/shallow";
import { useTaskStore } from "../../store/useTaskStore";
import { selectPriorityCounts } from "../../store/selectors";
import { StatItem } from "../ui/StatItem";
import "./Summary.css";

export function PrioritySummary() {
  const counts = useTaskStore(useShallow(selectPriorityCounts));

  return (
    <div className="summary-block">
      <h3 className="summary-block__title">By priority</h3>
      <div className="summary-block__grid">
        <StatItem label="High" value={counts.high} />
        <StatItem label="Medium" value={counts.medium} />
        <StatItem label="Low" value={counts.low} />
      </div>
    </div>
  );
}
