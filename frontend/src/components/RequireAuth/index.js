import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/session';
import { routes } from '../../routes';
import Loading from '../Loading';

function RequireAuth({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth === false) {
      navigate(
        `${routes.SIGN_IN.path}?${new URLSearchParams({
          next: location.pathname,
        }).toString()}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, location.pathname]);

  if (auth === null) {
    return <Loading />;
  }

  if (auth) {
    return children;
  }

  return null;
}

export default RequireAuth;
