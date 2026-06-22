import { useSelector } from 'react-redux';
import PageHeader from '../../../dummies/PageHeader/PageHeader';

export default function ServicesPage() {
  const body = useSelector((state) => state.siteContent.blocks.services_page?.body) ?? '';

  return (
    <div className="page">
      <PageHeader title="שירותים לחברות האיגוד" />
      {body.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
