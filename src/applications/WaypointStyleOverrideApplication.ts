import { DeepPartial } from "types";
import { StyleOverrideApplication } from "./StyleOverrideApplication";
import { StyleOverrideConfiguration } from "./types";

export class WaypointStyleOverrideApplication extends StyleOverrideApplication {
  static DEFAULT_OPTIONS = {
    window: {
      title: "FABDRAGRULER.CONFIG.WAYPOINT.TITLE",
      contentClasses: ["standard-form"],
    }
  }

  static PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
    base: {
      template: `modules/${__MODULE_ID__}/templates/waypointOverrides.hbs`,
    },
    footer: {
      template: "templates/generic/form-footer.hbs",
    }
  }

  protected getDefaultStyle(): Record<string, unknown> {
    return {
      // fvtt-types does not include canvas.dimensions.uiScale, though it does exist in v13
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      radius: 6 * ((canvas?.dimensions as any)?.uiScale ?? 1),
      color: game.user?.color ?? 0x000000,
      alpha: 1
    }
  }
  constructor(options?: DeepPartial<StyleOverrideConfiguration>) {
    super("userWaypointStyle", options);
  }

}