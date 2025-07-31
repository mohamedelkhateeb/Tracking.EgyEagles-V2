import { options } from '@/app/api/auth/[...nextauth]/options';
import { convertToFormData } from '@/utils/convertToFormData';
import { getServerSession } from 'next-auth';
import { StateCreator } from 'zustand';

type Submit = any;
type SubmitSlice = {
  submitAqar: (Submit: Submit) => void;
};

const createSubmitSlice: StateCreator<SubmitSlice> = (set) => ({
  submitAqar: async (data: FormData) => {
    // set({ isLoading: true, error: null });

    const formData = convertToFormData(data);

    console.log(Object.fromEntries(formData));
    try {
      ('use server');
      const session = await getServerSession(options);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/aqar/add-aqar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.user.Token}`,
        },
        body: formData,
      });
      console.log('response', response);
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  },
});

export default createSubmitSlice;
export type { Submit, SubmitSlice };
