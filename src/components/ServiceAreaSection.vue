<script setup>
import { ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
import ImageLightbox from "./ImageLightbox.vue";
import { brands, business, serviceAreas } from "../siteContent.js";

const selectedImage = ref(null);
const showAllAreas = ref(false);
const areaCount = serviceAreas.reduce((total, area) => total + area.places.length, 0);
const landmarks = [
  { id: "philadelphia", title: "Philadelphia", description: "City Hall, Center City", alt: "Philadelphia City Hall and its clock tower against a blue sky.", width: 1280, height: 960 },
  { id: "wayne", title: "The Main Line", description: "Wayne Station, Wayne", alt: "The historic stone Wayne Station building beside the railway platform.", width: 1280, height: 960 },
  { id: "media", title: "Beyond the city", description: "Delaware County Courthouse, Media", alt: "The stone facade and columns of Delaware County Courthouse in Media, Pennsylvania.", width: 1280, height: 853 },
].map(image => ({ ...image, src: `/images/area-${image.id}-1280.webp`, srcset: `/images/area-${image.id}-640.webp 640w, /images/area-${image.id}-1280.webp 1280w` }));
const featuredPlaces = serviceAreas.map((area, index) => index === 0
  ? [0, 4, 13, 9, 1, 2, 3, 7].map(placeIndex => area.places[placeIndex])
  : area.places.slice(0, 6));
const counties = ["Philadelphia", "Delaware", "Montgomery", "Bucks", "Chester"];
</script>

<template>
  <section id="service-areas" class="coverage-section page-section" aria-labelledby="coverage-title">
    <div class="coverage-container">
      <header class="coverage-heading">
        <div>
          <span class="section-tag"><span aria-hidden="true"></span>Our Service Area</span>
          <h2 id="coverage-title">Local care.<br /><span>Across the Philly metro.</span></h2>
        </div>
        <div class="coverage-intro">
          <SiteIcon name="pin" />
          <p>From city rowhouses to Main Line homes, dependable heating and cooling is close to home.</p>
          <span>Serving Philadelphia and the surrounding counties.</span>
        </div>
      </header>

      <div class="landmark-gallery" role="group" aria-label="Landmarks in our service area">
        <figure v-for="(landmark, index) in landmarks" :key="landmark.id" class="landmark" :class="`landmark-${landmark.id}`">
          <button type="button" class="landmark-image" :aria-label="`View ${landmark.description}`" aria-haspopup="dialog" @click="selectedImage = index">
            <img :src="landmark.src" :srcset="landmark.srcset" sizes="(min-width: 900px) 55vw, 80vw" :alt="landmark.alt" :width="landmark.width" :height="landmark.height" loading="lazy" decoding="async" />
            <span class="landmark-view" aria-hidden="true"><SiteIcon name="arrow" /></span>
          </button>
          <figcaption>
            <h3><SiteIcon name="pin" />{{ landmark.title }}</h3>
            <ul class="landmark-places" :aria-label="`${landmark.title} featured service areas`"><li v-for="place in featuredPlaces[index]" :key="place">{{ place }}</li></ul>
          </figcaption>
        </figure>
      </div>

      <div class="coverage-more">
        <p>{{ areaCount }} areas across {{ counties.length }} counties</p>
        <div class="coverage-actions">
        <button type="button" class="coverage-toggle" :aria-expanded="showAllAreas" aria-controls="coverage-directory" @click="showAllAreas = !showAllAreas">{{ showAllAreas ? 'Show fewer areas' : 'Check all areas' }}<SiteIcon name="arrow" /></button>
          <a class="coverage-phone" :href="business.phoneHref" aria-label="Call to confirm service for your address"><SiteIcon name="phone" />{{ business.phone }}</a>
        </div>
      </div>
      <div v-show="showAllAreas" id="coverage-directory" class="coverage-directory" aria-labelledby="coverage-directory-title">
        <header class="directory-heading"><h3 id="coverage-directory-title">Find your neighborhood.</h3><p>{{ counties.join(', ') }}</p></header>
        <article v-for="(area, index) in serviceAreas" :key="area.title" class="coverage-region">
          <div class="region-heading"><span class="region-number" aria-hidden="true">0{{ index + 1 }}</span><div><h4>{{ area.title }}</h4><p>{{ area.description }}</p></div></div>
          <ul><li v-for="place in area.places" :key="place">{{ place }}</li></ul>
        </article>
      </div>

      <div class="coverage-notes">
        <details class="equipment-brands">
          <summary>All major brands serviced</summary>
          <ul aria-label="Equipment brands"><li v-for="brand in brands" :key="brand">{{ brand }}</li></ul>
        </details>
      <details class="landmark-credits"><summary>Landmark photo credits</summary><p>Images resized and cropped for display. <a href="https://commons.wikimedia.org/wiki/File:City_Hall,_Philadelphia_PA.jpg" target="_blank" rel="noopener noreferrer">City Hall by John Phelan</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>); <a href="https://commons.wikimedia.org/wiki/File:Wayne_Station_Front_View.jpg" target="_blank" rel="noopener noreferrer">Wayne Station by Cornflower123</a> and <a href="https://commons.wikimedia.org/wiki/File:DelCo_PA_Courthouse.JPG" target="_blank" rel="noopener noreferrer">Media courthouse by Smallbones</a> (<a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">CC0</a>).</p></details>
      </div>
    </div>
    <ImageLightbox v-model:index="selectedImage" :images="landmarks" />
  </section>
</template>

<style scoped>
.coverage-section { --coverage-ink: var(--brand-primary); --coverage-muted: var(--brand-primary); --coverage-accent: var(--brand-primary); --coverage-line: var(--surface-muted); background: var(--surface-muted); color: var(--coverage-ink); padding-block: 64px; }
.coverage-container { width: min(var(--content-max-width), calc(100% - 40px)); margin-inline: auto; }
.coverage-heading { display: grid; gap: 24px; margin-bottom: 30px; }
.coverage-heading .section-tag { color: var(--coverage-accent); }
.coverage-heading .section-tag > span { background: var(--coverage-accent); }
.coverage-heading h2 { color: var(--coverage-ink); margin-top: 22px; font-size: clamp(36px, 5vw, 64px); font-weight: 500; line-height: 1.08; letter-spacing: -1.6px; text-wrap: balance; }
.coverage-heading h2 span { color: var(--coverage-accent); }
.coverage-intro { max-width: 390px; }
.coverage-intro > svg { display: none; width: 28px; height: 28px; color: var(--coverage-accent); }
.coverage-intro p { font-size: 17px; line-height: 1.6; color: var(--coverage-muted); }
.coverage-intro > span { display: block; margin-top: 12px; font-size: 14px; line-height: 1.6; color: var(--coverage-muted); }
.landmark-gallery { display: grid; grid-auto-flow: column; grid-auto-columns: 86%; gap: 12px; overflow-x: auto; margin-inline: -20px; padding-inline: 20px; scroll-padding-inline: 20px; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: var(--surface-muted) transparent; padding-bottom: 10px; }
.landmark { position: relative; min-width: 0; height: 410px; margin: 0; border-radius: 12px; overflow: hidden; isolation: isolate; scroll-snap-align: start; background: var(--surface-muted); }
.landmark-image { position: absolute; inset: 0; width: 100%; height: 100%; padding: 0; border: 0; cursor: zoom-in; background: transparent; }
.landmark-image img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 400ms ease; }
.landmark-image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgb(0 0 0 / 8%), transparent 45%); pointer-events: none; }
.landmark-view { position: absolute; z-index: 1; top: 18px; right: 18px; display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid #ffffff70; border-radius: 50%; color: white; background: #00000040; }
.landmark-view svg { width: 21px; height: 21px; transform: rotate(-45deg); }
.landmark figcaption { position: absolute; inset: auto 0 0; padding: 16px 20px 20px; color: #fff; pointer-events: none; background: linear-gradient(180deg, rgb(0 0 0 / 58%), rgb(0 0 0 / 72%)); }
.landmark figcaption::before { content: ""; position: absolute; inset: -45px 0 auto; height: 45px; background: linear-gradient(180deg, transparent, rgb(0 0 0 / 58%)); }
.landmark-places { width: 100%; display: flex; flex-wrap: wrap; gap: 7px; list-style: none; margin: 16px 0 0; padding: 0; }
.landmark-places li { padding: 6px 10px; border: 1px solid #ffffff40; border-radius: 6px; background: rgb(0 0 0 / 32%); color: #fff; font-size: 14px; font-weight: 500; line-height: 1.35; overflow-wrap: anywhere; }
.landmark:first-child .landmark-places li:nth-child(n + 5) { display: none; }
.landmark h3 { display: flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 500; letter-spacing: -.7px; line-height: 1.15; }
.landmark figcaption p { display: flex; align-items: center; gap: 7px; margin-top: 9px; font-size: 14px; line-height: 1.5; }
.landmark figcaption svg { width: 18px; height: 18px; flex-shrink: 0; opacity: .85; }
.coverage-more { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; padding: 22px 0; border-bottom: 1px solid var(--coverage-line); }
.coverage-more p { font-size: 16px; color: var(--coverage-muted); }
.coverage-toggle { display: inline-flex; align-items: center; justify-content: space-between; gap: 24px; min-height: 48px; padding: 10px 0; background: transparent; border: 0; color: var(--coverage-accent); font-size: 16px; font-weight: 500; cursor: pointer; }
.coverage-toggle svg { width: 22px; height: 22px; transition: transform 180ms ease; }
.coverage-toggle[aria-expanded="true"] svg { transform: rotate(-90deg); }
.coverage-toggle:hover { color: var(--coverage-ink); }
.coverage-toggle:focus-visible { outline: 2px solid var(--coverage-accent); outline-offset: 4px; }
.coverage-directory { margin-top: 24px; }
.directory-heading { margin-bottom: 24px; }
.directory-heading h3 { color: var(--coverage-ink); font-size: clamp(26px, 3vw, 36px); font-weight: 500; letter-spacing: -.8px; line-height: 1.2; }
.directory-heading p { margin-top: 10px; font-size: 15px; color: var(--coverage-muted); }
.coverage-region { display: grid; gap: 22px; padding: 28px 0; border-top: 1px solid var(--coverage-line); }
.region-heading { display: flex; align-items: baseline; gap: 16px; }
.region-number { font-size: 14px; font-variant-numeric: tabular-nums; color: var(--coverage-accent); }
.region-heading h4 { color: var(--coverage-ink); font-size: 23px; font-weight: 500; line-height: 1.2; letter-spacing: -.5px; }
.region-heading p { max-width: 280px; margin-top: 10px; color: var(--coverage-muted); font-size: 14px; line-height: 1.65; }
.coverage-region ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 16px; margin: 0; padding: 0; list-style: none; }
.coverage-region li { font-size: 14px; line-height: 1.5; overflow-wrap: anywhere; }
.landmark-credits { margin-top: 0; color: var(--coverage-muted); font-size: 14px; line-height: 1.7; }
.equipment-brands summary, .landmark-credits summary { width: fit-content; min-height: 44px; padding-block: 11px; cursor: pointer; }
.coverage-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
.coverage-phone { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 10px 16px; border-radius: 6px; background: #fff; color: var(--coverage-accent); font-size: 16px; text-decoration: none; }
.coverage-phone svg { width: 19px; height: 19px; }
.coverage-phone:hover { background: var(--surface-muted); }
.coverage-phone:focus-visible { outline: 2px solid var(--coverage-accent); outline-offset: 3px; }
.coverage-notes { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 0 32px; margin-top: 12px; }
.equipment-brands { color: var(--coverage-muted); font-size: 14px; line-height: 1.7; }
.equipment-brands ul { display: flex; flex-wrap: wrap; gap: 8px 20px; list-style: none; margin: 4px 0 12px; padding: 0; max-width: 600px; }
.equipment-brands li { font-size: 14px; }
.equipment-brands summary:focus-visible { outline: 2px solid var(--coverage-accent); outline-offset: 3px; }
.landmark-credits p { max-width: 850px; margin-top: 4px; }
.landmark-credits a { text-decoration: underline; text-underline-offset: 3px; }
.landmark-image:focus-visible { outline: 3px solid var(--surface-muted); outline-offset: -5px; }
.landmark-credits a:focus-visible, .landmark-credits summary:focus-visible { outline: 2px solid var(--coverage-accent); outline-offset: 3px; }
@media (hover: hover) { .landmark-image:hover img { transform: scale(1.035); } }
@media (min-width: 768px) {
  .coverage-section { padding-block: 100px 80px; }
  .coverage-container { width: min(var(--content-max-width), calc(100% - 64px)); }
  .coverage-heading { grid-template-columns: 1.5fr 1fr; align-items: end; gap: 48px; margin-bottom: 40px; }
  .coverage-intro { justify-self: end; }
  .coverage-intro > svg { display: block; margin-bottom: 14px; }
  .landmark-gallery { grid-auto-flow: row; grid-auto-columns: auto; grid-template-columns: 1.15fr 1fr; grid-template-rows: 300px 300px; gap: 18px; overflow: visible; margin: 0; padding: 0; }
  .landmark { height: auto; }
  .landmark:first-child { grid-row: 1 / 3; }
  .landmark h3 { font-size: 28px; gap: 10px; }
  .landmark figcaption svg { width: 22px; height: 22px; }
  .landmark:first-child h3 { font-size: 42px; }
  .landmark figcaption { padding: 18px 24px 22px; }
  .landmark:first-child .landmark-places li:nth-child(n + 5) { display: list-item; }
  .landmark:first-child figcaption { padding: 24px 28px 28px; }
  .coverage-directory { margin-top: 28px; }
  .directory-heading { display: flex; justify-content: space-between; align-items: baseline; }
  .coverage-region { grid-template-columns: minmax(220px, 1fr) 2fr; gap: 40px; padding-block: 32px; }
  .coverage-region ul { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px 24px; }
}
@media (min-width: 1200px) {
  .landmark-gallery { grid-template-rows: 300px 300px; }
  .coverage-region { grid-template-columns: 1fr 2fr; gap: 80px; }
  .coverage-region li { font-size: 15px; }
}
@media (prefers-reduced-motion: reduce) { .landmark-image img, .coverage-toggle svg { transition: none; } }
</style>
