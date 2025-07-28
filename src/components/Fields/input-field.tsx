// InputField.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputFieldProps {
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
}

const InputField: React.FC<InputFieldProps> = ({ name, label, placeholder, max, type, value, onChange, errors = {}, required, minLength, maxLength, defaultValue, defaultChecked }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">
        {label} {required && <span className="text-sm text-red-500">*</span>}
      </p>
      <Input
        name={name}
        className={cn('w-full py-5 outline-none', errors[name] && 'border-red-500')}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        max={max}
        defaultValue={defaultValue}
        defaultChecked={defaultChecked}
      />
      {errors && <p className="mr-auto min-w-full text-xs text-red-500">{errors[name]?.join('')}</p>}
    </div>
  );
};

export default InputField;
