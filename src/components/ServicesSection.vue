<script setup>
import { computed, ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
import ImageLightbox from "./ImageLightbox.vue";
import { services } from "../siteContent.js";

defineEmits(["quote"]);
const selectedIndex = ref(0);
const lightboxIndex = ref(null);
const galleryImages = services.map(service => ({ src: service.image, alt: service.alt, title: service.name, description: service.short }));
const selected = computed(() => services[selectedIndex.value]);
function selectService(index) {
  selectedIndex.value = index;
}
</script>

<template>
  <section id="services" class="service-showcase page-section" aria-labelledby="services-title">
    <div class="service-container">
      <header class="service-heading">
        <span class="section-tag"><span aria-hidden="true"></span>Heating, Cooling &amp; More</span>
        <h2 id="services-title">Complete HVAC.<br /><span>Across the Philly metro.</span></h2>
        <p>Furnaces, boilers, AC, heat pumps, water heaters, and commercial systems. Installation, repair, and maintenance from one local team.</p>
      </header>

      <div class="service-options" role="group" aria-label="Choose an HVAC service">
        <button v-for="(service, index) in services" :key="service.id" type="button"
          class="service-option" :class="{ 'is-selected': selectedIndex === index }"
          :aria-pressed="selectedIndex === index" aria-controls="service-detail" @click="selectService(index)">
          <span class="service-option-top"><SiteIcon :name="service.icon" /><span aria-hidden="true">0{{ index + 1 }}</span></span>
          <strong>{{ service.name }}</strong>
          <span class="service-option-bottom"><span>{{ service.short }}</span><SiteIcon /></span>
        </button>
      </div>

      <article id="service-detail" class="service-feature" aria-labelledby="service-detail-title">
        <button type="button" class="service-feature-photo" :aria-label="`View full image: ${selected.name}`" aria-haspopup="dialog" @click="lightboxIndex = selectedIndex">
          <Transition name="service-photo">
            <img :key="selected.id" :src="selected.image" :srcset="selected.srcset" sizes="(min-width: 1504px) 706px, (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 58px)"
              :alt="selected.alt" width="1536" height="1024" loading="lazy" decoding="async" />
          </Transition>
          <span class="service-photo-label"><span></span>Philadelphia-area service</span>
          <div class="service-photo-caption" aria-hidden="true">
            <SiteIcon :name="selected.icon" />
            <span>{{ selected.short }}</span>
            <span class="service-photo-number">0{{ selectedIndex + 1 }} / 0{{ services.length }}</span>
          </div>
        </button>
        <div class="service-feature-content" aria-live="polite" aria-atomic="true">
          <span class="service-eyebrow">{{ selected.name }}</span>
          <h3 id="service-detail-title">{{ selected.headline }}</h3>
          <p class="service-summary service-summary-desktop">{{ selected.description }}</p>
          <p class="service-summary service-summary-mobile">{{ selected.mobileDescription }}</p>
          <ul class="service-inclusions" aria-label="Services available">
            <li v-for="item in selected.includes" :key="item.title">
              <span class="service-inclusion-icon"><SiteIcon :name="item.icon" /></span>
              <div><h4>{{ item.title }}</h4><p>{{ item.detail }}</p></div>
              <SiteIcon name="check" class="service-check" />
            </li>
          </ul>
          <button type="button" class="button button-blue service-request" @click="$emit('quote', selected.name)">
            {{ selected.action }}<SiteIcon />
          </button>
        </div>
      </article>

      <div class="service-guidance">
        <div><SiteIcon name="conversation" /><p>No heat or no cooling?<span>Call 215-416-6557 for 24/7 emergency HVAC support.</span></p></div>
        <button type="button" @click="$emit('quote')">Prepare a service request<SiteIcon /></button>
      </div>
    </div>
    <ImageLightbox v-model:index="lightboxIndex" :images="galleryImages" />
  </section>
</template>

<style scoped>
.service-summary-mobile { display: none; }
.service-showcase { padding-block: 100px 72px; color: #fff; background: var(--brand-secondary); }
.service-container { width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; }
.service-heading { display: grid; grid-template-columns: 1.6fr 1fr; align-items: end; gap: 24px 64px; margin-bottom: 44px; }
.service-heading > .section-tag { grid-column: 1 / -1; justify-self: start; color: #fff; }
.service-heading > .section-tag > span { background: #fff; }
.service-heading h2 { margin: 0; color: #fff; font-size: clamp(38px, 4.2vw, 56px); font-weight: 500; line-height: 1.08; letter-spacing: -2px; }
.service-heading h2 span { color: #fff; }
.service-heading > p { justify-self: end; max-width: 340px; margin: 0; color: #fff; font-size: 18px; line-height: 1.6; }
.service-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; padding: 7px; border: 1px solid var(--surface-muted); border-radius: var(--radius-panel); background: var(--surface-muted); margin-bottom: 22px; }
.service-option { position: relative; display: flex; flex-direction: column; gap: 19px; min-width: 0; padding: 24px; border: 0; border-radius: var(--radius-control); background: transparent; color: var(--brand-primary); text-align: left; cursor: pointer; transition: background 200ms, color 200ms; }
.service-option + .service-option::before { content: ''; position: absolute; left: 0; top: 26px; bottom: 26px; width: 1px; background: var(--surface-muted); }
.service-option.is-selected::before, .service-option.is-selected + .service-option::before { opacity: 0; }
.service-option:hover { background: #ffffff80; }
.service-option.is-selected { background: #fff; color: var(--brand-primary); box-shadow: inset 0 -3px var(--brand-primary); }
.service-option-top, .service-option-bottom { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.service-option-top > svg { width: 31px; height: 31px; color: var(--brand-primary); stroke-width: 1.4; }
.service-option-top > span { font-size: 14px; letter-spacing: 1.5px; color: var(--brand-primary); }
.service-option > strong { margin-top: 3px; color: inherit; font-size: clamp(17px, 1.5vw, 22px); font-weight: 500; letter-spacing: -.6px; line-height: 1.2; }
.service-option-bottom { margin-top: auto; font-size: 14px; color: var(--brand-primary); }
.service-option-bottom > svg { width: 18px; height: 18px; flex-shrink: 0; color: var(--brand-primary); transform: rotate(45deg); transition: transform 200ms; }
.service-option.is-selected .service-option-bottom > svg { transform: rotate(90deg); }
.service-feature { color: var(--brand-primary); display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); padding: 8px; border: 1px solid var(--surface-muted); border-radius: var(--radius-panel); background: #fff; box-shadow: none; overflow: hidden; }
.service-feature-photo { display: block; width: 100%; padding: 0; border: 0; text-align: left; cursor: zoom-in; position: relative; isolation: isolate; min-height: 560px; overflow: hidden; border-radius: var(--radius-media); background: var(--surface-muted); }
.service-feature-photo > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 48% center; transition: opacity 300ms ease; }
.service-feature-photo > img.service-photo-enter-from, .service-feature-photo > img.service-photo-leave-to { opacity: 0; }
.service-feature-photo::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, color-mix(in srgb, var(--brand-dark) 8.2%, transparent) 0%, transparent 50%, color-mix(in srgb, var(--brand-dark) 65.1%, transparent) 100%); }
.service-photo-label { position: absolute; z-index: 1; top: 25px; left: 25px; display: inline-flex; align-items: center; gap: 9px; padding: 10px 14px; border-radius: var(--radius-control); background: #fffffff0; color: var(--brand-primary); font-size: 14px; }
.service-photo-label > span { width: 6px; height: 6px; background: var(--brand-primary); }
.service-photo-caption { position: absolute; z-index: 1; inset: auto 30px 30px; display: flex; align-items: center; gap: 14px; color: #fff; }
.service-photo-caption > svg { width: 32px; height: 32px; flex-shrink: 0; stroke-width: 1.3; }
.service-photo-caption > span:not(.service-photo-number) { font-size: clamp(20px, 2vw, 29px); letter-spacing: -.6px; line-height: 1.2; }
.service-photo-number { margin-left: auto; white-space: nowrap; font-size: 14px; letter-spacing: 1px; }
.service-feature-content { display: flex; flex-direction: column; align-items: flex-start; padding: clamp(28px, 3.5vw, 50px); }
.service-eyebrow { color: var(--brand-primary); font-size: 14px; font-weight: 500; letter-spacing: 1.6px; text-transform: uppercase; }
.service-feature-content h3 { margin: 17px 0 18px; max-width: 490px; font-size: clamp(32px, 3vw, 45px); font-weight: 500; line-height: 1.08; letter-spacing: -1.5px; color: var(--brand-primary); text-wrap: balance; }
.service-summary { margin: 0; color: var(--brand-primary); font-size: 15px; line-height: 1.7; }
.service-inclusions { list-style: none; width: 100%; padding: 0; margin: 24px 0 28px; }
.service-inclusions li { display: flex; align-items: center; gap: 14px; padding: 15px 0; border-bottom: 1px solid var(--surface-muted); }
.service-inclusions li:first-child { border-top: 1px solid var(--surface-muted); }
.service-inclusion-icon { display: grid; place-items: center; width: 40px; height: 40px; flex-shrink: 0; color: var(--brand-primary); background: var(--surface-muted); border-radius: var(--radius-control); }
.service-inclusion-icon svg { width: 23px; height: 23px; stroke-width: 1.4; }
.service-inclusions h4 { margin: 0 0 4px; font-size: 16px; line-height: 1.2; font-weight: 500; color: var(--brand-primary); }
.service-inclusions p { margin: 0; font-size: 14px; line-height: 1.4; color: var(--brand-primary); }
.service-check { margin-left: auto; flex-shrink: 0; width: 17px; height: 17px; color: var(--brand-primary); }
.service-request { margin-top: auto; min-height: 50px; gap: 24px; font-size: 14px; }
.service-request svg { width: 19px; height: 19px; flex-shrink: 0; }
.service-guidance { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 28px 12px 0; }
.service-guidance > div { display: flex; align-items: center; gap: 16px; }
.service-guidance > div > svg { width: 29px; height: 29px; color: #fff; flex-shrink: 0; }
.service-guidance p { margin: 0; font-size: 16px; color: #fff; }
.service-guidance p span { display: block; margin-top: 5px; color: #fff; font-size: 14px; line-height: 1.5; }
.service-guidance button { display: inline-flex; align-items: center; gap: 15px; min-height: 44px; padding: 8px 0; background: transparent; border: 0; color: #fff; font-size: 14px; cursor: pointer; }
.service-guidance button svg { width: 20px; height: 20px; }
.service-feature-photo:focus-visible { outline: 3px solid var(--brand-primary); outline-offset: -4px; }
.service-option:focus-visible, .service-request:focus-visible, .service-guidance button:focus-visible { outline: 3px solid var(--brand-primary); outline-offset: 4px; }
@media (max-width: 1050px) {
  .service-option { padding: 20px 16px; }
  .service-option-bottom { font-size: 14px; }
  .service-feature-content { padding: 30px; }
  .service-photo-caption { inset-inline: 22px; }
  .service-photo-number { display: none; }
}
@media (max-width: 767px) {
  .service-showcase { padding-block: 64px 48px; }
  .service-container { width: calc(100% - 40px); }
  .service-heading { grid-template-columns: 1fr; gap: 22px; margin-bottom: 30px; }
  .service-heading > p { justify-self: start; max-width: 480px; font-size: 16px; }
  .service-heading h2 { letter-spacing: -1.5px; }
  .service-options { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px; border-radius: var(--radius-panel); }
  .service-option { gap: 13px; padding: 17px; border-radius: var(--radius-control); }
  .service-option + .service-option::before { display: none; }
  .service-option > strong { font-size: 18px; }
  .service-option-top > svg { width: 26px; height: 26px; }
  .service-option-bottom > span { line-height: 1.4; }
  .service-feature { grid-template-columns: 1fr; border-radius: var(--radius-panel); }
  .service-feature-photo { min-height: 0; aspect-ratio: 16 / 11; border-radius: var(--radius-media); }
  .service-feature-content { padding: 30px 22px 24px; }
  .service-feature-content h3 { font-size: 35px; }
  .service-photo-label { top: 18px; left: 18px; font-size: 14px; }
  .service-photo-caption { bottom: 22px; }
  .service-guidance { align-items: flex-start; flex-direction: column; gap: 12px; padding-inline: 4px; }
  .service-guidance button { margin-left: 45px; text-align: left; }
}
@media (max-width: 400px) {
  .service-option { padding: 14px 12px; }
  .service-option > strong { font-size: 16px; }
  .service-option-bottom > svg { display: none; }
  .service-feature-content { padding-inline: 16px; }
  .service-request { width: 100%; justify-content: space-between; gap: 12px; white-space: normal; text-align: left; }
}
@media (prefers-reduced-motion: reduce) {
  .service-option, .service-option-bottom > svg, .service-feature-photo > img { transition: none; }
}

@media (max-width: 767px) {
  .service-options { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-inline: 0; padding: 0; gap: 12px; border: 0; border-radius: 0; background: transparent; }
  .service-option { background: var(--surface-muted); padding: 18px 14px; border: 1px solid var(--surface-muted); gap: 14px; }
  .service-option > strong { font-size: 17px; line-height: 1.25; }
  .service-option-bottom > svg { display: block; }
  .service-option.is-selected { border-color: var(--surface-muted); }
  .service-feature-content { padding: 26px 20px 22px; }
  .service-feature-content h3 { font-size: clamp(30px, 8vw, 38px); }
  .service-photo-label { display: none; }
  .service-request { width: 100%; justify-content: space-between; gap: 14px; white-space: normal; text-align: left; }
  .service-guidance { padding-top: 24px; }
}

@media (max-width: 767px) {
  .service-summary-desktop { display: none; }
  .service-summary-mobile { display: block; font-size: 16px; line-height: 1.55; }
  .service-feature-content { padding: 24px 20px; }
  .service-eyebrow { font-size: 14px; letter-spacing: .7px; }
  .service-feature-content h3 { margin: 12px 0 14px; font-size: clamp(28px, 7.5vw, 36px); line-height: 1.12; letter-spacing: -.9px; }
  .service-inclusions { margin: 22px 0 24px; padding: 6px 14px; border-radius: var(--radius-control); background: var(--surface-muted); }
  .service-inclusions li { padding: 12px 0; gap: 12px; }
  .service-inclusions li:first-child { border-top: 0; }
  .service-inclusions li:last-child { border-bottom: 0; }
  .service-inclusion-icon { width: 28px; height: 28px; background: none; border-radius: 0; }
  .service-inclusions h4 { margin: 0; font-size: 15px; line-height: 1.35; }
  .service-inclusions p, .service-check { display: none; }
  .service-request { min-height: 50px; }
}
</style>
