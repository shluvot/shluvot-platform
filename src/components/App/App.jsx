import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '../../store/configureStore';
import { router } from '../../routes/router';
import { restoreSession } from '../containers/Auth/actions/authActions';
import { loadSiteContent } from '../containers/SiteContent/actions/siteContentActions';

function AppBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
    dispatch(loadSiteContent());
  }, [dispatch]);

  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppBootstrap>
        <RouterProvider router={router} />
      </AppBootstrap>
    </Provider>
  );
}
