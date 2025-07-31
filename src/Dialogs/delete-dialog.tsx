import React, { useRef } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import LoadingButton from '@/components/ui/loading-btn';

export type Props<T> = {
  asyncAction: (data: any) => Promise<any>;
  data: T;
  description: string;
  title: string | React.ReactNode;
  btnLoader: string;
  trigger?: React.ReactNode | string;
  submitText?: string | React.ReactNode;
  icon?: React.ReactNode;
  item?: string;
  submitStyle?: string;
};

const GenericDialog = <T extends Record<string, any>>({ asyncAction, submitStyle, data, trigger, btnLoader, submitText = 'Submit', title, description, icon, item }: Props<T>) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleConfirm = async () => {
    // const result = await asyncAction(data.Id);
    // console.log(result);

  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left flex items-center justify-between">{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center gap-5">
          {icon}
          <div>
            <AlertDialogTitle className="flex items-center">{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={buttonRef}>Cancel</AlertDialogCancel>
          <form action={handleConfirm}>
            <LoadingButton style={submitStyle} content={submitText} loader={btnLoader} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GenericDialog;
