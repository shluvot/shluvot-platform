import { useSelector } from 'react-redux';
import PageHeader from '../../../dummies/PageHeader/PageHeader';

export default function AboutPage() {
  const body = useSelector((state) => state.siteContent.blocks.about_page?.body) ?? '';

  return (
    <div className="page">
      <PageHeader title="אודות שלובות" />
      {body.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
