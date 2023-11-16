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
  const [selectedCheckBox, setSelectedCheckbox] = useState(null);
  const { data, setData } = useData();

  const getIssue = (issueId) => {
    const filterIssue = data.find((item) => {
      return item.issueId === issueId;
    });

    setUpdateIssue(filterIssue);
  };

  const toggleCheckBox = (issueId) => {
    if (selectedCheckBox === issueId) {
      setSelectedCheckbox(null);
    } else {
      setSelectedCheckbox(issueId);
    }
  };

  const getUpdatedIssue = (id) => {
    getIssue(id);
    setModalIsOpen(true);
  };

  const handleDeleteIssue = async (id) => {
    const response = await deleteIssue(id);
    setData(response.data);
    setSelectedCheckbox(null);
  };

  const linkIssue = (issue) => {
    getIssue(issue);
    setChildModalIsOpen(true);
    setSelectedCheckbox(null);
  };

  const handleEditIssue = async (issue) => {
    const updatedData = data.map((item) =>
      item.issueId === issue.issueId ? issue : item
    );

    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      await editIssue(issue);
      setData(updatedData);
      setSelectedCheckbox(null);
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
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          {selectedCheckBox && (
            <ul>
              <li>
                <button onClick={() => getUpdatedIssue(selectedCheckBox)}>
                  Edit
                </button>
              </li>
              <li>
                <button onClick={() => linkIssue(selectedCheckBox)}>
                  Link Issue
                </button>
              </li>
              <li>
                <button onClick={() => handleDeleteIssue(selectedCheckBox)}>
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>
        <div className="dashboard-body">
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
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => toggleCheckBox(item.issueId)}
                        checked={selectedCheckBox === item.issueId}
                      />
                      <td>{item.issueId}</td>
                    </div>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>{item.state}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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
