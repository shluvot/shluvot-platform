import { Link } from 'react-router-dom';
import PageHeader from '../../../dummies/PageHeader/PageHeader';
import Button from '../../../dummies/Button/Button';
import Card from '../../../dummies/Card/Card';

// דף נחיתה סטטי — ללא Redux. תוכן placeholder, יוחלף בהמשך בתוכן סופי מהעמותה.
export default function Landing() {
  return (
    <div className="page">
      <PageHeader
        title="שלובות — איגוד מטפלות במשפחתונים"
        subtitle="קול מקצועי, חם ומאוחד לכל מטפלת במשפחתון בישראל"
      />

      <div style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>
        <Link to="/registration">
          <Button>הרשמה לחברות באיגוד</Button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: 'var(--space-3)' }}>
        <Card>
          <h3>ייעוץ והכוונה</h3>
          <p>תמיכה מקצועית וזכויות עבור מטפלות במשפחתונים.</p>
        </Card>
        <Card>
          <h3>קול מאוחד</h3>
          <p>ייצוג מול הרשויות והגופים המפעילים.</p>
        </Card>
        <Card>
          <h3>קהילה</h3>
          <p>מפגשים, הכשרות ושיתוף ידע בין חברות האיגוד.</p>
        </Card>
      </div>
    </div>
  );
}
