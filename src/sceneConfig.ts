import { DragRulerStates } from "types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Hooks.on("renderSceneConfig", (app: foundry.applications.sheets.SceneConfig.Any, element: HTMLElement, context: foundry.applications.sheets.SceneConfig.RenderContext, options: foundry.applications.sheets.SceneConfig.RenderOptions) => {
  const container = element.querySelector(`.tab[data-group="sheet"][data-tab="grid"]`);
  if (!(container instanceof HTMLElement)) return;

  const alphaElem = container.querySelector(`[name="grid.alpha"]`);
  if (!(alphaElem instanceof HTMLElement)) return;

  const parent = alphaElem.closest(`.form-group`);
  if (!(parent instanceof HTMLElement)) return;

  const rulerState = app.document.getFlag(__MODULE_ID__, "dragRulerState") ?? "Default";


  const field = foundry.applications.fields.createFormGroup({
    label: game.i18n?.localize("FABDRAGRULER.SCENE.RULERSTATE.LABEL") ?? "",
    hint: game.i18n?.localize("FABDRAGRULER.SCENE.RULERSTATE.HINT") ?? "",
    input: foundry.applications.fields.createSelectInput({
      name: `flags.${__MODULE_ID__}.dragRulerState`,
      required: true,
      options: DragRulerStates.map(state => ({
        value: state,
        label: game.i18n?.localize(`FABDRAGRULER.SCENE.RULERSTATE.${state.toUpperCase()}`) ?? "",
        selected: rulerState === state
      }))
    })
  });

  parent.after(field);
});