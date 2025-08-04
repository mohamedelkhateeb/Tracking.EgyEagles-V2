// SelectField.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { LuAsterisk } from "react-icons/lu";

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
  labelStyle?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  name,
  label,
  options,
  value,
  onChange,
  errors = {},
  labelStyle = "text-gray-700 font-medium",
  required,
  defaultValue,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <p className={cn(labelStyle, " font-semibold text-md flex")}>
        {label}
        {required ? (
          <LuAsterisk className="text-red-500" size={14} />
        ) : (
          <span className="text-gray-500 px-1 font-medium">
            {" "}
            {t("optional")}{" "}
          </span>
        )}
      </p>
      <select
        name={name}
        onChange={onChange}
        className={cn(
          "flex  w-full items-center justify-between shadow-sm border bg-background px-3 rounded-md cursor-pointer py-3 text-md outline-none",
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
        <p className="mr-auto min-w-full text-md text-red-500">
          {errors[name]?.join("")}
        </p>
      )}
    </div>
  );
};

export default SelectField;
