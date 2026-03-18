import { FabulousTokenDragRuler } from "./types"
import "./config";
import { GridHighlightStyleOverrideApplication, SegmentStyleOverrideApplication, WaypointStyleOverrideApplication } from "./applications"

export const SETTINGS = {
  enableDragRulerGridless: "enableDragRulerGridless",
  enableDragRulerGridded: "enableDragRulerGridded",
  disableOutOfCombat: "disableOutOfCombat"
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

    game.settings.register(__MODULE_ID__, SETTINGS.disableOutOfCombat, {
      name: "FABDRAGRULER.SETTINGS.DISABLEOUTOFCOMBAT.LABEL",
      hint: "FABDRAGRULER.SETTINGS.DISABLEOUTOFCOMBAT.HINT",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: false
    })


    game.settings.registerMenu(__MODULE_ID__, "userSegmentStyleMenu", {
      name: "FABDRAGRULER.SETTINGS.SEGMENTSTYLEOVERRIDE.LABEL",
      hint: "FABDRAGRULER.SETTINGS.SEGMENTSTYLEOVERRIDE.HINT",
      label: "FABDRAGRULER.SETTINGS.SEGMENTSTYLEOVERRIDE.LABEL",
      icon: "fa-solid fa-arrow-trend-up",
      restricted: false,
      type: SegmentStyleOverrideApplication
    });

    // game.settings.register(__MODULE_ID__, SETTINGS.userSegmentStyle, {
    //   name: "FABDRAGRULER.SETTINGS.USERSEGMENTSTYLE",
    //   config: false,
    //   type: Object,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   scope: "user" as any,
    //   default: {
    //     enabled: false
    //   }
    // });

    game.settings.registerMenu(__MODULE_ID__, "userWaypointStyleMenu", {
      name: "FABDRAGRULER.SETTINGS.WAYPOINTSTYLEOVERRIDE.LABEL",
      hint: "FABDRAGRULER.SETTINGS.WAYPOINTSTYLEOVERRIDE.HINT",
      label: "FABDRAGRULER.SETTINGS.WAYPOINTSTYLEOVERRIDE.LABEL",
      icon: "fa-solid fa-circle",
      restricted: false,
      type: WaypointStyleOverrideApplication
    });

    // game.settings.register(__MODULE_ID__, SETTINGS.userWaypointStyle, {
    //   name: "FABDRAGRULER.SETTINGS.USERWAYPOINTSTYLE",
    //   config: false,
    //   type: Object,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   scope: "user" as any,
    //   default: {
    //     enabled: false
    //   }
    // });

    game.settings.registerMenu(__MODULE_ID__, "userGridHighlightStyleMenu", {
      name: "FABDRAGRULER.SETTINGS.GRIDHIGHLIGHTSTYLEOVERRIDE.LABEL",
      hint: "FABDRAGRULER.SETTINGS.GRIDHIGHLIGHTSTYLEOVERRIDE.HINT",
      label: "FABDRAGRULER.SETTINGS.GRIDHIGHLIGHTSTYLEOVERRIDE.LABEL",
      icon: "fa-solid fa-table-cells-large",
      restricted: false,
      type: GridHighlightStyleOverrideApplication
    });

    // game.settings.register(__MODULE_ID__, SETTINGS.userGridHighlightStyle, {
    //   name: "FABDRAGRULER.SETTINGS.USERGRIDHIGHLIGHTSTYLE",
    //   config: false,
    //   type: Object,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   scope: "user" as any,
    //   default: {
    //     enabled: false
    //   }
    // });
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
        const rulerClass = CONFIG.Token.rulerClass as FabulousTokenDragRuler
        if (rulerClass.toggleVisibility)
          rulerClass.toggleVisibility();
      },
      onUp: () => {
        const rulerClass = CONFIG.Token.rulerClass as FabulousTokenDragRuler
        if (rulerClass.toggleVisibility)
          rulerClass.toggleVisibility();
      }
    })
  }
});

