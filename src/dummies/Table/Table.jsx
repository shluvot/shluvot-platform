export default function Table({ columns, rows, renderCell, getRowKey }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{
                textAlign: 'start',
                padding: '0.6rem',
                borderBottom: '2px solid var(--color-border)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
              }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={getRowKey(row)}>
            {columns.map((column) => (
              <td key={column.key} style={{ padding: '0.6rem', borderBottom: '1px solid var(--color-border)' }}>
                {renderCell(column, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
