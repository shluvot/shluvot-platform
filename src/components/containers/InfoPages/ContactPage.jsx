import PageHeader from '../../../dummies/PageHeader/PageHeader';

export default function ContactPage() {
  return (
    <div className="page">
      <PageHeader title="יצירת קשר" />
      <p>
        ניתן לפנות אלינו במייל{' '}
        <span className="ltr-inline" dir="ltr">
          contact@shluvot.co.il
        </span>
        . (תוכן placeholder.)
      </p>
    </div>
  );
}
