import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '../../store/configureStore';
import { router } from '../../routes/router';
import { restoreSession } from '../containers/Auth/actions/authActions';

function SessionBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <SessionBootstrap>
        <RouterProvider router={router} />
      </SessionBootstrap>
    </Provider>
  );
}
