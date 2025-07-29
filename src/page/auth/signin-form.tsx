import InputField from "@/components/Fields/input-field";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-btn";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function SigninForm() {
  const { t } = useTranslation();

  return (
    <>
      <form>
        <div className="mb-4 flex flex-col gap-4">
          <InputField
            name="Email"
            label={t("email")}
            required
            type="text"
            placeholder={t("emailPlaceholder")}
          />
          <InputField
            name="Password"
            label={t("password")}
            required
            type="password"
            placeholder={t("passwordPlaceholder")}
          />
        </div>
        {/* <FormError error={errMsg} /> */}
        <Button size="sm" variant="link" asChild className={"mr-auto mt-0 p-0"}>
          <Link to="/forgot-password">{t("forgotPassword")}</Link>
        </Button>
        <LoadingButton content={t("signIn")} style=" w-full p-6 " />
      </form>
    </>
  );
}
