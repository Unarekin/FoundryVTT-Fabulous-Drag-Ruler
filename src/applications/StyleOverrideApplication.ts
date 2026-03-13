import { DeepPartial, OverrideConfig, StyleOverrideKey } from "types"
import { StyleOverrideConfiguration, StyleOverrideContext, StyleOverrideOptions } from "./types"
import { SETTINGS } from "settings";

export abstract class StyleOverrideApplication extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2<StyleOverrideContext, StyleOverrideConfiguration, StyleOverrideOptions>) {

  static DEFAULT_OPTIONS: DeepPartial<StyleOverrideConfiguration> = {
    position: {
      width: 400
    },
    tag: "form",
    form: {
      closeOnSubmit: true,
      submitOnChange: false,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      handler: StyleOverrideApplication.onSubmit
    },
    actions: {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      cancel: StyleOverrideApplication.Cancel,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      resetToDefault: StyleOverrideApplication.ResetToDefault
    }
  }

  protected abstract getDefaultStyle(): Record<string, unknown>;
  protected applyDefaultStyle(): void {
    const style = this.getDefaultStyle();
    const entries = Object.entries(style);
    for (const [key, value] of entries) {
      const elem = this.element.querySelector(`[name="config.style.${key}"]`);
      if (elem instanceof HTMLElement) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (elem as any).value = value as string
        elem.dispatchEvent(new Event("change"))
      }
    }
  }

  static async Cancel(this: StyleOverrideApplication) {
    await this.close();
  }

  static ResetToDefault(this: StyleOverrideApplication) {
    this.applyDefaultStyle();
  }


  static async onSubmit(this: StyleOverrideApplication, event: Event, form: HTMLFormElement, formData: foundry.applications.ux.FormDataExtended) {
    if (!game.settings) return;
    const data = ((foundry.utils.expandObject(formData.object) as Record<string, unknown>).config) as OverrideConfig<foundry.canvas.placeables.tokens.TokenRuler.SegmentStyle>;
    await game.settings.set(__MODULE_ID__, SETTINGS.userSegmentStyle, data)
  }

  async _prepareContext(options: StyleOverrideOptions) {
    const context = await super._prepareContext(options);

    context.idPrefix = foundry.utils.randomID();

    context.config = foundry.utils.mergeObject(
      {
        style: foundry.utils.deepClone(this.getDefaultStyle()),
      },
      game.settings?.get(__MODULE_ID__, this.settingKey) ?? {}
    );

    context.buttons = [
      { type: "button", label: "Cancel", icon: "fa-solid fa-times", action: "cancel" },
      { type: "submit", label: "Save", icon: "fa-solid fa-save" }
    ]

    return context;
  }

  constructor(protected settingKey: StyleOverrideKey, options?: DeepPartial<StyleOverrideConfiguration>) {
    super(options)


  }
}