import { DragRulerState, OverrideConfig } from "./types";
declare module "fvtt-types/configuration" {
    interface SettingConfig {
        "fabulous-drag-ruler.enableDragRulerGridless": boolean;
        "fabulous-drag-ruler.enableDragRulerGridded": boolean;
        "fabulous-drag-ruler.userSegmentStyle": OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.SegmentStyle>;
        "fabulous-drag-ruler.userWaypointStyle": OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.WaypointStyle>;
        "fabulous-drag-ruler.userGridHighlightStyle": OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.GridHighlightStyle>;
    }
    interface FlagConfig {
        Scene: {
            [__MODULE_ID__]: {
                "dragRulerState": DragRulerState;
            };
        };
    }
}
export {};
