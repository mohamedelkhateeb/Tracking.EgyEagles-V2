import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import httpService from "@/lib/httpService";
import { useQuery } from "@tanstack/react-query";

export type Permissions = {
  GroupName: string;
  Permissions: { ClaimValue: string; ClaimType: string }[];
  Id: number;
};

export const PermissionCell = ({
  Permission,
  data,
  setData,
}: {
  Permission: { ClaimValue: string; ClaimType: string }[];
  data: any;
  setData: any;
}) => {
  return Permission.map((permission, index) => (
    <div key={index} className="flex items-center space-x-2">
      <Checkbox
        id={permission?.ClaimValue}
        onCheckedChange={() => {
          const isSelected = data?.Claims.some(
            (claim: string) => claim == permission.ClaimValue
          );
          setData({
            ...data,
            Claims: isSelected
              ? data?.Claims.filter(
                  (claim: string) => claim !== permission.ClaimValue
                )
              : [...data?.Claims, permission.ClaimValue],
          });
        }}
        checked={data?.Claims.includes(permission.ClaimValue)}
      />
      <label
        htmlFor={permission?.ClaimValue}
        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {permission.ClaimValue}
      </label>
    </div>
  ));
};

export function PermissionsView({
  data,
  setData,
}: {
  data: any;
  setData: any;
}) {
  const { data: result }: { Data: Permissions[] } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => httpService.get({ url: "/permissions" }),
  });


  const Data = result?.Data;
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
      <h1 className="text-xl font-bold">User Permissions</h1>
      {Data ? (
        Data?.map((permission, index) => (
          <AccordionItem
            key={index}
            value={permission.GroupName}
            className="rounded-lg border px-4"
          >
            <AccordionTrigger>{permission.GroupName}</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-5">
              <PermissionCell
                Permission={permission.Permissions}
                data={data}
                setData={setData}
              />
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <h1>Loading Permissions ...</h1>
      )}
    </Accordion>
  );
}
