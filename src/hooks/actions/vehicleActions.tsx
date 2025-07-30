import { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { VEHICLE_DEFAULT_VALUES } from '../config/vehicle-default-values';
import { createVehicle, updateVehicle } from '@/services/api/vehicleService';
import { handleApiResponse } from '@/utils/helpers';

interface VehicleData {
  [key: string]: any;
}

export const useVehicleActions = (initialData: Partial<VehicleData> = {}) => {
  const { vehicle } = useParams();
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [data, setData] = useState<VehicleData>({ ...VEHICLE_DEFAULT_VALUES, ...initialData });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = async (state: any, formData: FormData) => {
    const objectedData = Object.fromEntries(formData);
    try {
      if (vehicle === 'new') {
        const response = await createVehicle(objectedData);
        console.log(response);

        if (response?.Success) {
          toast.success('Vehicle created successfully');
          router.push('/vehicles');
        } else {
          toast.error(response?.Message || 'Something went wrong, please try again later');
        }
      } else {
        const response = await updateVehicle(data);
        console.log(response);
        if (response?.Success) {
          toast.success('Vehicle updated successfully');
          router.push('/vehicles');
        } else {
          toast.error(response?.Message || 'Something went wrong, please try again later');
        }
      }
      // router.push('/vehicles');
    } catch (error) {
      console.error('Error during API request:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return {
    data,
    setData,
    errors,
    handleChange,
    setErrors,
    handleSubmit,
  };
};
