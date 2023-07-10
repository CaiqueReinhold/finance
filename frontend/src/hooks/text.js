import { useEffect, useState } from 'react';

export const useAnimatedText = (text, frameDuration = 500) => {
  const [animatedText, setAnimatedText] = useState(text);
  const [i, setI] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText(text + '.'.repeat(i % 4));
      setI(i + 1);
    }, frameDuration);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedText, i]);
  return animatedText;
};
