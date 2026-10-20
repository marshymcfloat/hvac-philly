<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: String, default: "" },
  options: { type: Array, required: true },
  labelledby: { type: String, required: true },
  describedby: { type: String, default: undefined },
  invalid: Boolean,
  required: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const root = ref(null);
const trigger = ref(null);
const list = ref(null);
const open = ref(false);
const above = ref(false);
const active = ref(0);
const selected = computed(() => props.options.find(option => option.value === props.modelValue));
let search = "";
let searchTimer;
function revealActive() {
  nextTick(() => {
    const option = list.value?.children[active.value];
    if (!option) return;
    if (option.offsetTop < list.value.scrollTop) list.value.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.value.scrollTop + list.value.clientHeight)
      list.value.scrollTop = option.offsetTop + option.offsetHeight - list.value.clientHeight;
  });
}
function show() {
  const rect = trigger.value.getBoundingClientRect();
  const height = Math.min(320, window.innerHeight * .45);
  above.value = window.innerHeight - rect.bottom < height + 12 && rect.top > height + 12;
  active.value = Math.max(0, props.options.findIndex(option => option.value === props.modelValue));
  open.value = true;
  revealActive();
}
function choose(index) {
  emit("update:modelValue", props.options[index].value);
  open.value = false;
  trigger.value.focus({ preventScroll: true });
}
function handleKey(event) {
  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    if (!open.value) show();
    else if (event.key === "ArrowDown") active.value = (active.value + 1) % props.options.length;
    else if (event.key === "ArrowUp") active.value = (active.value - 1 + props.options.length) % props.options.length;
    if (event.key === "Home") active.value = 0;
    if (event.key === "End") active.value = props.options.length - 1;
    revealActive();
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (open.value) choose(active.value); else show();
  } else if (event.key === "Escape") {
    if (open.value) event.preventDefault();
    open.value = false;
  } else if (event.key === "Tab") open.value = false;
  else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    if (!open.value) show();
    clearTimeout(searchTimer);
    search += event.key.toLowerCase();
    const match = props.options.findIndex(option => option.label.toLowerCase().startsWith(search));
    if (match !== -1) { active.value = match; revealActive(); }
    searchTimer = setTimeout(() => { search = ""; }, 600);
  }
}
function outside(event) { if (!root.value?.contains(event.target)) open.value = false; }
onMounted(() => document.addEventListener("pointerdown", outside));
onUnmounted(() => { document.removeEventListener("pointerdown", outside); clearTimeout(searchTimer); });
defineExpose({ focus: () => trigger.value?.focus() });
</script>

<template>
  <div ref="root" class="custom-select" @focusout="event => { if (!root.contains(event.relatedTarget)) open = false; }">
    <button :id="id" ref="trigger" type="button" class="select-trigger" :class="{ 'is-open': open, 'is-invalid': invalid }"
      role="combobox" aria-haspopup="listbox" :aria-expanded="open" :aria-controls="`${id}-list`"
      :aria-labelledby="labelledby" :aria-describedby="describedby" :aria-invalid="invalid || undefined" :aria-required="required"
      :aria-activedescendant="open ? `${id}-option-${active}` : undefined"
      @click="open ? open = false : show()" @keydown="handleKey">
      <SiteIcon :name="selected?.icon || 'tool'" />
      <span :class="{ placeholder: !selected }">{{ selected?.label || 'Choose a service' }}</span>
      <svg class="select-chevron" :class="{ rotated: open }" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m5 7 5 5 5-5" /></svg>
    </button>
    <ul v-if="open" :id="`${id}-list`" ref="list" role="listbox" :aria-labelledby="labelledby"
      class="select-menu" :class="{ 'opens-above': above }" data-lenis-prevent>
      <li v-for="(option, index) in options" :id="`${id}-option-${index}`" :key="option.value" role="option"
        :aria-selected="modelValue === option.value" :class="{ highlighted: active === index }"
        @pointerdown.prevent @click="choose(index)" @pointermove="active = index">
        <SiteIcon :name="option.icon" /><span>{{ option.label }}</span><SiteIcon v-if="modelValue === option.value" name="check" class="select-check" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-select { position: relative; }
.select-trigger { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 54px; padding: 13px 16px; border: 1px solid #d2e3ed; border-radius: 13px; background: #f6fbfe; color: #183343; text-align: left; font-size: 15px; }
.select-trigger > svg { width: 22px; height: 22px; flex-shrink: 0; color: #178ac0; }
.select-trigger > span { flex: 1; }
.select-trigger .placeholder { color: #647b8a; }
.select-trigger .select-chevron { width: 18px; height: 18px; transition: transform 180ms; }
.select-chevron.rotated { transform: rotate(180deg); }
.select-trigger.is-open { border-color: #178ac0; background: #fff; }
.select-trigger.is-invalid { border-color: #b84141; }
.select-trigger:focus-visible { outline: 3px solid #178ac044; outline-offset: 2px; border-color: #178ac0; }
.select-menu { position: absolute; z-index: 10; top: calc(100% + 8px); left: 0; right: 0; margin: 0; padding: 7px; max-height: min(320px, 45dvh); overflow-y: auto; overscroll-behavior: contain; list-style: none; border: 1px solid #cde4f2; border-radius: 16px; background: #fff; box-shadow: 0 16px 45px #14567626; }
.select-menu.opens-above { top: auto; bottom: calc(100% + 8px); }
.select-menu li { display: flex; align-items: center; gap: 12px; min-height: 48px; padding: 11px 12px; border-radius: 10px; cursor: pointer; color: #23485e; font-size: 15px; }
.select-menu li.highlighted { background: #eaf7ff; color: #116f9b; }
.select-menu li[aria-selected="true"] { font-weight: 500; }
.select-menu svg { width: 21px; height: 21px; flex-shrink: 0; color: #178ac0; }
.select-menu .select-check { margin-left: auto; width: 18px; }
@media (prefers-reduced-motion: reduce) { .select-trigger .select-chevron { transition: none; } }
@media (max-width: 540px) { .select-trigger { font-size: 16px; gap: 8px; padding-inline: 12px; } .select-menu li { gap: 8px; padding-inline: 9px; } }
</style>
