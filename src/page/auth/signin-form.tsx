import InputField from "@/components/Fields/input-field";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-btn";
import { useTranslation } from "react-i18next";
import httpService from "@/lib/httpService";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthResponseData, Response } from "@/types/api.type";
import FormError from "@/components/global/form-error";
import { SignInSchema } from "@/types/zod/auth.zod";

export default function SigninForm() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({ Password: "", Email: "" });
  const { t } = useTranslation();
  const schema = SignInSchema(t);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { Password: string; Email: string }) =>
      httpService.post<Response<AuthResponseData>>({
        url: "/authentication/login",
        data: data,
      }),
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      setErrMsg(result.error.errors[0].message);
      return;
    }
    mutate(data, {
      onSuccess: (res) => {
        navigate("/");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error);
        setErrMsg(error?.response?.data?.Message as string);
      },
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-4 flex flex-col gap-4">
          <InputField
            value={data.Email}
            onChange={(e) => setData({ ...data, Email: e.target.value })}
            name="Email"
            label={t("email")}
            required
            type="text"
            placeholder={t("emailPlaceholder")}
          />
          <InputField
            value={data.Password}
            onChange={(e) => setData({ ...data, Password: e.target.value })}
            name="Password"
            label={t("password")}
            required
            type="password"
            placeholder={t("passwordPlaceholder")}
          />
        </div>
        <FormError error={errMsg} />
        <Button size="sm" variant="link" asChild className={"mr-auto mt-0 p-0"}>
          <Link to="/forgot-password">{t("forgotPassword")}</Link>
        </Button>
        <LoadingButton
          isPending={isPending}
          content={t("signIn")}
          loader={t("signIn")}
          style=" w-full p-6 "
        />
      </form>
    </>
  );
}
