// I don't know how to write the file to ts

import { useRef } from 'react';

function pipeWrapper(func: anyCallback) {
  Object.defineProperty(func, 'pipe', {
    value(nextFunc: anyCallback) {
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

const dontLaunchInType = (code: string) => /^[a-z\\,./;']$/.test(code);
type anyCallback = (...args: any[]) => any;
interface OnKeyDown {
  (...args: any[]): any;
  readonly meta: boolean;
  readonly shift: boolean;
  readonly ctrl: boolean;
  readonly alt: boolean;
  readonly prevent: boolean;
  pipe: (...args: any[]) => any;
}

export default function useKeyDown(
  code: string,
  callback: anyCallback
): OnKeyDown {
  const isMeta = useRef(false);
  const isShift = useRef(false);
  const isAlt = useRef(false);
  const isCtrl = useRef(false);
  const isPrevent = useRef(false);
  const lastKey = useRef('');
  const compose = useRef<string[]>([]);

  // this is a hack for compose keyboard, like 'ga', 'gf'
  if (code.length === 2) {
    compose.current = Array.from(code);
  }

  function onKeyDown(e: React.KeyboardEvent | KeyboardEvent) {
    const tagName = document.activeElement?.tagName?.toLowerCase() ?? '';
    const canType = tagName === 'input' || tagName === 'textarea';
    const lowerCaseKey = e.key.toLowerCase();
    if (
      canType &&
      dontLaunchInType(lowerCaseKey) &&
      e.currentTarget !== document.activeElement
    ) {
      return;
    }
    switch (lowerCaseKey) {
      case code: {
        // as same as isMeta && !e.metaKey || !isMeta && e.metaKey
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
        lastKey.current = '';
        break;
      }
      case compose.current[1]: {
        if (lastKey.current === compose.current[0]) {
          callback(e);
        }
        lastKey.current = '';
        break;
      }
      case compose.current[0]: {
        lastKey.current = compose.current[0];
        break;
      }
      default:
        lastKey.current = '';
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
  return pipeWrapper(onKeyDown) as OnKeyDown;
}
