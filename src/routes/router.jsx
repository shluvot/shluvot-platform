import { createBrowserRouter } from 'react-router-dom';
import Landing from '../components/containers/Landing/Landing';
import AboutPage from '../components/containers/InfoPages/AboutPage';
import ServicesPage from '../components/containers/InfoPages/ServicesPage';
import ContactPage from '../components/containers/InfoPages/ContactPage';
import Registration from '../components/containers/Registration/Registration';
import PaymentReturn from '../components/containers/PaymentReturn/PaymentReturn';
import Login from '../components/containers/Auth/Login';
import RegistrantList from '../components/containers/Admin/RegistrantList';
import RequireAuth from '../components/RequireAuth';
import AppLayout from '../components/App/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'registration', element: <Registration /> },
      { path: 'payment/return', element: <PaymentReturn /> },
      { path: 'admin/login', element: <Login /> },
      {
        path: 'admin/registrants',
        element: (
          <RequireAuth>
            <RegistrantList />
          </RequireAuth>
        ),
      },
    ],
  },
]);
