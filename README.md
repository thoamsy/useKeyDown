# useKeyDown

用来快速注册键盘事件，提升 PC 用户幸福感。

## 开始开始

类似 vue 的写法，对返回的函数添加修饰属性，就能支持是否只有在按下特定修饰按钮的时候才触发。
如果你想注册多个事件，可以通过 `pipe` 来串联起来，`a.pipe(b)` 就类似 `a(); b();`

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

## 参数说明

支持的修饰词: `ctrl, meta, alt, shift, prevent`。 没什么好解释的
