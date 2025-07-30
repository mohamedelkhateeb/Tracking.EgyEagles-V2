import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createSensor } from '@/services/api/vehicleService';
import { useParams } from 'next/navigation';

export const useSensorActions = (initialData: any) => {
  const params = useParams();
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [data, setData] = useState<any>({
    VehicleId: params?.vehicle,
    Calibrations: [],
  });
  const handleChange = (e: any) => {
    if (errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: undefined }));
    }
  };
  const handleSubmit = async (state: any, formData: FormData) => {
    const objectedData = Object.fromEntries(formData);
    console.log({ ...objectedData, ...data });
    const response = await createSensor({ ...objectedData, ...data });
    console.log({ response });
    if (response.Success) {
      toast.success('Sensor Added successfully');
      router.push('/vehicles');
    } else {
      toast.error(response.Message || 'Something went wrong, please try again later');
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
