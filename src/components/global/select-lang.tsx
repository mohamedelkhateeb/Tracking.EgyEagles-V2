import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

import USFlag from "../svgs/us-flag";
import Saudi from "../svgs/saudi-flag";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function SelectLang({ style }: { style?: string }) {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const queryClient = useQueryClient(); // Add this line

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLang(value);
    queryClient.invalidateQueries(); // Refetch all queries with new lang
  };

  return (
    <Select dir="rtl" value={selectedLang} onValueChange={handleChange}>
      <SelectTrigger className={cn("flex items-center justify-center", style)}>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ar">
            <div className="flex gap-3 items-center">
              <Saudi />
              <span>العربية</span>
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex gap-3 items-center">
              <USFlag />
              <span>English</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
