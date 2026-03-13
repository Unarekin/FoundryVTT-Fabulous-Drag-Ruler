import { FabulousTokenDragRuler } from "TokenDragRuler";
import "./config";
import { SegmentStyleOverrideApplication } from "./applications"

export const SETTINGS = {
  enableDragRulerGridless: "enableDragRulerGridless",
  enableDragRulerGridded: "enableDragRulerGridded",
  userSegmentStyle: "userSegmentStyle"
} as const

export const KEYBINDINGS = {
  showTokenDragRuler: "showTokenDragRuler"
} as const

Hooks.once("init", () => {
  if (game.settings) {

    game.settings.register(__MODULE_ID__, SETTINGS.enableDragRulerGridded, {
      name: "FABDRAGRULER.SETTINGS.ENABLEGRIDDED.LABEL",
      hint: "FABDRAGRULER.SETTINGS.ENABLEGRIDDED.HINT",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: false
    });

    game.settings.register(__MODULE_ID__, SETTINGS.enableDragRulerGridless, {
      name: "FABDRAGRULER.SETTINGS.ENABLEGRIDLESS.LABEL",
      hint: "FABDRAGRULER.SETTINGS.ENABLEGRIDLESS.HINT",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: false
    });


    game.settings.registerMenu(__MODULE_ID__, "userSegmentStyleMenu", {
      name: "FABDRAGRULER.SETTINGS.SEGMENTSTYLEOVERRIDE.LABEL",
      hint: "FABDRAGRULER.SETTINGS.SEGMENTSTYLEOVERRIDE.HINT",
      label: "FABDRAGRULER.SETTINGS.SEGMENTSTYLEOVERRIDE.LABEL",
      icon: "fa-solid fa-arrow-trend-up",
      restricted: false,
      type: SegmentStyleOverrideApplication
    });

    game.settings.register(__MODULE_ID__, SETTINGS.userSegmentStyle, {
      name: "FABDRAGRULER.SETTINGS.USERSEGMENTSTYLE",
      config: false,
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      scope: "user" as any,
      default: {
        enabled: false
      }
    });
  }


  if (game.keybindings) {
    game.keybindings.register(__MODULE_ID__, KEYBINDINGS.showTokenDragRuler, {
      name: game.i18n?.localize("FABDRAGRULER.KEYBINDINGS.SHOWTOKENDRAGRULER"),
      editable: [
        {
          key: "ShiftLeft"
        },
        {
          key: "ShiftRight"
        }
      ],
      restricted: false,
      precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
      onDown: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (CONFIG.Token.rulerClass instanceof FabulousTokenDragRuler || (CONFIG.Token.rulerClass as any).prototype === FabulousTokenDragRuler.prototype)
          FabulousTokenDragRuler.toggleVisibility();
      },
      onUp: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (CONFIG.Token.rulerClass instanceof FabulousTokenDragRuler || (CONFIG.Token.rulerClass as any).prototype === FabulousTokenDragRuler.prototype)
          FabulousTokenDragRuler.toggleVisibility();
      }
    })
  }
});

