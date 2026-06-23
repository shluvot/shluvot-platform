import { useState } from 'react';
import MonoLabel from '../../dummies/MonoLabel/MonoLabel';
import TextField from '../../dummies/TextField/TextField';
import Select from '../../dummies/Select/Select';
import Textarea from '../../dummies/Textarea/Textarea';
import Button from '../../dummies/Button/Button';

const REGION_OPTIONS = [
  { value: 'center', label: 'מרכז' },
  { value: 'north', label: 'צפון' },
  { value: 'south', label: 'דרום' },
  { value: 'jerusalem', label: 'ירושלים והסביבה' },
];

export default function ContactSection({ label, heading, body, phone, email, onSubmit, submitting, sent }) {
  const [fullName, setFullName] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [region, setRegion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ full_name: fullName, phone: phoneValue, region, message });
  };

  return (
    <section id="contact" style={{ background: 'var(--color-bg)', paddingBlock: 'var(--space-6)' }}>
      <div className="page two-col" style={{ alignItems: 'start' }}>
        <div>
          <MonoLabel>{label}</MonoLabel>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 0 }}>{heading}</h2>
          {body && <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>{body}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius)',
                    background: 'var(--color-mustard)',
                    color: '#fff',
                    fontSize: '1.1rem',
                  }}
                >
                  ☎
                </span>
                <span className="ltr-inline">{phone}</span>
              </div>
            )}
            {email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius)',
                    background: 'var(--color-coral)',
                    color: '#fff',
                    fontSize: '1.1rem',
                  }}
                >
                  @
                </span>
                <span className="ltr-inline">{email}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '18px',
              insetInlineStart: '-18px',
              width: '100%',
              height: '100%',
              background: 'var(--color-purple)',
              borderRadius: 'var(--radius)',
            }}
          />
          <div
            style={{
              position: 'relative',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-4)',
              boxShadow: '0 20px 50px rgba(34, 28, 23, 0.15)',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    background: 'var(--color-terracotta)',
                    color: '#fff',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ marginTop: 0 }}>קיבלנו, תודה!</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>נחזור אליכן בהקדם.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField label="שם מלא" name="full_name" value={fullName} onChange={setFullName} required />
                <TextField label="טלפון" name="phone" value={phoneValue} onChange={setPhoneValue} type="tel" required />
                <Select label="אזור" name="region" value={region} onChange={setRegion} options={REGION_OPTIONS} placeholder="בחרו אזור" />
                <Textarea label="הערה" name="message" value={message} onChange={setMessage} rows={4} />
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'שולחים…' : 'שלחו ונחזור אליכן'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
