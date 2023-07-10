import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { SESSION_STATUS } from '../constants/session';
import { routes } from '../routes';

export const useAuth = () => {
  const account = useSelector((state) => state.account);
  if (account.status === SESSION_STATUS.LOGGED_IN) {
    return true;
  } else if (account.status === SESSION_STATUS.LOGGED_OUT) {
    return false;
  }
  return null;
};

export const useRedirectAuthAccount = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth === true) {
      const next = new URLSearchParams(location.search).get('next');
      if (next) {
        navigate(next);
      } else {
        navigate(routes.DASHBOARD.path);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
};
