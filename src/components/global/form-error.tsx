import { AiOutlineExclamationCircle } from "react-icons/ai";

type FormErrorProps = {
  error?: string;
};

const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;
  return (
    <div className="flex my-4 items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <AiOutlineExclamationCircle className="h-4 w-4" />
      <p>{error}</p>
    </div>
  );
};

export default FormError;
