import StatusButton from "@/components/global/StatusButton";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CustomAlert } from "@/components/ui/custom-alert";
import LoadingButton from "@/components/ui/loading-btn";
import httpService from "@/lib/httpService";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { RiExchange2Line } from "react-icons/ri";

// types.ts
export interface StatusProps {
  data: {
    item: string;
    placeholder: string;
  };
  row: any;
  endpoint: string;
}

const StatusDialog = ({ data, row, endpoint }: StatusProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => httpService.get({ url: endpoint }),
    onSuccess: (res) => {
      console.log(res);
      buttonRef.current?.click();
      CustomAlert({ msg: "Status Changed Successfully", type: "success" });
    },
    onError: () => {
      CustomAlert({ msg: "Something went wrong", type: "error" });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger
        // disabled={
        //   !table?.options.renderFallbackValue().Permissions?.changeStatus ||
        //   row.original?.WaslId !== null
        // }
        title={
          row.original?.WaslId !== null
            ? `Can't Change Status Because This ${data.item} affiliated to wasl! `
            : "Click to Change Status"
        }
      >
        <StatusButton status={row.original?.IsActive} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center gap-5">
          <RiExchange2Line
            size={40}
            className="flex justify-center rounded-md bg-green-200 px-2 py-2 text-sm text-green-500 hover:bg-green-200 hover:text-green-600"
          />
          <div>
            <AlertDialogTitle className="flex items-center">
              Change Status
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change {data.item} status?
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={buttonRef}>Cancel</AlertDialogCancel>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            <LoadingButton
              isPending={isPending}
              style="flex items-center rounded-md justify-center gap-2 text-white"
              content="Yes, Change"
              loader="Changing..."
            />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusDialog;
