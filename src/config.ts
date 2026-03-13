import { DragRulerState, OverrideConfig } from "./types"
declare module "fvtt-types/configuration" {
  // TODO Figure out why SettingConfig in particular doesn't seem to play nicely with dynamic property names
  interface SettingConfig {
    "fabulous-drag-ruler.enableDragRulerGridless": boolean;
    "fabulous-drag-ruler.enableDragRulerGridded": boolean;
    "fabulous-drag-ruler.userSegmentStyle": OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.SegmentStyle>;
    "fabulous-drag-ruler.userWaypointStyle": OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.WaypointStyle>;

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