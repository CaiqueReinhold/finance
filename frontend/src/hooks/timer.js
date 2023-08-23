import { useEffect, useState } from 'react';

export const useTimer = (component, seconds, start) => {
  const [show, setShow] = useState(null);
  useEffect(() => {
    if (start) {
      setShow(true);
    }
    const interval = setTimeout(() => {
      setShow(false);
    }, 1000 * seconds);
    return () => clearTimeout(interval);
  }, [seconds, start]);
  return show ? component : null;
};
