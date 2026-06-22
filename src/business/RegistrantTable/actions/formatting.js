export function formatDate(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('he-IL');
}

export function rowsToCsv(rows) {
  const header = ['שם', 'אימייל', 'טלפון', 'מחזור חיוב', 'סטטוס נרשם', 'סטטוס תשלום אחרון'];
  const lines = rows.map((row) => {
    const lastPayment = row.payments?.[0];
    return [
      row.full_name,
      row.email,
      row.phone,
      row.billing_cycle,
      row.status,
      lastPayment?.status ?? '',
    ]
      .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
      .join(',');
  });
  return [header.join(','), ...lines].join('\n');
}
