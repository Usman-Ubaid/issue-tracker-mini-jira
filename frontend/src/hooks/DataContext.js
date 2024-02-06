import { useState, useContext, createContext, useEffect } from "react";
import { fetchData } from "../services/api";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((res) => setData(res?.data))
      .catch((error) => {
        console.log("Error fetching the data", error);
      });
  }, [data.length]);

  const addIssue = (newIssue) => {
    const newData = [...data, newIssue];
    setData(newData);
  };

  const deleteIssue = (id) => {
    const filteredData = data?.filter((issue) => issue._id !== id);
    setData(filteredData);
  };

  return (
    <DataContext.Provider value={{ data, addIssue, deleteIssue }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
