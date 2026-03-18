import "./settings";
import "./sceneConfig";
import { DragRulerMixin } from "./TokenDragRuler";

// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// CONFIG.Token.rulerClass = FabulousTokenDragRuler as any;

// Delay mixin until last possible hook before tokens are created
Hooks.on("canvasConfig", () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  CONFIG.Token.rulerClass = DragRulerMixin(CONFIG.Token.rulerClass as any) as any;
})