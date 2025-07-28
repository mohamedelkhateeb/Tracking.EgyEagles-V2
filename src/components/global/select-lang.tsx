import Saudi from "@/components/svgs/saudi-flag";
import USFlag from "@/components/svgs/us-flag";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SelectLang({
  style = "bg-white dark:bg-[#020817]",
}: {
  style?: string;
}) {
  const { i18n } = useTranslation();
  console.log(i18n);
  
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const queryClient = useQueryClient(); // Add this line

  console.log(i18n.language);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLang(value);
    queryClient.invalidateQueries(); // Refetch all queries with new lang
  };
  return (
    <Select dir="rtl" value={selectedLang} onValueChange={handleChange}>
      <SelectTrigger
        className={(cn("flex items-center justify-center gap-2"), style)}
      >
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ar">
            <div className="flex gap-3">
              <span>
                <Saudi />
              </span>
              <span>العربية</span>
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex gap-3">
              <span>
                <USFlag />
              </span>
              <span>English</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
