import { SETTINGS, KEYBINDINGS } from "./settings";


export class FabulousTokenDragRuler extends foundry.canvas.placeables.tokens.TokenRuler {
  static instances: FabulousTokenDragRuler[] = [];

  previousRefreshData: foundry.canvas.placeables.tokens.TokenRuler.Data | undefined = undefined;

  /**
   * Returns whether or not the drag ruler should be displayed
   */
  static get shouldDraw() {
    const globalSetting = canvas?.scene?.grid.type === 0 ? (game.settings?.get(__MODULE_ID__, SETTINGS.enableDragRulerGridless) ?? false) : (game.settings?.get(__MODULE_ID__, SETTINGS.enableDragRulerGridded) ?? true)

    const binding = game.keybindings?.get(__MODULE_ID__, KEYBINDINGS.showTokenDragRuler);
    const keyHeld = binding?.some(({ key }) => game.keyboard?.downKeys.has(key));

    // TODO: Scene override
    return globalSetting || keyHeld;
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
    super._getWaypointLabelContext(waypoint, state)
  }

  _getWaypointStyle(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint) {
    return this.setStyleAlpha(super._getWaypointStyle(waypoint));
  }

  _getGridHighlightStyle(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint, offset: foundry.grid.BaseGrid.Offset3D) {
    return this.setStyleAlpha(super._getGridHighlightStyle(waypoint, offset));
  }

  _getSegmentStyle(waypoint: foundry.canvas.placeables.tokens.TokenRuler.Waypoint) {
    return this.setStyleAlpha(super._getSegmentStyle(waypoint));
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