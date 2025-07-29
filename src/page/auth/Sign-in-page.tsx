import { SelectLang } from "@/components/global/select-lang";
import { ToggleTheme } from "@/components/global/toggle-theme";
import Logo from "@/assets/logo-2.svg";
import SigninForm from "./signin-form";
import { useTranslation } from "react-i18next";

export default function SigninPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="fixed right-16 top-4 z-50 flex">
        <SelectLang />
      </div>
      <div className="fixed right-4 top-4 z-50 flex">
        <ToggleTheme />
      </div>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="flex h-full items-center p-4 lg:p-8">
          <div className="mx-auto flex w-[400px] flex-col justify-center space-y-6 rounded border px-6 py-10 shadow-2xl lg:border-0 lg:p-0 lg:shadow-none">
            <img src={Logo} alt="Logo" className="mx-auto w-[150px]" />
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("welcome")}
              </h1>
              <p className="text-sm text-muted-foreground">{t("enterEmail")}</p>
            </div>
            <SigninForm />
          </div>
        </div>
      </div>{" "}
    </>
  );
}
