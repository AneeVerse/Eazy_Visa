const TableBlock = ({ value }) => {
  if (!value || !value.header || !value.rows) return null;
  return (
    <table className="my-4 border border-gray-300">
      <thead>
        <tr>
          {value.header.map((cell, idx) => (
            <th key={idx} className="border px-2 py-1">{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {value.rows.map((row, idx) => (
          <tr key={idx}>
            {row.cells.map((cell, cidx) => (
              <td key={cidx} className="border px-2 py-1">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBlock; 