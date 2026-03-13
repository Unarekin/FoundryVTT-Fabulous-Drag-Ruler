export type IsObject<T> = T extends Readonly<Record<string, any>>
  ? T extends AnyArray | AnyFunction
  ? false
  : true
  : false;

/**
 * Recursively sets keys of an object to optional. Used primarily for update methods
 * @internal
 */
export type DeepPartial<T> = T extends unknown
  ? IsObject<T> extends true
  ? {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  : T
  : T;

export type AnyArray = readonly unknown[];
export type AnyFunction = (arg0: never, ...args: never[]) => unknown;

export const DragRulerStates = ["default", "enabled", "disabled"] as const;
export type DragRulerState = typeof DragRulerStates[number];

export const StyleOverrideKeys = ["userSegmentStyle", "userWaypointStyle"] as const;
export type StyleOverrideKey = typeof StyleOverrideKeys[number];

export interface OverrideConfig<style> {
  enabled: boolean;
  style?: style;
}