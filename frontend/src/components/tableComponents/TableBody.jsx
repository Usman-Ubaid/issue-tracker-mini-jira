const TableBody = ({ data, toggleCheckBox, selectedCheckBox }) => {
  return (
    <tbody>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <tr key={item._id}>
            {/* <td>
              <div>
                <input
                  type="checkbox"
                  onChange={() => toggleCheckBox(item._id)}
                  checked={selectedCheckBox === item._id}
                />
                <label>{item._id}</label>
              </div>
            </td> */}
            <td>{item.title}</td>
            <td>{item.issueType}</td>
            <td>
              <label
                className={
                  item.state === "ToDo"
                    ? "todo"
                    : item.state === "InProgress"
                    ? "inprogress"
                    : "done"
                }
              >
                {item.state}
              </label>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
