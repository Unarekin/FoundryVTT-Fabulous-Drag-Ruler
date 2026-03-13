
export interface StyleOverrideContext extends foundry.applications.api.ApplicationV2.RenderContext {
  idPrefix: string;
  config: Record<string, unknown>;
  buttons: foundry.applications.api.ApplicationV2.FormFooterButton[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StyleOverrideOptions extends foundry.applications.api.ApplicationV2.RenderOptions { }

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StyleOverrideConfiguration extends foundry.applications.api.ApplicationV2.Configuration { }