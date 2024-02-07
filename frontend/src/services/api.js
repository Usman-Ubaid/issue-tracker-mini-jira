import fetch from "node-fetch";
// export const BASE_URL = "https://issue-tracker-mini-jira.vercel.app/api/issues";
export const BASE_URL = "http://localhost:5001/api/issues";

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
    return await response.json();
  } catch (error) {
    console.log("Error fetching Data:", error);
  }
};

export const getIssueById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/issue/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log("Error fetching Data:", error);
  }
};

export const postData = async (formData) => {
  const { issueSummary, issueType } = formData;
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "post",
      body: JSON.stringify({
        title: issueSummary,
        issueType: issueType.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Failed to post data");
      return;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.log("Error posting data:", error);
  }
};

export const deleteIssueApi = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Failed to delete the issue");
      return;
    }
    return response.json();
  } catch (error) {
    console.log("Error deleting the issue:", error);
  }
};

export const editIssue = async (issue) => {
  console.log();
  try {
    const response = await fetch(`${BASE_URL}/${issue._id}`, {
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

export const addChildIssue = async (id, childId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/childIssue`, {
      method: "PUT",
      body: JSON.stringify({ childId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Failed to link the issue");
    }
    return response.json();
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateIssueType = async (id, issueType) => {
  try {
    const response = await fetch(`${BASE_URL}/issueType/${id}`, {
      method: "PUT",
      body: JSON.stringify({ issueType }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.log("Failed to update issue type");
    }
    return response.json();
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const updateIssueTitle = async (id, issueTitle) => {
  try {
    const response = await fetch(`${BASE_URL}/issueTitle/${id}`, {
      method: "PUT",
      body: JSON.stringify({ issueTitle }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.log("Failed to update issue type");
    }
    return response.json();
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const updateIssueState = async (id, issueState) => {
  try {
    const response = await fetch(`${BASE_URL}/issueStatus/${id}`, {
      method: "PUT",
      body: JSON.stringify({ issueState }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.log("Failed to update issue state");
    }
    return response.json();
  } catch (error) {
    console.log("Error", error.message);
  }
};
