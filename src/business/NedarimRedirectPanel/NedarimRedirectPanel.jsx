import Spinner from '../../dummies/Spinner/Spinner';

export default function NedarimRedirectPanel({ isLoading, error, transactionId }) {
  if (isLoading) {
    return <Spinner label="מעבירים אתכם לתשלום מאובטח..." />;
  }

  if (error) {
    return <p style={{ color: '#a13d3d' }}>אירעה שגיאה ביצירת התשלום. נסו שוב או צרו קשר עם המשרד.</p>;
  }

  if (transactionId) {
    // TODO-CONFIRM-WITH-NEDARIM-PLUS-SUPPORT: כאן יוטמע ה-iframe המאוחסן ע"י נדרים פלוס
    // (src + PostNedarim()/ReadPostMessage() לפי §4 בתוכנית), פרמטרים מדויקים עדיין לא מאומתים.
    return <p>טוען טופס תשלום מאובטח (transactionId: {transactionId})...</p>;
  }

  return null;
}
