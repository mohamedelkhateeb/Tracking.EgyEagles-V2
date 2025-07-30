import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useClientFetch } from '@/hooks/use-client-fetch';
import { useState } from 'react';
import { addUserToGroup, removeUserFromGroup } from '@/services/api/userService';
import LoadingButton from '@/components/ui/custom-buttons/loading-btn';
import toast from 'react-hot-toast';
import { Plus, Trash } from 'lucide-react';
const itemStyle = 'relative flex gap-5 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent justify-between';

type User = { Id: string; Name: string; Email: string; UserType: string; UserName: string };

export function GroupUserActionDialog({ group }: any) {
  const [user, setUser] = useState<User>({ Id: '', Name: '', Email: '', UserType: '', UserName: '' });
  const [open, setOpen] = useState(false);
  const { Data = [], isLoading }: { Data: any[]; isLoading: boolean } = useClientFetch('users/all?PageNumber=1&PageSize=100');

  const handleSubmit = async () => {
    const result: any = await addUserToGroup({ GroupId: group.Id || '123', User: { Id: user.Id, UserType: user.UserType, Email: user.Email } });
    if (result?.Success) {
      toast.success('User added successfully');
    } else {
      toast.error('Something went wrong, please try again later');
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={itemStyle}>
          Add User
          <Plus size={15} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-fit overflow-hidden sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User to the Group</DialogTitle>
          <DialogDescription>Make changes to a user here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {user.UserName || 'Select a User'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 sm:min-w-[360px]">
                <Command className="w-full">
                  <CommandInput placeholder="Search user..." className="h-9" />
                  <CommandList className="max-h-36 overflow-y-scroll">
                    {isLoading ? (
                      <CommandEmpty>Loading...</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {Data?.length > 0 ? (
                          Data.filter((u) => !u.InGroup).map((u) => (
                            <CommandItem
                              className="cursor-pointer"
                              key={u.Id}
                              value={u.UserName}
                              onSelect={() => {
                                setUser({ Id: u.Id, Name: u.Name, Email: u.Email, UserType: u.UserType, UserName: u.UserName });
                                setOpen(false);
                              }}
                            >
                              {u.UserName}
                            </CommandItem>
                          ))
                        ) : (
                          <CommandEmpty>No users found.</CommandEmpty>
                        )}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <LoadingButton content="Save changes" loader="Saving..." />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export function RemoveUserFromGroupDialog({ group }: { group: { Id: string; Users: any[] } }) {
  const [user, setUser] = useState<any>({ userId: '', groupId: '', UserName: '' });
  const [open, setOpen] = useState(false);
  const handleSubmit = async () => {
    const result = await removeUserFromGroup({ groupId: group.Id, userId: user.userId });
    if (result?.Success) {
      toast.success('User removed successfully');
    } else {
      toast.error(result?.Message || 'Something went wrong, please try again later');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={itemStyle}>
          Remove User
          <Trash size={15} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-fit overflow-hidden sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove User from the Group</DialogTitle>
          <DialogDescription>Make changes to a user here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {user.UserName || 'Select a User'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 sm:min-w-[360px]">
                <Command className="">
                  <CommandInput placeholder="Search user..." className="h-9" />
                  <CommandList className="overflow-y-scroll">
                    <CommandGroup>
                      {group.Users?.length > 0 ? (
                        group.Users.filter((u) => u.UserType !== 'GROUP_ADMIN').map((u) => (
                          <CommandItem
                            className="cursor-pointer"
                            key={u.Id}
                            value={u.UserName}
                            onSelect={() => {
                              setUser({ userId: u.Id, groupId: group.Id, UserName: u.UserName });
                              setOpen(false);
                            }}
                          >
                            {u.UserName}
                          </CommandItem>
                        ))
                      ) : (
                        <CommandEmpty>No users found.</CommandEmpty>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <LoadingButton content="Remove" loader="Removing..." />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
