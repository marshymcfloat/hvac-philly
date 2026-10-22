<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import SiteIcon from "./SiteIcon.vue";
import { useLockScroll } from "../composables/useLockScroll.ts";

const props = defineProps({
  images: { type: Array, required: true },
  index: { type: Number, default: null },
});
const emit = defineEmits(["update:index"]);
const active = computed(() => props.index === null ? null : props.images[props.index]);
const closeButton = ref(null);
const overlay = ref(null);
const { lock, unlock } = useLockScroll();
let previousFocus;
let app;
let previousInert;

function close() { emit("update:index", null); }
function move(direction) {
  emit("update:index", (props.index + direction + props.images.length) % props.images.length);
}
function release() {
  if (app) app.inert = previousInert;
  unlock();
  previousFocus?.focus({ preventScroll: true });
  previousFocus = null;
  app = null;
}
watch(() => props.index, async (index, previous) => {
  if (index !== null && previous === null) {
    previousFocus = document.activeElement;
    app = document.getElementById("app");
    previousInert = app?.inert;
    lock();
    if (app) app.inert = true;
    await nextTick();
    if (props.index !== null) closeButton.value?.focus();
  } else if (index === null) release();
});
onUnmounted(release);

function handleKey(event) {
  if (event.key === "Escape") { event.preventDefault(); close(); }
  if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  if (event.key !== "Tab") return;
  const buttons = [...overlay.value.querySelectorAll("button")];
  const first = buttons[0];
  const last = buttons[buttons.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="active" ref="overlay" class="image-lightbox" role="dialog" aria-modal="true"
      aria-label="Philly HVAC Pros image gallery" data-lenis-prevent
      @keydown="handleKey" @click.self="close">
      <div class="lightbox-toolbar">
        <p>Philly HVAC Pros<span>Image {{ index + 1 }} of {{ images.length }}</span></p>
        <button ref="closeButton" type="button" aria-label="Close image gallery" @click="close"><SiteIcon name="close" /></button>
      </div>
      <figure class="lightbox-figure">
        <img :key="active.src" :src="active.src" :alt="active.alt" width="1536" height="1024" />
        <figcaption aria-live="polite"><strong>{{ active.title }}</strong><span>{{ active.description }}</span></figcaption>
      </figure>
      <div class="lightbox-navigation" aria-label="Image navigation">
        <button type="button" aria-label="Previous image" @click="move(-1)"><SiteIcon name="left" /></button>
        <p>{{ String(index + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}</p>
        <button type="button" aria-label="Next image" @click="move(1)"><SiteIcon /></button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.image-lightbox { position: fixed; inset: 0; z-index: 2147483647; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: 20px; width: 100%; height: 100dvh; padding: max(20px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left)); overflow-y: auto; overscroll-behavior: contain; background: var(--brand-dark); color: #fff; }
.lightbox-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; width: min(1280px, 100%); margin-inline: auto; }
.lightbox-toolbar p { font-size: 16px; line-height: 1.5; }
.lightbox-toolbar p span { display: block; font-size: 14px; color: var(--surface-muted); }
.image-lightbox button { display: grid; place-items: center; flex-shrink: 0; width: 48px; height: 48px; padding: 0; border: 1px solid color-mix(in srgb, var(--brand-primary) 40.0%, transparent); border-radius: 4px; color: #fff; background: #ffffff08; cursor: pointer; transition: background 180ms; }
.image-lightbox button:hover { background: #ffffff20; }
.image-lightbox button:focus-visible { outline: 3px solid var(--surface-muted); outline-offset: 4px; }
.image-lightbox svg { width: 24px; height: 24px; }
.lightbox-figure { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 18px; min-height: 0; width: min(1280px, 100%); margin: 0 auto; pointer-events: none; }
.lightbox-figure img { flex: 0 1 auto; width: 100%; height: auto; max-height: calc(100dvh - 220px); min-height: 0; object-fit: contain; }
.lightbox-figure figcaption { display: grid; gap: 6px; max-width: 700px; text-align: center; margin-inline: auto; font-size: 14px; line-height: 1.5; }
.lightbox-figure strong { font-size: 18px; font-weight: 500; }
.lightbox-figure figcaption > span { color: var(--surface-muted); }
.lightbox-navigation { display: flex; align-items: center; justify-content: center; gap: 24px; }
.lightbox-navigation p { font-size: 14px; font-variant-numeric: tabular-nums; letter-spacing: 1px; }
@media (max-height: 480px) { .image-lightbox { gap: 10px; padding-block: 12px; } .lightbox-figure figcaption > span { display: none; } .lightbox-figure { gap: 10px; } }
@media (prefers-reduced-motion: reduce) { .image-lightbox button { transition: none; } }
</style>
