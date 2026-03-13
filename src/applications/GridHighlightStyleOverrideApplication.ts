import { DeepPartial } from "types";
import { StyleOverrideApplication } from "./StyleOverrideApplication";
import { StyleOverrideConfiguration } from "./types";
import { SETTINGS } from "settings";

export class GridHighlightStyleOverrideApplication extends StyleOverrideApplication {
  static DEFAULT_OPTIONS = {
    window: {
      title: "FABDRAGRULER.CONFIG.GRIDHIGHLIGHT.TITLE",
      contentClasses: ["standard-form"],
    }
  }

  static PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
    base: {
      template: `modules/${__MODULE_ID__}/templates/gridHighlightOverrides.hbs`,
    },
    footer: {
      template: "templates/generic/form-footer.hbs",
    }
  }

  protected getDefaultStyle(): Record<string, unknown> {
    return {
      alpha: 0.5,
      color: game.user?.color ?? 0x000000
    }
  }

  constructor(options?: DeepPartial<StyleOverrideConfiguration>) {
    super(SETTINGS.userGridHighlightStyle, options);
  }
}