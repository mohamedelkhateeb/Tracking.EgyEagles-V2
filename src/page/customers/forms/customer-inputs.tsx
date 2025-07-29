import React from 'react';
import InputField from '@/components/Fields/input-field';
import { useSession } from 'next-auth/react';
import PhoneNumberInput from '@/components/Fields/phone-number-input';
import { useParams } from 'next/navigation';
import SelectField from '@/components/Fields/select-field';
import CustomerSelection from '@/components/common/customer-selection';

const CustomerFormInputs = ({ errors, handleChange, data }: { CustomerId?: string; errors: any; handleChange: any; data: any }) => {
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <input type="hidden" value={session?.user?.CustomerId} name="UpLevelId" />
      <InputField defaultValue={data?.CustomerName} onChange={handleChange} errors={errors} name="CustomerName" label="Customer Name" placeholder="Enter customer name" required />
      <InputField defaultValue={data?.EmailAddress} onChange={handleChange} errors={errors} name="EmailAddress" label="Email Address" placeholder="Enter email address" type="email" required />
      <PhoneNumberInput data={data} />
      {useParams().customer == 'new' && (
        <>
          <SelectField
            placeholder="Select Customer Type"
            name="CustomerType"
            label="Customer Type"
            options={[
              { value: 'Branch', label: 'Branch' },
              { value: 'Company', label: 'Company' },
              { value: 'Individual', label: 'Individual' },
            ]}
            onChange={handleChange}
            errors={errors}
            required
            defaultValue={data?.CustomerType}
          />
          {session?.user?.Role == 'SUPER_ADMIN' && (
            <CustomerSelection
              CustomerId={session?.user?.Id || ''}
              errors={errors}
              endpoint={'customers/all-distributers'}
              data={data}
              placeholder="Select parent customer"
              label="Parent Customer"
              onChange={handleChange}
              name="UplevelId"
            />
          )}
        </>
      )}
      <InputField defaultValue={data?.IdentityNumber} onChange={handleChange} errors={errors} maxLength={10} name="IdentityNumber" label="Identity Number" placeholder="10xxxxxxxx" required />
      <InputField defaultValue={data?.City} onChange={handleChange} errors={errors} name="City" label="City" placeholder="Enter city" required />
      <InputField defaultValue={data?.ZipCode} onChange={handleChange} errors={errors} name="ZipCode" label="Zip Code" placeholder="Enter zip code" required />
      <InputField defaultValue={data?.Country} onChange={handleChange} errors={errors} name="Country" label="Country" placeholder="Enter country" required />
      <InputField defaultValue={data?.Address} onChange={handleChange} errors={errors} name="Address" label="Address" placeholder="Enter address" required />
      <InputField defaultValue={data?.Location} onChange={handleChange} errors={errors} name="Location" label="Location" placeholder="Enter location" />
      <InputField defaultValue={data?.Website} onChange={handleChange} errors={errors} name="Website" label="Website" placeholder="Enter URL website" type="url" />
      <InputField
        defaultValue={data?.CommercialRecordNumber}
        onChange={handleChange}
        errors={errors}
        name="CommercialRecordNumber"
        label="Commercial Record Number"
        placeholder="Enter commercial record number"
      />
      <InputField
        placeholder="Enter commercial record issue date"
        defaultValue={data?.CommercialRecordIssueDate}
        onChange={handleChange}
        errors={errors}
        name="CommercialRecordIssueDate"
        label="Commercial Record Issue Date"
        type="date"
      />
      <InputField placeholder="Enter date of birth" defaultValue={data?.DateOfBirth} onChange={handleChange} errors={errors} name="DateOfBirth" label="Date of Birth" type="date" />
      <InputField defaultValue={data?.Comments} onChange={handleChange} errors={errors} name="Comments" label="Comments" placeholder="Enter comments" />
    </div>
  );
};

export default CustomerFormInputs;
