import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
