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
    setData((prevData) => [...prevData, newIssue]);
  };

  const deleteIssue = (id) => {
    const filteredData = data?.filter((issue) => issue._id !== id);
    setData(filteredData);
  };

  const issueTypeChange = (id, issueType) => {
    const updatedIssues = data.map((issue) => {
      if (issue._id === id) {
        return { ...issue, issueType: issueType };
      }
      return issue;
    });

    setData(updatedIssues);
  };

  return (
    <DataContext.Provider
      value={{ data, deleteIssue, addIssue, issueTypeChange }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
