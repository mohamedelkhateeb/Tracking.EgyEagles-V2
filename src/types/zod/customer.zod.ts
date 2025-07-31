import { z } from "zod";

export const getCustomerSchema = (t: (key: string) => string) =>
  z.object({
    CustomerName: z
      .string()
      .min(3, { message: t("errors.customerNameMin") })
      .max(50, { message: t("errors.customerNameMax") }),
    EmailAddress: z.string().email({ message: t("errors.emailInvalid") }),
    PhoneNumber: z
      .string()
      .regex(/^\+9665[0-9]{8}$/, {
        message: t("errors.phoneInvalid"),
      })
      .nonempty({ message: t("errors.phoneRequired") }),
    CustomerType: z
      .number({ invalid_type_error: t("errors.customerTypeRequired") })
      .refine((val) => val === 3 || val === 4, {
        message: t("errors.customerTypeInvalid"),
      }),
    City: z.string().min(1, { message: t("errors.cityRequired") }),
    ZipCode: z.string().min(1, { message: t("errors.zipCodeRequired") }),
    Country: z.string().min(1, { message: t("errors.countryRequired") }),
    IdentityNumber: z
      .string()
      .length(10, { message: t("errors.identityLength") })
      .refine((val) => val.startsWith("10") || val.startsWith("700"), {
        message: t("errors.identityPrefix"),
      }),
    UpLevelId: z.string().min(1, { message: t("errors.upLevelRequired") }),
    FirstName: z
      .string()
      .nonempty({ message: t("errors.firstNameRequired") })
      .min(3, { message: t("errors.firstNameMin") })
      .max(25, { message: t("errors.firstNameMax") }),
    LastName: z
      .string()
      .nonempty({ message: t("errors.lastNameRequired") })
      .min(3, { message: t("errors.lastNameMin") })
      .max(25, { message: t("errors.lastNameMax") }),
    Email: z
      .string()
      .nonempty({ message: t("errors.adminEmailRequired") })
      .email({ message: t("errors.adminEmailInvalid") }),
    Password: z
      .string()
      .nonempty({ message: t("errors.passwordRequired") })
      .min(6, { message: t("errors.passwordMin") })
      .regex(/[A-Z]/, { message: t("errors.passwordUppercase") })
      .regex(/[a-z]/, { message: t("errors.passwordLowercase") })
      .regex(/\d/, { message: t("errors.passwordDigit") })
      .regex(/[\W_]/, { message: t("errors.passwordSpecial") }),
  });
