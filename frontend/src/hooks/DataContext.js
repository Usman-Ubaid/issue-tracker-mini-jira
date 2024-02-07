import { useState, useContext, createContext, useEffect } from "react";
import {
  fetchData,
  postData,
  updateIssueTitle,
  updateIssueType,
  deleteIssueApi,
} from "../services/api";

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
    if (res) {
      setData([...data, res.data.issue]);
      console.log("Issue added");

      return;
    } else {
      console.log("Failed to add issue");
    }
  };

  const deleteIssue = async (id) => {
    const res = await deleteIssueApi(id);
    if (res) {
      const filteredData = data?.filter((issue) => issue._id !== id);
      setData(filteredData);
      console.log("Issue removed");

      return;
    } else {
      console.log("Failed to delete the issue");
    }
  };

  const issueTypeChange = async (id, issueType) => {
    const res = await updateIssueType(id, issueType);
    if (res) {
      const updatedIssues = data.map((issue) => {
        if (issue._id === id) {
          return { ...issue, issueType: issueType };
        }
        return issue;
      });

      setData(updatedIssues);
      console.log("Issue type updated");
    } else {
      console.log("Failed to update type");
    }
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
      console.log("Issue title updated");
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
