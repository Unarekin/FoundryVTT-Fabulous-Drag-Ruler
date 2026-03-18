import { DragRulerState, OverrideConfig } from "./types";
declare module "fvtt-types/configuration" {
    interface SettingConfig {
        "fabulous-drag-ruler.enableDragRulerGridless": boolean;
        "fabulous-drag-ruler.enableDragRulerGridded": boolean;
        "fabulous-drag-ruler.disableOutOfCombat": boolean;
    }
    interface FlagConfig {
        Scene: {
            [__MODULE_ID__]: {
                "dragRulerState": DragRulerState;
            };
        };
        User: {
            [__MODULE_ID__]: {
                userSegmentStyle?: OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.SegmentStyle>;
                userWaypointStyle?: OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.WaypointStyle>;
                userGridHighlightStyle?: OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.GridHighlightStyle>;
            };
        };
    }
}
export {};
