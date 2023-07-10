import { useEffect, useState } from 'react';

export const useTimer = (component, seconds, start) => {
  const [show, setShow] = useState(null);
  useEffect(() => {
    console.log('useTimer', start);
    if (start) {
      setShow(true);
    }
    const interval = setTimeout(() => {
      setShow(false);
      console.log('useTimer', 'clear');
    }, 1000 * seconds);
    return () => clearTimeout(interval);
  }, [seconds, start]);
  return show ? component : null;
};
