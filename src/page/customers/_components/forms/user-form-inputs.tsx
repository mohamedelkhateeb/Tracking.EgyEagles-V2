import InputField from "@/components/Fields/input-field";
// import { cn } from "@/lib/utils";
// import Saudi from "@/components/svgs/saudi-flag";
// import { Input } from "@/components/ui/input";
import SelectField from "@/components/Fields/select-field";
import { useAuthContext } from "@/context/auth-provider";
import { RoleType } from "@/types/api.type";
import useCustomerFormStore from "@/lib/store/customer-form/use-customer-form";

const UserFormInputs = ({
  roles,
  userId,
  // unRenderedFields,
}: {
  roles?: RoleType[];
  userId?: string;
  unRenderedFields?: string[];
}) => {
  const { customerId } = useAuthContext();
  const { Errors, setErrors, UserData, setUserData } = useCustomerFormStore(
    (state) => state
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
    setErrors({ ...Errors, [e.target.name]: undefined });
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <input type="hidden" name="CustomerId" value={customerId} />
      <InputField
        value={UserData?.FirstName}
        onChange={handleChange}
        errors={Errors}
        name="FirstName"
        label="First Name"
        placeholder="Enter your first name"
        type="text"
        required
      />
      <InputField
        value={UserData?.LastName}
        onChange={handleChange}
        errors={Errors}
        name="LastName"
        label="Last Name"
        placeholder="Enter your last name"
        type="text"
        required
      />
      <InputField
        value={UserData?.Email}
        onChange={handleChange}
        errors={Errors}
        name="Email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        required
      />
      {userId == "new" && (
        <SelectField
          errors={Errors}
          name="RoleId"
          label="Role"
          onChange={handleChange}
          options={
            roles
              ?.filter(
                (role) =>
                  role.Name !== "ADMIN" &&
                  role.Name !== "GROUP_ADMIN" &&
                  role.Name !== "DISTRIBUTER"
              )
              .map((role) => ({
                value: role.Id.split("|").join(""),
                label: role.Name,
              })) || []
          }
          placeholder="Select a Role"
          required
        />
      )}
      {/* {!unRenderedFields?.includes("PhoneNumber") && (
        <div>
          <p className="mb-2 text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>{" "}
          </p>
          <div
            dir="ltr"
            className="flex max-h-11 items-center rounded-lg border px-4"
          >
            <span className="flex items-center gap-2 border-r-2 pr-2 text-sm">
              <Saudi />
              +966
            </span>
            <Input
              value={UserData?.PhoneNumber || ""}
              className={cn(
                "border-0 text-sm shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xl:py-7"
              )}
              name="PhoneNumber"
              type="text"
              placeholder="50xxxxxx"
              maxLength={8}
            />
          </div>
        </div>
      )} */}
      <InputField
        onChange={handleChange}
        errors={Errors}
        name="Password"
        label="Password"
        placeholder="**********"
        type="password"
        required
        value={UserData?.Password}
      />
    </div>
  );
};

export default UserFormInputs;
