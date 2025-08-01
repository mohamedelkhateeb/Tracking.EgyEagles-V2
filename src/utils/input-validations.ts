import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PriceErrors {
  min?: string;
  max?: string;
  range?: string;
}
export const handleArabicInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const arabicRegex = /^[\u0600-\u06FF\s]*$/;
  if (!arabicRegex.test(e.target.value)) {
    e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
  }
};

export const handleEnglishInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const englishRegex = /^[A-Za-z\s]*$/;
  if (!englishRegex.test(e.target.value)) {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  }
};

export const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement;
  if (input.value.length > 9) {
    input.value = input.value.slice(0, 9);
  }
};

export const handleNumberPriceInput = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const input = e.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9.]/g, "");
};

export const usePriceValidation = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<PriceErrors>({});

  const validatePrice = (min: string | undefined, max: string | undefined) => {
    const minPrice = parseFloat(min || "");
    const maxPrice = parseFloat(max || "");
    const newErrors: PriceErrors = {};

    if (!min || isNaN(minPrice)) {
      newErrors.min = t("minPriceRequired");
    }
    if (!max || isNaN(maxPrice)) {
      newErrors.max = t("maxPriceRequired");
    }
    if (minPrice >= maxPrice && min && max) {
      newErrors.range = t("minPriceGreaterThanOrEqualMax");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  const resetErrors = () => setErrors({});

  return { errors, validatePrice, resetErrors };
};

export const validatePhoneNumber = (
  value: string,
  t: (key: string) => string
) => {
  if (value.startsWith("05") && value.length !== 10) {
    return t("startsWith05");
  }
  if (value.startsWith("5") && !value.startsWith("05") && value.length !== 9) {
    return t("startsWith5");
  }
  if (!value.startsWith("05") && !value.startsWith("5")) {
    return t("invalid");
  }
  return null;
};

export const handlePhoneInputChange = (
  e: React.FormEvent<HTMLInputElement>,
  t: (key: string) => string,
  setErrMsg: React.Dispatch<React.SetStateAction<string>>
) => {
  const input = e.currentTarget;
  input.value = input.value.replace(/\D/g, "");
  const errorMessage = validatePhoneNumber(input.value, t);
  setErrMsg(errorMessage || "");
  if (input.value.startsWith("05") && input.value.length === 10) {
    input.value = input.value.slice(0, 10);
  } else if (
    input.value.startsWith("5") &&
    !input.value.startsWith("05") &&
    input.value.length === 9
  ) {
    input.value = input.value.slice(0, 9);
  }
};
