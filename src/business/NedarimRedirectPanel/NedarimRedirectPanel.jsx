import Spinner from '../../dummies/Spinner/Spinner';
import Card from '../../dummies/Card/Card';

export default function NedarimRedirectPanel({ isLoading, error, transactionId }) {
  if (isLoading) {
    return (
      <Card>
        <Spinner label="מעבירים אתכם לתשלום מאובטח..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p style={{ color: '#E0554F', fontWeight: 600, margin: 0 }}>
          {typeof error === 'string' ? error : 'אירעה שגיאה ביצירת התשלום. נסו שוב או צרו קשר עם המשרד.'}
        </p>
      </Card>
    );
  }

  if (transactionId) {
    // TODO-CONFIRM-WITH-NEDARIM-PLUS-SUPPORT: כאן יוטמע ה-iframe המאוחסן ע"י נדרים פלוס
    // (src + PostNedarim()/ReadPostMessage() לפי §4 בתוכנית), פרמטרים מדויקים עדיין לא מאומתים.
    return (
      <Card>
        <p style={{ margin: 0 }}>טוען טופס תשלום מאובטח (transactionId: {transactionId})...</p>
      </Card>
    );
  }

  return null;
}
