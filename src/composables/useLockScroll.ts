import { onUnmounted } from "vue";
import { getLenis } from "./useSmoothScroll.js";
let locks = 0;
let previousOverflow = "";
export function useLockScroll() {
  let locked = false;
  function lock() {
    if (locked) return;
    locked = true;
    if (locks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      getLenis()?.stop();
    }
  }
  function unlock() {
    if (!locked) return;
    locked = false;
    if (--locks === 0) {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
    }
  }
  onUnmounted(unlock);
  return { lock, unlock };
}
