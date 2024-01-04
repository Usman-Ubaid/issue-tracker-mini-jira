const TableHead = () => {
  const tableHeadings = [
    {
      title: "Issue Title",
      type: "Issue Type",
      status: "Status",
    },
  ];

  return (
    <thead>
      {tableHeadings.map((heading, index) => (
        <tr key={index}>
          <th>{heading.title}</th>
          <th>{heading.type}</th>
          <th>{heading.status}</th>
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
