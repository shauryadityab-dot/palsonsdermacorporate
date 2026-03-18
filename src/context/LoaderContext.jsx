import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  // isLoaded starts false, becomes true once page loader finishes its sequence
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
