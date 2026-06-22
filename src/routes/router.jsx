import { createBrowserRouter } from 'react-router-dom';
import Landing from '../components/containers/Landing/Landing';
import AboutPage from '../components/containers/InfoPages/AboutPage';
import ServicesPage from '../components/containers/InfoPages/ServicesPage';
import ContactPage from '../components/containers/InfoPages/ContactPage';
import UpdatesList from '../components/containers/Updates/UpdatesList';
import UpdateDetail from '../components/containers/Updates/UpdateDetail';
import Registration from '../components/containers/Registration/Registration';
import PaymentReturn from '../components/containers/PaymentReturn/PaymentReturn';
import Login from '../components/containers/Auth/Login';
import RegistrantList from '../components/containers/Admin/RegistrantList';
import ContentManager from '../components/containers/Admin/Content/ContentManager';
import ArticleManager from '../components/containers/Admin/Articles/ArticleManager';
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
      { path: 'updates', element: <UpdatesList /> },
      { path: 'updates/:slug', element: <UpdateDetail /> },
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
      {
        path: 'admin/content',
        element: (
          <RequireAuth>
            <ContentManager />
          </RequireAuth>
        ),
      },
      {
        path: 'admin/articles',
        element: (
          <RequireAuth>
            <ArticleManager />
          </RequireAuth>
        ),
      },
    ],
  },
]);
