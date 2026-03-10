import "./config";

export const SETTINGS = {
  enableDragRulerGridless: "enableDragRulerGridless",
  enableDragRulerGridded: "enableDragRulerGridded"
} as const

Hooks.once("init", () => {
  if (!game.settings) return;

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


})