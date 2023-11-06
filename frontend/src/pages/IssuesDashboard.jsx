import { useEffect, useState } from "react";
import Layout from "../components/commonComponents/Layout";
import EditModal from "../components/modal/EditModal";
import { deleteIssue, editIssue, fetchData } from "../services/api";
import AddChildModal from "../components/modal/AddChildModal";
import { useData } from "../hooks/DataContext";

const IssuesDashboard = () => {
  const [updateIssue, setUpdateIssue] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);
  const { data, setData } = useData();

  const getIssue = (issue) => {
    const filterIssue = data.find((item) => {
      return item.issueId === issue.issueId;
    });

    setUpdateIssue(filterIssue);
  };

  const getUpdatedIssue = (issue) => {
    getIssue(issue);
    setModalIsOpen(true);
  };

  const handleDeleteIssue = async (issue) => {
    const response = await deleteIssue(issue);
    setData(response.data);
  };

  const linkIssue = (issue) => {
    getIssue(issue);
    setChildModalIsOpen(true);
  };

  const handleEditIssue = async (issue) => {
    const updatedData = data.map((item) =>
      item.issueId === issue.issueId ? issue : item
    );

    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      await editIssue(issue);
      setData(updatedData);
    }
    return;
  };

  const fetchDataAndSetData = async () => {
    const fetchedData = await fetchData();
    setData(fetchedData.data);
  };

  useEffect(() => {
    fetchDataAndSetData();
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
                    <button onClick={() => handleDeleteIssue(item)}>
                      Delete
                    </button>
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
            postUpdatedIssue={handleEditIssue}
          />
        </div>
        <div>
          <AddChildModal
            childModalIsOpen={childModalIsOpen}
            setChildModalIsOpen={setChildModalIsOpen}
            issuesData={data}
            updateIssue={updateIssue}
            setData={setData}
          />
        </div>
        {(!data || data.length === 0) && <p>No data to show</p>}
      </div>
    </Layout>
  );
};

export default IssuesDashboard;
