
import Layout from "../components/Layout";

const IssuesDashboard = () => {

import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const IssuesDashboard = () => {
  const [data, setData] = useState([]);

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
    { id: "Issue Id", title: "Issue Title", type: "Issue Type" },
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
                </tr>
              ))}
          </tbody>
        </table>
        {(!data || data.length === 0) && <p>No data to show</p>}

      </div>
    </Layout>
  );
};

export default IssuesDashboard;
