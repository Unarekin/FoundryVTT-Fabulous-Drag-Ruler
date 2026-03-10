export const DragRulerStates = ["default", "enabled", "disabled"] as const;
export type DragRulerState = typeof DragRulerStates[number];