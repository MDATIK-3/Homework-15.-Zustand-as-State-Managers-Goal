import { StatusSummary } from "./StatusSummary";
import { PrioritySummary } from "./PrioritySummary";
import "./Summary.css";

export function SummaryPanel() {
  return (
    <section className="summary-panel glass-panel">
      <h2 className="panel-title">Summary</h2>
      <StatusSummary />
      <PrioritySummary />
    </section>
  );
}
