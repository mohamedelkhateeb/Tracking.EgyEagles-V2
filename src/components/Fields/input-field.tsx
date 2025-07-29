import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { LuAsterisk } from "react-icons/lu";

interface CustomInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: { [key: string]: [string] };
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: string;
  min?: string;
  defaultValue?: string | number | readonly string[];
  defaultChecked?: boolean;
  className?: string;
  labelStyle?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  placeholder,
  max,
  type,
  value,
  onChange,
  errors = {},
  required,
  minLength,
  maxLength,
  defaultValue,
  defaultChecked,
  labelStyle = "text-gray-700 font-medium",
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <p className={cn("text-sm font-semibold flex", labelStyle)}>
        {label}{" "}
        {required ? (
          <LuAsterisk className="text-red-500" size={14} />
        ) : (
          <span className="text-gray-500 font-medium"> {t("optional")}</span>
        )}
      </p>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value || ""}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        max={max}
        defaultValue={defaultValue}
        defaultChecked={defaultChecked}
        className={cn(
          "w-full py-6 rounded-xl outline-none",
          errors[name] && "border-red-500"
        )}
      />
      {errors && (
        <p className="mr-auto min-w-full text-md text-red-500">
          {errors[name]?.join("")}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
