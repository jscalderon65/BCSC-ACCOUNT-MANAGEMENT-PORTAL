import { useState } from "react";
import { encryptData } from "../helpers/crypto";
export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const encryptedData = encryptData(valueToStore);
      window.localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
};
