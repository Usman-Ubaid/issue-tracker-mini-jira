import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import EditModal from "../components/Modal/EditModal";
import AddChildModal from "../components/Modal/AddChildModal";

const IssuesDashboard = () => {
  const [data, setData] = useState([]);
  const [updateIssue, setIssueUpdate] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);

  const getIssue = (issue) => {
    const filterIssue = data.find((item) => {
      return item.issueId === issue.issueId;
    });

    setIssueUpdate(filterIssue);
  };

  const getUpdatedIssue = (issue) => {
    getIssue(issue);
    setModalIsOpen(true);
  };

  const linkIssue = (issue) => {
    getIssue(issue);
    setChildModalIsOpen(true);
  };

  const deleteIssue = async (issue) => {
    const filterIssue = data.find((item) => {
      return item.issueId === issue.issueId;
    });

    try {
      await fetch(`http://localhost:5000/api/issues/${filterIssue.issueId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(
        data.filter((item) => {
          return item.issueId !== issue.issueId;
        })
      );
    } catch (error) {
      console.log("Error deleting issue", error);
    }
  };

  const postUpdatedIssue = async (issue) => {
    try {
      await fetch(`http://localhost:5000/api/issues/${issue.issueId}`, {
        method: "put",
        body: JSON.stringify(issue),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedData = data.map((item) =>
        item.issueId === issue.issueId ? issue : item
      );

      setData(updatedData);
    } catch (error) {
      console.log("Error updating issue", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/issues", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableHeadings = [
    {
      id: "Issue Id",
      title: "Issue Title",
      type: "Issue Type",
      status: "Status",
    },
  ];

  return (
    <Layout>
      <div className="issues-dashboard">
        <h2>Issues Dashboard</h2>
        <table>
          <thead>
            {tableHeadings.map((heading) => (
              <tr key={heading.id}>
                <th>{heading.id}</th>
                <th>{heading.title}</th>
                <th>{heading.type}</th>
                <th>{heading.status}</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <tr key={item.issueId}>
                  <td>{item.issueId}</td>
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>{item.state}</td>
                  <td>
                    <button onClick={() => getUpdatedIssue(item)}>Edit</button>
                  </td>
                  {(item.type === "Epic" || item.type === "Story") && (
                    <td>
                      <button onClick={() => linkIssue(item)}>
                        Link Issue
                      </button>
                    </td>
                  )}
                  <td>
                    <button onClick={() => deleteIssue(item)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div>
          <EditModal
            modalIsOpen={modalIsOpen}
            updateIssue={updateIssue}
            setModalIsOpen={setModalIsOpen}
            postUpdatedIssue={postUpdatedIssue}
          />
        </div>
        <div>
          <AddChildModal
            childModalIsOpen={childModalIsOpen}
            setChildModalIsOpen={setChildModalIsOpen}
            issuesData={data}
            updateIssue={updateIssue}
          />
        </div>
        {(!data || data.length === 0) && <p>No data to show</p>}
      </div>
    </Layout>
  );
};

export default IssuesDashboard;
