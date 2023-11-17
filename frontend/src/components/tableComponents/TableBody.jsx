const TableBody = ({ data, toggleCheckBox, selectedCheckBox }) => {
  return (
    <tbody>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <tr key={item.issueId}>
            <td>
              <div>
                <input
                  type="checkbox"
                  onChange={() => toggleCheckBox(item.issueId)}
                  checked={selectedCheckBox === item.issueId}
                />
                <label>{item.issueId}</label>
              </div>
            </td>
            <td>{item.title}</td>
            <td>{item.type}</td>
            <td>
              <label
                className={
                  item.state === "ToDo"
                    ? "todo"
                    : item.state === "InProgress"
                    ? "inprogress"
                    :  "done"
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
