import { useEffect, useState } from 'react';

export const useVendor = () => {
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const savedVendor = localStorage.getItem('vendor');
    if (savedVendor) {
      setVendor(JSON.parse(savedVendor));
    }
  }, []);

  return vendor;
};
