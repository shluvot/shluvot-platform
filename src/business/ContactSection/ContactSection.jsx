import { useState } from 'react';
import MonoLabel from '../../dummies/MonoLabel/MonoLabel';

const REGION_OPTIONS = [
  { value: 'north', label: 'צפון' },
  { value: 'haifa', label: 'חיפה והקריות' },
  { value: 'center', label: 'מרכז והשרון' },
  { value: 'tlv', label: 'תל אביב והסביבה' },
  { value: 'jerusalem', label: 'ירושלים' },
  { value: 'south', label: 'דרום' },
];

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  border: '1.5px solid #d8cdba',
  borderRadius: '10px',
  background: '#fff',
  fontFamily: 'var(--font-body)',
  fontSize: '16px',
  color: '#221C17',
  outline: 'none',
};

const labelStyle = { display: 'block', fontWeight: 700, fontSize: '14px', marginBottom: '7px', color: '#221C17' };

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
    <section id="contact" style={{ background: '#F6EFE3', padding: 'clamp(64px,9vw,110px) 28px' }}>
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(36px,5vw,60px)',
          alignItems: 'start',
        }}
      >
        <div>
          <MonoLabel color="#D2613F">{label}</MonoLabel>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(32px,4.6vw,48px)', lineHeight: 1.1, margin: '0 0 20px', color: '#2E1F47', letterSpacing: '-1px' }}>
            {heading}
          </h2>
          {body && <p style={{ fontSize: '18px', lineHeight: 1.75, color: '#46403a', margin: '0 0 28px' }}>{body}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: '#221C17', fontWeight: 600 }}>
                <span style={{ width: '36px', height: '36px', background: '#E9A93C', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#231a0a', fontWeight: 800 }}>
                  ☎
                </span>
                <span className="ltr-inline">{phone}</span>
              </div>
            )}
            {email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: '#221C17', fontWeight: 600 }}>
                <span style={{ width: '36px', height: '36px', background: '#E86A4E', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                  @
                </span>
                <span className="ltr-inline">{email}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: '18px', left: '-18px', width: '100%', height: '100%', background: '#2E1F47', borderRadius: '18px', zIndex: 0 }} />

          {sent ? (
            <div style={{ position: 'relative', zIndex: 1, background: '#FFFDF8', borderRadius: '18px', padding: 'clamp(40px,5vw,56px)', boxShadow: '0 20px 50px rgba(46,31,71,.14)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: '#E9A93C', borderRadius: '50%', margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#231a0a' }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '30px', margin: '0 0 12px', color: '#2E1F47' }}>קיבלנו, תודה!</h3>
              <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#46403a', margin: 0 }}>
                ניצור איתכן קשר בקרוב עם כל הפרטים. בינתיים — ברוכות הבאות למשפחה של שלובות. 🤍
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ position: 'relative', zIndex: 1, background: '#FFFDF8', borderRadius: '18px', padding: 'clamp(26px,4vw,38px)', boxShadow: '0 20px 50px rgba(46,31,71,.14)', display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              <div>
                <label style={labelStyle}>שם מלא</label>
                <input name="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="איך קוראים לך?" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>טלפון</label>
                <input name="phone" value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} type="tel" placeholder="050-0000000" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>אזור</label>
                <select name="region" value={region} onChange={(e) => setRegion(e.target.value)} style={inputStyle}>
                  <option value="">בחרו אזור</option>
                  {REGION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>משהו שתרצו לספר לנו (לא חובה)</label>
                <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: '#D2613F',
                  color: '#fff',
                  border: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: '17px',
                  padding: '15px',
                  borderRadius: '12px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 12px 28px rgba(210,97,63,.4)',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'שולחים…' : 'שלחו ונחזור אליכן'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
