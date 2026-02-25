import { type FC, type ChangeEvent, useRef } from "react";

type SearchbarProps = {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Searchbar: FC<SearchbarProps> = ({
  className = "",
  value,
  placeholder = "Search...",
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      {/* Search Icon */}
      <span className="absolute left-3 text-gray-500 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </span>

      {/* Input */}
      <input
        className="w-full rounded-lg bg-gray-900 py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 transition-all duration-200 focus:ring-2 focus:ring-amber-400/60"
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {/* Clear Button */}
      {value && (
        <button
        className="absolute right-2.5 flex items-center justify-center w-5 h-5 rounded-full text-gray-500 text-xs transition-colors duration-150 hover:text-amber-400"
        aria-label="Clear search"
        onClick={handleClear}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Searchbar;
