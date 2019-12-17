# useKeyDown

Use it to register keyboard event quickly, coding happy. 🥰

## Quick Start

Take is Cheap, below is the code.

```jsx
export default function App() {
  const onKeyDownF = useKeyDown('f', e => {
    console.log(e);
    alert('foo');
  });
  const onKeyDownL = useKeyDown('l', e => {
    console.log(e);
    alert('l');
  });
  const onKeydownArrowUp = useKeyDown('arrowup', e => {
    console.log(e);
    alert('i am up');
  });
  useEffect(() => {
    const func = onKeyDownF.shift.meta.prevent
      .pipe(onKeyDownL.ctrl)
      .pipe(onKeydownArrowUp.meta);
    document.body.addEventListener('keydown', func);
    return () => {
      document.body.addEventListener('keydown', func);
    };
  }, []);

  return <h1>foobar</h1>;
}
```

## Args

Supports:  `ctrl, meta, alt, shift, prevent`。
