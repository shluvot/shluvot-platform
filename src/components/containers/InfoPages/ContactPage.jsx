import { useSelector } from 'react-redux';
import PageHeader from '../../../dummies/PageHeader/PageHeader';

export default function ContactPage() {
  const body = useSelector((state) => state.siteContent.blocks.contact_page?.body) ?? '';

  return (
    <div className="page">
      <PageHeader title="יצירת קשר" />
      {body.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
