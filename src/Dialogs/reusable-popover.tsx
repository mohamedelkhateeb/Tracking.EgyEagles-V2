import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PopoverProps {
  children: React.ReactNode;
  trigger?: string | React.ReactNode;
  description?: string;
  title: string;
  saveBtn?: string;
  defaultOpen?: boolean;
  style?: string;
  dataOpen?: boolean;
  triggerStyle?: string;
}

export default function CustomPopover({ children, trigger, description, title, defaultOpen, style, dataOpen, triggerStyle }: PopoverProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={style}>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
