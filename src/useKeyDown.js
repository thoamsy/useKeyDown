// I don't know how to write the file to ts

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

const dontLaunchInType = (code = '') => /^[a-z\\,./;']$/.test(code);

/**
 *
 * @param {string} code  bind keyboard
 * @param {function} callback keyboard event callback
 * @returns {import('../useKeyDown').onKeyDown}
 * a function that can use be compose another keydown event
 */
export default function useKeyDown(code, callback) {
  const isMeta = useRef(false);
  const isShift = useRef(false);
  const isAlt = useRef(false);
  const isCtrl = useRef(false);
  const isPrevent = useRef(false);

  function onKeyDown(e) {
    const tagName = document.activeElement?.tagName?.toLowerCase() ?? '';
    const canType = tagName === 'input' || tagName === 'textarea';
    if (
      canType &&
      dontLaunchInType(code) &&
      e.currentTarget !== document.activeElement
    ) {
      return;
    }
    switch (e.key.toLowerCase()) {
      case code: {
        // as same as isMeta.current && !e.metaKey || !isMeta.current && e.metaKey or e.metaKey ^ isMeta.current
        if (isMeta.current !== e.metaKey) {
          return;
        }
        if (isShift.current !== e.shiftKey) {
          return;
        }
        if (isAlt.current !== e.altKey) {
          return;
        }
        if (isCtrl.current !== e.ctrlKey) {
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
