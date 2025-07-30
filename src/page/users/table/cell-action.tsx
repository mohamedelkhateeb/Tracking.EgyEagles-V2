'use client';
import GenericDialog from '@/components/Dialogs/delete-dialog';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { GrFormAdd } from 'react-icons/gr';

import { Link, useRouter } from 'next/navigation';
import { deleteUser } from '@/services/api/userService';
import { User } from '@/types/models/user.model';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdOutlineMoreTime, MdPostAdd } from 'react-icons/md';
interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }: { data: User }) => {
  const router = useRouter();
  const itemStyle = 'relative flex gap-5 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent justify-between';
  return (
    <>
      <Menubar className="flex justify-center border-none shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent align="center">
            <h1 className="text-md mx-3 my-1 font-bold"> Actions</h1>
            <MenubarSeparator />
            <div className={itemStyle} onClick={() => router.push(`/users/${data.Id}`)}>
              Update User
              <MenubarShortcut>
                <Edit size={15} />
              </MenubarShortcut>
            </div>
            <div className={itemStyle}>
              <GenericDialog
                icon={<FaRegTrashCan size={40} className="flex justify-center rounded-md bg-red-200 px-2 py-2 text-sm text-red-500 hover:bg-red-200 hover:text-red-600" />}
                trigger="Delete User"
                submitText="Delete"
                btnLoader="Deleting..."
                asyncAction={deleteUser}
                data={data}
                title="Confirm Delete"
                description={`Are you sure you want to delete (${data.UserName})  ? This action cannot be undone.`}
                item="User"
                submitStyle="bg-red-600 hover:bg-red-700"
              />
              <MenubarShortcut>
                <Trash size={15} />
              </MenubarShortcut>
            </div>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Permissions</MenubarSubTrigger>
              <MenubarSubContent>
                <Link prefetch={true} href={`/users/${data.Id}/permissions?type=add`} className={itemStyle}>
                  Add Permissions
                  <MenubarShortcut>
                    <GrFormAdd size={18} />
                  </MenubarShortcut>
                </Link>
                <Link href={`/users/${data.Id}/permissions?type=temp`} className={itemStyle}>
                  Temporary Permissions
                  <MenubarShortcut>
                    <MdOutlineMoreTime size={18} />
                  </MenubarShortcut>
                </Link>
                <Link href={`/users/${data.Id}/permissions?type=remove`} className={itemStyle}>
                  Remove Permissions
                  <MenubarShortcut>
                    <Trash size={15} />
                  </MenubarShortcut>
                </Link>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
