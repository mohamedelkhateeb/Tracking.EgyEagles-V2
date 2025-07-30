// SelectField.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: Option[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors?: { [key: string]: [string] };
  required?: boolean;
  placeholder: string;
  defaultValue?: string | number;
}

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  name,
  label,
  options,
  value,
  onChange,
  errors = {},
  required,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">
        {label} {required && <span className="text-sm text-red-500">*</span>}
      </p>
      <select
        name={name}
        onChange={onChange}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
          errors[name] && "border-red-500"
        )}
        value={value}
        defaultValue={defaultValue}
      >
        <option value="">{placeholder}</option>
        {options?.map((option, index) => (
          <option key={index} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
      {errors && (
        <p className="mr-auto min-w-full text-xs text-red-500">
          {errors[name]?.join("")}
        </p>
      )}
    </div>
  );
};

export default SelectField;
