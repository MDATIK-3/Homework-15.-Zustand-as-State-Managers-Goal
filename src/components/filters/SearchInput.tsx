import "./SearchInput.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="search-input">
      <span className="search-input__label">Search</span>
      <input
        className="search-input__control"
        type="text"
        placeholder="Search by title or description..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
