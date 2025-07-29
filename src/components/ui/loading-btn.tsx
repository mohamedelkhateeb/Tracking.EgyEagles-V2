import { Button } from "./button";
import { FiLoader } from "react-icons/fi";


function LoadingButton({
  content,
  style,
  loader,
  disabled,
  isPending = false,
  onClick,
}: {
  content: string | React.ReactNode;
  style?: string;
  loader?: string;
  disabled?: boolean;
  isPending?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button  onClick={onClick} type="submit" className={style} disabled={disabled || isPending}>
      {isPending ? (
        loader ? (
          <div className="flex items-center justify-center gap-2">
            <FiLoader className="h-10 w-10 animate-spin text-xl" /> {loader}
          </div>
        ) : (
          <FiLoader className="h-10 w-10 animate-spin text-xl" />
        )
      ) : (
        <span>{content}</span>
      )}
    </Button>
  );
}

export default LoadingButton;
