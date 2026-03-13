import { DeepPartial } from "types";
import { StyleOverrideApplication } from "./StyleOverrideApplication";
import { StyleOverrideConfiguration } from "./types";
export declare class WaypointStyleOverrideApplication extends StyleOverrideApplication {
    static DEFAULT_OPTIONS: {
        window: {
            title: string;
            contentClasses: string[];
        };
    };
    static PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;
    protected getDefaultStyle(): Record<string, unknown>;
    constructor(options?: DeepPartial<StyleOverrideConfiguration>);
}
