import InputField from "@/components/Fields/input-field";
import SelectField from "@/components/Fields/select-field";
import { useParams } from "react-router-dom";
import CustomerSelection from "./customer-selection";
import { useAuthContext } from "@/context/auth-provider";
import useCustomerFormStore from "@/lib/store/customer-form/use-customer-form";
import PhoneNumber from "@/components/global/phone-number";
import { LuAsterisk } from "react-icons/lu";

const CustomerFormInputs = () => {
  const { customerId, user } = useAuthContext();
  const { CustomerData, setCustomerData, Errors, setErrors } =
    useCustomerFormStore((state) => state);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCustomerData({ ...CustomerData, [e.target.name]: e.target.value });
    setErrors({ ...Errors, [e.target.name]: undefined });
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <input type="hidden" value={customerId} name="UpLevelId" />
      <InputField
        value={CustomerData?.CustomerName}
        onChange={handleChange}
        errors={Errors}
        name="CustomerName"
        label="Customer Name"
        placeholder="Enter customer name"
        required
      />
      <InputField
        value={CustomerData?.EmailAddress}
        onChange={handleChange}
        errors={Errors}
        name="EmailAddress"
        label="Email Address"
        placeholder="Enter email address"
        type="email"
        required
      />
      <div className="flex flex-col gap-1">
        <p className=" flex  font-semibold text-lg">
          Phone Number <LuAsterisk className="text-red-500" size={14} />
        </p>
        <PhoneNumber
          error={Errors?.PhoneNumber?.join(" ")}
          defaultValue={CustomerData?.PhoneNumber.slice(4)}
          onChange={handleChange}
        />
      </div>
      {useParams().customer == "new" && (
        <>
          <SelectField
            placeholder="Select Customer Type"
            name="CustomerType"
            label="Customer Type"
            options={[
              { value: "Branch", label: "Branch" },
              { value: "Company", label: "Company" },
              { value: "Individual", label: "Individual" },
            ]}
            onChange={handleChange}
            errors={Errors}
            required
            value={CustomerData?.CustomerType}
          />
          {user?.UserType == 1 && (
            <CustomerSelection
              CustomerId={user?.Id || ""}
              errors={Errors}
              endpoint={"customers/all-distributers"}
              data={CustomerData}
              placeholder="Select parent customer"
              label="Parent Customer"
              onChange={handleChange}
              name="UplevelId"
            />
          )}
        </>
      )}
      <InputField
        value={CustomerData?.IdentityNumber}
        onChange={handleChange}
        errors={Errors}
        maxLength={10}
        name="IdentityNumber"
        label="Identity Number"
        placeholder="10xxxxxxxx"
        required
      />
      <InputField
        value={CustomerData?.City}
        onChange={handleChange}
        errors={Errors}
        name="City"
        label="City"
        placeholder="Enter city"
        required
      />
      <InputField
        value={CustomerData?.ZipCode}
        onChange={handleChange}
        errors={Errors}
        name="ZipCode"
        label="Zip Code"
        placeholder="Enter zip code"
        required
      />
      <InputField
        value={CustomerData?.Country}
        onChange={handleChange}
        errors={Errors}
        name="Country"
        label="Country"
        placeholder="Enter country"
        required
      />
      <InputField
        value={CustomerData?.Address}
        onChange={handleChange}
        errors={Errors}
        name="Address"
        label="Address"
        placeholder="Enter address"
        required
      />
      <InputField
        value={CustomerData?.Location}
        onChange={handleChange}
        errors={Errors}
        name="Location"
        label="Location"
        placeholder="Enter location"
      />
      <InputField
        value={CustomerData?.Website}
        onChange={handleChange}
        errors={Errors}
        name="Website"
        label="Website"
        placeholder="Enter URL website"
        type="url"
      />
      <InputField
        value={CustomerData?.CommercialRecordNumber}
        onChange={handleChange}
        errors={Errors}
        name="CommercialRecordNumber"
        label="Commercial Record Number"
        placeholder="Enter commercial record number"
      />
      <InputField
        required
        placeholder="Enter commercial record issue date"
        value={
          CustomerData?.DateOfBirth &&
          !isNaN(new Date(CustomerData.CommercialRecordIssueDate).getTime())
            ? new Date(CustomerData.CommercialRecordIssueDate)
                .toISOString()
                .split("T")[0]
            : ""
        }
        onChange={handleChange}
        errors={Errors}
        name="CommercialRecordIssueDate"
        label="Commercial Record Issue Date"
        type="date"
      />
      <InputField
        required
        placeholder="Enter date of birth"
        value={
          CustomerData?.DateOfBirth &&
          !isNaN(new Date(CustomerData.DateOfBirth).getTime())
            ? new Date(CustomerData.DateOfBirth).toISOString().split("T")[0]
            : ""
        }
        onChange={handleChange}
        errors={Errors}
        name="DateOfBirth"
        label="Date of Birth"
        type="date"
      />
      <InputField
        value={CustomerData?.Comments}
        onChange={handleChange}
        errors={Errors}
        name="Comments"
        label="Comments"
        placeholder="Enter comments"
      />
    </div>
  );
};

export default CustomerFormInputs;
