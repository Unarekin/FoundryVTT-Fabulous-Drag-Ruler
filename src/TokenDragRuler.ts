import { SETTINGS, KEYBINDINGS } from "./settings";


export function DragRulerMixin(base: typeof foundry.canvas.placeables.tokens.TokenRuler): typeof foundry.canvas.placeables.tokens.TokenRuler {
  return class FabulousTokenDragRuler extends base {
    static instances: FabulousTokenDragRuler[] = [];

    previousRefreshData: foundry.canvas.placeables.tokens.TokenRuler.Data | undefined = undefined;

    /**
     * Returns whether or not the drag ruler should be displayed
     */
    static get shouldDraw() {
      if (!canvas?.scene) return false;

      const binding = game.keybindings?.get(__MODULE_ID__, KEYBINDINGS.showTokenDragRuler);
      const keyHeld = binding?.some(({ key }) => game.keyboard?.downKeys.has(key));
      if (keyHeld) return true;

      const sceneSetting = canvas.scene.getFlag(__MODULE_ID__, "dragRulerState");
      if (sceneSetting === "enabled") return true;
      else if (sceneSetting === "disabled") return false;

      if (game.settings?.get(__MODULE_ID__, SETTINGS.disableOutOfCombat) && !game.combat?.started) return false;

      const globalSetting = canvas?.scene?.grid.type === 0 ? (game.settings?.get(__MODULE_ID__, SETTINGS.enableDragRulerGridless) ?? false) : (game.settings?.get(__MODULE_ID__, SETTINGS.enableDragRulerGridded) ?? true)
      return globalSetting;
    }

    refresh(data: foundry.canvas.placeables.tokens.TokenRuler.Data) {
      this.previousRefreshData = foundry.utils.deepClone(data);

      super.refresh(data);
    }

    static toggleVisibility() {
      FabulousTokenDragRuler.instances.forEach((instance) => {
        if (instance.previousRefreshData)
          instance.refresh(instance.previousRefreshData)
      });
    }

    protected get shouldDraw() { return FabulousTokenDragRuler.shouldDraw; }

    protected setStyleAlpha<t>(style: t & { alpha?: number }): t {
      if (!FabulousTokenDragRuler.shouldDraw) style.alpha = 0;
      return style;
    }

    _getWaypointLabelContext(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint, state: foundry.canvas.placeables.tokens.TokenRuler.State) {
      if (!FabulousTokenDragRuler.shouldDraw) return undefined;
      return super._getWaypointLabelContext(waypoint, state)
    }

    _getWaypointStyle(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint) {
      const style = super._getWaypointStyle(waypoint);
      const override = game.users?.get(waypoint.userId!)?.getFlag(__MODULE_ID__, "userWaypointStyle");
      if (override?.enabled)
        foundry.utils.mergeObject(style, override.style);

      return this.setStyleAlpha(style);
    }

    _getGridHighlightStyle(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint, offset: foundry.grid.BaseGrid.Offset3D) {
      const style = super._getGridHighlightStyle(waypoint, offset);
      const override = game.users?.get(waypoint.userId!)?.getFlag(__MODULE_ID__, "userGridHighlightStyle");
      if (override?.enabled)
        foundry.utils.mergeObject(style, override.style);

      return this.setStyleAlpha(style);
    }

    _getSegmentStyle(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint) {
      const style = super._getSegmentStyle(waypoint);
      const override = game.users?.get(waypoint.userId!)?.getFlag(__MODULE_ID__, "userSegmentStyle");
      if (override?.enabled)
        foundry.utils.mergeObject(style, override.style);

      return this.setStyleAlpha(style);
    }

    destroy() {
      const index = FabulousTokenDragRuler.instances.indexOf(this);
      if (index !== -1) FabulousTokenDragRuler.instances.splice(index, 1);
      return super.destroy()
    }

    constructor(token: foundry.canvas.placeables.Token.Implementation) {
      super(token)
      FabulousTokenDragRuler.instances.push(this);
    }
  }
}
