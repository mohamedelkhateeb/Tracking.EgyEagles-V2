import { z } from "zod";

export const SignInSchema = (t: (key: string) => string) =>
  z.object({
    Email: z.string(),
    Password: z.string().min(1, t("passwordRequired")),
  });
