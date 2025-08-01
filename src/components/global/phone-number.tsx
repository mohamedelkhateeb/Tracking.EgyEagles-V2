import { cn } from "@/lib/utils";
import Saudi from "../svgs/saudi-flag";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { handlePhoneInputChange } from "@/utils/input-validations";
import { useState } from "react";

const PhoneNumber = ({
  value,
  onChange,
  error,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => {
  const { t } = useTranslation();
  const [errMsg, setErrMsg] = useState<string | undefined>(error);
  return (
    <>
      <div
        dir="ltr"
        className={` flex items-center rounded-lg border border-borderColor bg-white px-6 py-3 shadow-sm ${errMsg ? "border-red-500" : ""}`}
      >
        <span className="flex items-center gap-2 border-r-2 pr-2 text-lg xl:text-xl">
          <Saudi />
          +966
        </span>
        <Input
          value={value}
          className={cn(
            "border-0 text-lg shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-lg"
          )}
          name="phone"
          type="number"
          placeholder={" 50 000 0000"}
          onInput={(e) => handlePhoneInputChange(e, t, setErrMsg)}
          onChange={onChange}
        />
      </div>
      {errMsg && <p className="text-md text-red-500">{errMsg}</p>}
    </>
  );
};

export default PhoneNumber;
