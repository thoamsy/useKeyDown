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

Also, it supports compose keyboard shortcut, such as `gh`(goto home). But I don't want to support `ctrl` with them, or it will be very difficult to remember for human.

```jsx
const gotoHome = useKeyDown('gh', () => history.push('/home'));
useEffect(() => {
  document.body.addEventListener('keydown', gotoHome);
  return () => {
    document.body.addEventListener('keydown', gotoHome);
  };
```

## Args

Supports:  `ctrl, meta, alt, shift, prevent`。


## Others

### Why not memo the returns callback

1. memo doesn't improve the performance in our hooks
2. I don't know memo what args, `callback`? But some people always like write callback inline, like `useKeyDown('f', () => { toggleSomething() })`, it's useless
3. if you like, you can `useCallback(useKeyDown('f', something), [])`
