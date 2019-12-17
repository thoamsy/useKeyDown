function pipeWrapper(func) {
  Object.defineProperty(func, 'pipe', {
    value(nextFunc) {
      if (typeof nextFunc !== 'function') {
        return func;
      }
      return pipeWrapper((...args) => {
        func(...args);
        nextFunc(...args);
      });
    },
  });
  return func;
}
export default function useKeyDown(code, callback) {
  let isMeta = false;
  let isShift = false;
  let isAlt = false;
  let isCtrl = false;

  let isPrevent = false;
  /**
   *
   * @param {React.KeyboardEvent} e
   */
  function onKeyDown(e) {
    switch (e.key.toLowerCase()) {
      case code: {
        // as same as isMeta && !e.metaKey || !isMeta && e.metaKey
        if (isMeta ^ e.metaKey) {
          return;
        }
        if (isShift ^ e.shiftKey) {
          return;
        }
        if (isAlt ^ e.altKey) {
          return;
        }
        if (isCtrl ^ e.ctrlKey) {
          return;
        }
        if (isPrevent) {
          e.preventDefault();
        }
        callback();
        break;
      }
      default:
        break;
    }
  }
  Object.defineProperty(onKeyDown, 'prevent', {
    get() {
      isMeta = true;
      return onKeyDown;
    },
  });
  Object.defineProperty(onKeyDown, 'meta', {
    get() {
      isMeta = true;
      return onKeyDown;
    },
  });
  Object.defineProperty(onKeyDown, 'shift', {
    get() {
      isShift = true;
      return onKeyDown;
    },
  });
  Object.defineProperty(onKeyDown, 'alt', {
    get() {
      isAlt = true;
      return onKeyDown;
    },
  });
  Object.defineProperty(onKeyDown, 'ctrl', {
    get() {
      isCtrl = true;
      return onKeyDown;
    },
  });
  return pipeWrapper(onKeyDown);
}
