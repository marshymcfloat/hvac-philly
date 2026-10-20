import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
let instance;
export const getLenis = () => instance;
export function useSmoothScroll() {
  onMounted(() => {
    instance = new Lenis({ autoRaf: true, anchors: true, smoothWheel: true, lerp: 0.1, respectReducedMotion: true, stopInertiaOnNavigate: true });
    if (document.body.style.overflow === "hidden") instance.stop();
  });
  onUnmounted(() => { instance?.destroy(); instance = undefined; });
}
