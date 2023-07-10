import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ServerError from './pages/500';
import AppRoutes from './routes';
import { initSession } from './actions/account';

import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();
  try {
    useEffect(() => {
      dispatch(initSession());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <AppRoutes />
        </Layout>
      </Suspense>
    );
  } catch (error) {
    console.error(error);
    return <ServerError />;
  }
}

export default App;
