export default function Table({ columns, rows, renderCell, getRowKey }) {
  return (
    <div style={{ background: 'var(--color-surface)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(27,47,82,.08)', overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  textAlign: 'start',
                  padding: '0.9rem 1rem',
                  borderBottom: '1.5px solid var(--color-border)',
                  background: 'var(--color-section-cool)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="admin-table-row">
              {columns.map((column) => (
                <td key={column.key} style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                  {renderCell(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
