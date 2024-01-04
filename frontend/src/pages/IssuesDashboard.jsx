import { useEffect, useState } from "react";
import Layout from "../components/CommonComponents/Layout";
import EditIssueModal from "../components/Modal/EditIssueModal";
import { deleteIssue, editIssue, fetchData } from "../services/api";
import AddChildModal from "../components/Modal/AddChildModal";
import { useData } from "../hooks/DataContext";
import TableHead from "../components/tableComponents/TableHead";
import TableBody from "../components/tableComponents/TableBody";

const IssuesDashboard = () => {
  const [updateIssue, setUpdateIssue] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);
  const [selectedCheckBox, setSelectedCheckbox] = useState(null);
  const { data, setData } = useData();

  const getIssue = (issueId) => {
    const filterIssue = data.find((item) => {
      return item._id === issueId;
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
    await deleteIssue(id);
    setData(() =>
      data.filter((elem) => {
        return elem._id !== id;
      })
    );
    setSelectedCheckbox(null);
  };

  const linkIssue = (issue) => {
    getIssue(issue);
    setChildModalIsOpen(true);
  };

  const handleEditIssue = async (issue) => {
    const updatedData = data.map((item) =>
      item._id === issue._id ? issue : item
    );

    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      await editIssue(issue);
      setData(updatedData);
    }
    return;
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData.data);
    };
    getData();
  }, []);

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
            <TableHead />
            <TableBody
              data={data}
              toggleCheckBox={toggleCheckBox}
              selectedCheckBox={selectedCheckBox}
            />
          </table>
        </div>

        <EditIssueModal
          modalIsOpen={modalIsOpen}
          updateIssue={updateIssue}
          setModalIsOpen={setModalIsOpen}
          postUpdatedIssue={handleEditIssue}
        />
        <AddChildModal
          childModalIsOpen={childModalIsOpen}
          setChildModalIsOpen={setChildModalIsOpen}
          issuesData={data}
          updateIssue={updateIssue}
          setData={setData}
        />
        {(!data || data.length === 0) && <p>No data to show</p>}
      </div>
    </Layout>
  );
};

export default IssuesDashboard;
