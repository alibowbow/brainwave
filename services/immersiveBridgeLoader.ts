/** Metadata is requested at an explicit selection or live scene, never by all
 * thirty renderer imports or by startup/PWA precaching. Failed loads can retry. */
let pending: Promise<typeof import('./immersiveSessionBridge')> | undefined;
export function loadImmersiveSessionBridge() {
  return pending ??= import('./immersiveSessionBridge').catch((error) => {
    pending = undefined;
    throw error;
  });
}
