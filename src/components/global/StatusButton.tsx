import { GoDotFill } from "react-icons/go";
const StatusButton = ({ status }: { status: boolean }) => {
  const { name, color, bill } = status ? { name: "Active", color: " bg-lime-300 text-black", bill: "text-lime-600" } : { name: "InActive", color: " bg-red-300 text-black", bill: "text-red-600" };

  return (
    <div className={"flex gap-2 items-center py-1 px-2 rounded-md min-w-20" + color}>
      <GoDotFill className={bill} />
      <span>{name}</span>
    </div>
  );
};

export default StatusButton;
