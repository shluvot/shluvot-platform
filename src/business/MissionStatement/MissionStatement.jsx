import HeartIcon from '../../dummies/HeartIcon/HeartIcon';

export default function MissionStatement({ intro, body }) {
  if (!intro && !body) return null;

  return (
    <div style={{ textAlign: 'center', maxWidth: '40rem', marginInline: 'auto' }}>
      <HeartIcon size={28} />
      <h2 style={{ marginTop: '0.5rem' }}>המשימה שלנו</h2>
      {intro && <p style={{ fontWeight: 600 }}>{intro}</p>}
      {body && <p>{body}</p>}
    </div>
  );
}
