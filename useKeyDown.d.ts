export interface onKeyDown {
  (...args: any[]): any;
  readonly meta: boolean;
  readonly shift: boolean;
  readonly ctrl: boolean;
  readonly alt: boolean;
  readonly prevent: boolean;
  pipe: (...args: any[]) => any;
}
