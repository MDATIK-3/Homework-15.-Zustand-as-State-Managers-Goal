import "./SelectFilter.css";

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectFilterProps<T extends string> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}

export function SelectFilter<T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps<T>) {
  return (
    <label className="select-filter">
      <span className="select-filter__label">{label}</span>
      <select
        className="select-filter__control"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
