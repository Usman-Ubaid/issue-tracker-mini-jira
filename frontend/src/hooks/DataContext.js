import { useState, useContext, createContext, useEffect } from "react";
import { fetchData, postData, updateIssueTitle } from "../services/api";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((res) => setData(res?.data))
      .catch((error) => {
        console.log("Error fetching the data", error);
      });
  }, []);

  const addIssue = async (newIssue) => {
    const res = await postData(newIssue);
    setData([...data, res.data.issue]);
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

  const issueTitleChange = async (id, issueTitle) => {
    const res = await updateIssueTitle(id, issueTitle);

    if (res) {
      const updatedIssues = data.map((issue) => {
        if (issue._id === id) {
          return { ...issue, title: issueTitle };
        }
        return issue;
      });

      setData(updatedIssues);
    } else {
      console.log("Failed to update title");
    }
  };

  return (
    <DataContext.Provider
      value={{ data, deleteIssue, addIssue, issueTypeChange, issueTitleChange }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
