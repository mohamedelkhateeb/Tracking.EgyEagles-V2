import { StateCreator } from 'zustand';

type Location = {
  Address: string;
  Longitude: string;
  Latitude: string;
};

type LocationSlice = {
  Location: Location;
  setLocation: (Location: Location) => void;
};

const initialState = {
  Address: '',
  Longitude: '',
  Latitude: '',
};

const createLocationSlice: StateCreator<LocationSlice> = (set) => ({
  Location: initialState,
  setLocation: (data) => set((state) => ({ Location: { ...state.Location, ...data } })),
});

export default createLocationSlice;
export type { Location, LocationSlice };
