'use client';
import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';

import { User } from '@/types/models/user.model';
import { MoreHorizontal, Plus, Trash } from 'lucide-react';
import { GroupUserActionDialog, RemoveUserFromGroupDialog } from '../form/user-group-actions';
interface CellActionProps {
  data: any;
}
export const CellAction: React.FC<CellActionProps> = ({ data }: { data: User }) => {
  const itemStyle = 'relative flex gap-5 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent justify-between';
  return (
    <>
      <Menubar className="flex justify-center border-none bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer border-none">
            <MoreHorizontal className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent align="center">
            <h1 className="text-md mx-3 my-1 font-bold"> Actions</h1>
            <MenubarSeparator />
            <GroupUserActionDialog group={data} />
            <RemoveUserFromGroupDialog group={data as any} />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
