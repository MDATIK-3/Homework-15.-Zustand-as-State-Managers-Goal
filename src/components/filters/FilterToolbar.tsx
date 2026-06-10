import { useTaskStore } from "../../store/useTaskStore";
import type {
  PriorityFilterValue,
  SortOption,
  StatusFilterValue,
} from "../../types/task";
import { Button } from "../ui/Button";
import { SearchInput } from "./SearchInput";
import { SelectFilter } from "./SelectFilter";
import "./FilterToolbar.css";

const statusOptions: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];

const priorityOptions: { value: PriorityFilterValue; label: string }[] = [
  { value: "all", label: "All priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title (A-Z)" },
  { value: "priority", label: "Priority (high first)" },
];

export function FilterToolbar() {
  const search = useTaskStore((state) => state.filters.search);
  const status = useTaskStore((state) => state.filters.status);
  const priority = useTaskStore((state) => state.filters.priority);
  const sortBy = useTaskStore((state) => state.sortBy);

  const setSearch = useTaskStore((state) => state.setSearch);
  const setStatusFilter = useTaskStore((state) => state.setStatusFilter);
  const setPriorityFilter = useTaskStore((state) => state.setPriorityFilter);
  const setSortBy = useTaskStore((state) => state.setSortBy);
  const resetFilters = useTaskStore((state) => state.resetFilters);

  return (
    <div className="filter-toolbar glass-panel">
      <SearchInput value={search} onChange={setSearch} />
      <SelectFilter label="Status" value={status} options={statusOptions} onChange={setStatusFilter} />
      <SelectFilter label="Priority" value={priority} options={priorityOptions} onChange={setPriorityFilter} />
      <SelectFilter label="Sort by" value={sortBy} options={sortOptions} onChange={setSortBy} />
      <Button variant="ghost" onClick={resetFilters} className="filter-toolbar__reset">
        Reset filters
      </Button>
    </div>
  );
}
