import React, { useEffect } from 'react';
import useKeyDown from './useKeyDown';

export default function App() {
  const onKeyDownF = useKeyDown('\\', () => {
    alert('foo');
  });
  const onKeyDownL = useKeyDown('l', () => {
    alert('l');
  });
  useEffect(() => {
    const func = onKeyDownF.meta.prevent.pipe(onKeyDownL.ctrl);
    document.body.addEventListener('keydown', func);
    return () => {
      document.body.addEventListener('keydown', func);
    };
  }, []);

  return <h1>foobar</h1>;
}
