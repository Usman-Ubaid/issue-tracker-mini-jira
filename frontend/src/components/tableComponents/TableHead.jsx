const TableHead = () => {
  const tableHeadings = [
    {
      id: "Issue Id",
      title: "Issue Title",
      type: "Issue Type",
      status: "Status",
    },
  ];

  return (
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
  );
};

export default TableHead;
