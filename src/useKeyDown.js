import { useRef } from 'react';

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
  const isMeta = useRef(false);
  const isShift = useRef(false);
  const isAlt = useRef(false);
  const isCtrl = useRef(false);
  const isPrevent = useRef(false);
  /**
   *
   * @param {React.KeyboardEvent} e
   */
  function onKeyDown(e) {
    switch (e.key.toLowerCase()) {
      case code: {
        // as same as isMeta && !e.metaKey || !isMeta && e.metaKey
        if (isMeta.current ^ e.metaKey) {
          return;
        }
        if (isShift.current ^ e.shiftKey) {
          return;
        }
        if (isAlt.current ^ e.altKey) {
          return;
        }
        if (isCtrl.current ^ e.ctrlKey) {
          return;
        }
        if (isPrevent.current) {
          e.preventDefault();
        }
        callback(e);
        break;
      }
      default:
        break;
    }
  }
  Object.defineProperties(onKeyDown, {
    prevent: {
      get() {
        isPrevent.current = true;
        return this;
      },
    },
    meta: {
      get() {
        isMeta.current = true;
        return this;
      },
    },
    shift: {
      get() {
        isShift.current = true;
        return this;
      },
    },
    alt: {
      get() {
        isAlt.current = true;
        return this;
      },
    },
    ctrl: {
      get() {
        isCtrl.current = true;
        return this;
      },
    },
  });
  return pipeWrapper(onKeyDown);
}
