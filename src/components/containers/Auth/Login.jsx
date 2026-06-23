import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '../../../dummies/TextField/TextField';
import Button from '../../../dummies/Button/Button';
import Card from '../../../dummies/Card/Card';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import { login } from './actions/authActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate('/admin/registrants');
  };

  return (
    <div className="page" style={{ maxWidth: '24rem', paddingBlock: 'var(--space-5) var(--space-6)' }}>
      <PageHeader eyebrow="אדמין" title="כניסת צוות" />
      <Card>
        <form onSubmit={handleSubmit}>
          <TextField label="אימייל" name="email" type="email" value={email} onChange={setEmail} required />
          <TextField label="סיסמה" name="password" type="password" value={password} onChange={setPassword} required />
          {error && <p style={{ color: '#E0554F', fontWeight: 600 }}>{error}</p>}
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'מתחבר...' : 'כניסה'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
