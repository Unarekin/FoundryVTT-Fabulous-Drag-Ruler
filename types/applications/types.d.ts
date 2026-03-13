export interface StyleOverrideContext extends foundry.applications.api.ApplicationV2.RenderContext {
    idPrefix: string;
    config: Record<string, unknown>;
    buttons: foundry.applications.api.ApplicationV2.FormFooterButton[];
}
export interface StyleOverrideOptions extends foundry.applications.api.ApplicationV2.RenderOptions {
}
export interface StyleOverrideConfiguration extends foundry.applications.api.ApplicationV2.Configuration {
}
