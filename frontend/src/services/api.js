import fetch from "node-fetch";
export const BASE_URL = "http://localhost:5000/api/issues";

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Failed to fetch Data");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching Data:", error);
  }
};

export const postData = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/issues", {
      method: "post",
      body: JSON.stringify({ title: formData.title, type: formData.type }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Failed to post data");
    }

    console.log("Your Issue has been successfully added.");
  } catch (error) {
    console.log("Error posting data:", error);
  }
};

export const deleteIssue = async (issue) => {
  try {
    const response = await fetch(`${BASE_URL}/${issue.issueId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Failed to delete the issue");
    }
    return response.json();
  } catch (error) {
    console.log("Error deleting the issue:", error);
  }
};

export const editIssue = async (issue) => {
  try {
    const response = await fetch(`${BASE_URL}/${issue.issueId}`, {
      method: "put",
      body: JSON.stringify(issue),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log("Error editing the issue:", error);
  }
};