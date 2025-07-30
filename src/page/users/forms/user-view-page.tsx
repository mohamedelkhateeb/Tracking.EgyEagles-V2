import { ScrollArea } from '@/components/ui/scroll-area';
import UserForm from './user-form';
import { getPermissions, getRoles } from '@/services/api/RoleService';
import { getUser } from '@/services/api/userService';

const breadcrumbItems = [
  { title: 'User', link: '/user' },
  { title: 'Create', link: '/user/new' },
];

export default async function UserViewPage({ params }: { params: { user: string } }) {
  const roles = await getRoles();
  const permissions = await getPermissions();
  let user = null;
  if (params?.user != 'new' && params?.user != 'group-admin') {
    const userId = params?.user;
    user = await getUser(userId);
  }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <UserForm roles={roles?.Data} permissions={permissions?.Data} userId={params.user} initalData={user} />
      </div>
    </ScrollArea>
  );
}
