import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

export interface DriverProfile {
  nickname: string;
  car: string;
  registration: string;
  fuelConsumption: string;
}

interface DriverProfileContextValue {
  profile: DriverProfile;
  setProfile: React.Dispatch<React.SetStateAction<DriverProfile>>;
}

const defaultProfile: DriverProfile = {
  nickname: 'Wojtas Puczylk',
  car: 'BMW Seria 3 E46',
  registration: 'WWL54443',
  fuelConsumption: '8',
};

const DriverProfileContext =
  createContext<DriverProfileContextValue | undefined>(undefined);

export function DriverProfileProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [profile, setProfile] = useState<DriverProfile>(defaultProfile);

  return (
    <DriverProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </DriverProfileContext.Provider>
  );
}

export function useDriverProfile() {
  const context = useContext(DriverProfileContext);

  if (!context) {
    throw new Error(
      'useDriverProfile must be used inside DriverProfileProvider'
    );
  }

  return context;
}
