import { toast, ToastOptions } from "react-toastify";

export const CustomAlert = ({
  msg,
  type = "success",
}: {
  msg: string;
  type?: "success" | "error";
}) => {
  // const dir =
  //   typeof window !== "undefined"
  //     ? document?.documentElement?.dir || "ltr"
  //     : "ltr";

  const commonOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ariaLabel: "Email received",
    className: "text-lg font-bold py-7",
  };

  const content = <h1 style={{ fontFamily: "Cairo, sans-serif" }}>{msg}</h1>;

  return type === "error"
    ? toast.error(content, commonOptions)
    : toast.success(content, commonOptions);
};
