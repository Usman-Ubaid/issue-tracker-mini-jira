import { useState, useContext, createContext, useEffect } from "react";
import { fetchData } from "../services/api";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData.data);

        const updatedGroupedData = fetchedData.data.reduce((acc, item) => {
          const state = item.state;
          acc[state] = acc[state] || [];
          acc[state].push(item);
          return acc;
        }, {});

        setGroupedData(updatedGroupedData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [data.length]);

  return (
    <DataContext.Provider value={{ data, setData, groupedData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
