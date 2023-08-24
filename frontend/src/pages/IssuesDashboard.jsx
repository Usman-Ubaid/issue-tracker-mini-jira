import { useEffect, useState } from "react";
import Modal from "react-modal";
import Layout from "../components/Layout";
import EditModal from "../components/Modal/EditModal";

const IssuesDashboard = () => {
  const [data, setData] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement("#root");

  const getIssueId = (issueId) => {
    setModalIsOpen(true);
    console.log(issueId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
                    <button onClick={() => getIssueId(item.issueId)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div>
          {modalIsOpen && (
            <EditModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
          )}
        </div>
        {(!data || data.length === 0) && <p>No data to show</p>}
      </div>
    </Layout>
  );
};

export default IssuesDashboard;
