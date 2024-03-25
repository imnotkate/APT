// Context.js
import React, { createContext, useContext, useState } from 'react';

const LeftHandedContext = createContext();

export const useLeftHanded = () => useContext(LeftHandedContext);

export const LeftHandedProvider = ({ children }) => {
  const [isLeftHanded, setIsLeftHanded] = useState(false);

  const toggleLeftHanded = () => {
    setIsLeftHanded(!isLeftHanded);
  };

  return (
    <LeftHandedContext.Provider value={{ isLeftHanded, toggleLeftHanded }}>
      {children}
    </LeftHandedContext.Provider>
  );
};
