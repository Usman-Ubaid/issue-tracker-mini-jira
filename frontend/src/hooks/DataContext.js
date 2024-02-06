import { useState, useContext, createContext, useEffect } from "react";
import { fetchData } from "../services/api";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((res) => setData(res?.data))
      .catch((error) => {
        console.log("Error fetching the data", error);
      });
  }, []);

  const addIssue = (newIssue) => {
    setData((prevData) => ({
      ...prevData,
      newIssue,
    }));
  };

  return (
    <DataContext.Provider value={{ data, addIssue }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
