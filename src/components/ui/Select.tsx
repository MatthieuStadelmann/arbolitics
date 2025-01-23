import { cn } from "@/utils/cn";

interface SelectProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  placeholder?: string;
  className?: string;
}
export function Select<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  className,
}: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => {
        const newValue = (
          typeof value === "number" ? Number(e.target.value) : e.target.value
        ) as T;
        onChange(newValue);
      }}
      className={cn("rounded-md border border-gray-200 p-2", className)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
