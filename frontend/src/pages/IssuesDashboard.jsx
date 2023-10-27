import { useEffect, useState } from "react";
import Layout from "../components/CommonComponents/Layout";
import EditModal from "../components/Modal/EditModal";
import { deleteIssue, editIssue, fetchData } from "../services/api";

const IssuesDashboard = () => {
  const [data, setData] = useState([]);
  const [updateIssue, setIssueUpdate] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getUpdatedIssue = (issue) => {
    setModalIsOpen(true);

    const filterIssue = data.find((item) => {
      return item.issueId === issue.issueId;
    });

    setIssueUpdate(filterIssue);
  };

  const handleDeleteIssue = async (issue) => {
    const response = await deleteIssue(issue);
    setData(response.data);
  };

  const handleEditIssue = async (issue) => {
    const updatedData = data.map((item) =>
      item.issueId === issue.issueId ? issue : item
    );

    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      await editIssue(issue);
    }

    setData(updatedData);
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData.data);
    };

    if (data.length === 0) {
      fetchDataAndSetData();
    }
  }, [data.length, data]);

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
        {(!data || data.length === 0) && <p>No data to show</p>}
      </div>
    </Layout>
  );
};

export default IssuesDashboard;
