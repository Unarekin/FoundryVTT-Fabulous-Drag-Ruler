import { DragRulerState } from "./types"
declare module "fvtt-types/configuration" {
  // TODO Figure out why SettingConfig in particular doesn't seem to play nicely with dynamic property names
  interface SettingConfig {
    "fabulous-drag-ruler.enableDragRulerGridless": boolean;
    "fabulous-drag-ruler.enableDragRulerGridded": boolean;
  }

  interface FlagConfig {
    Scene: {
      [__MODULE_ID__]: {
        "dragRulerState": DragRulerState;
      }
    }
  }
}
export { }