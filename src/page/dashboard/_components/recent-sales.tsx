import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const trackingData = [
  {
    avatar: '/avatars/01.png',
    fallback: 'TK',
    name: 'Toyota Corolla',
    info: 'Last seen at Downtown, NY',
    status: 'Active',
  },
  {
    avatar: '/avatars/02.png',
    fallback: 'FH',
    name: 'Ford Hatchback',
    info: 'Parked near Central Park',
    status: 'Inactive',
  },
  {
    avatar: '/avatars/03.png',
    fallback: 'BM',
    name: 'BMW X5',
    info: 'In transit on Highway 85',
    status: 'Active',
  },
  {
    avatar: '/avatars/04.png',
    fallback: 'HD',
    name: 'Honda Civic',
    info: 'Last ping 2 hours ago',
    status: 'Inactive',
  },
  {
    avatar: '/avatars/05.png',
    fallback: 'TS',
    name: 'Tesla Model 3',
    info: 'Charging station, NY',
    status: 'Active',
  },
];

export function RecentTracking() {
  return (
    <div className="space-y-8">
      {trackingData.map((vehicle, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={vehicle.avatar} alt={`${vehicle.name} Avatar`} />
            <AvatarFallback>{vehicle.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{vehicle.name}</p>
            <p className="text-sm text-muted-foreground">{vehicle.info}</p>
          </div>
          <div
            className={`ml-auto font-medium ${vehicle.status === 'Active' ? 'w-24 text-center rounded-lg border bg-green-500 px-3 py-1 text-white' : 'w-24 text-center rounded-lg border bg-red-500 px-3 py-1 text-white'}`}
          >
            {vehicle.status}
          </div>
        </div>
      ))}
    </div>
  );
}
