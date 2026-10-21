<script setup>
import { ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
import ImageLightbox from "./ImageLightbox.vue";

const selectedImage = ref(null);
const images = [
  {
    src: "/images/about-philly-comfort-v1.webp",
    srcset: "/images/about-philly-comfort-v1-640.webp 640w, /images/about-philly-comfort-v1-960.webp 960w, /images/about-philly-comfort-v1.webp 1536w",
    alt: "Illustrative photograph of a sunlit Philadelphia rowhouse living room with a cast-iron radiator, brick wall, and linen sofa.",
    title: "Comfort that feels like home.",
    description: "Reliable heating, cooling, and air care through every season.",
    label: "Everyday comfort",
  },
  {
    src: "/images/about-philly-boiler-v1.webp",
    srcset: "/images/about-philly-boiler-v1-640.webp 640w, /images/about-philly-boiler-v1-960.webp 960w, /images/about-philly-boiler-v1.webp 1536w",
    alt: "Illustrative photograph of copper boiler piping, brass valves, and a pressure gauge in an older brick utility room.",
    title: "Old-home know-how.",
    description: "Steam, hot water, gas, and high-efficiency heating systems.",
    label: "The systems behind your comfort",
  },
  {
    src: "/images/about-philly-service-v1.webp",
    srcset: "/images/about-philly-service-v1-640.webp 640w, /images/about-philly-service-v1-960.webp 960w, /images/about-philly-service-v1.webp 1536w",
    alt: "Illustrative photograph of a technician checking an outdoor heat pump in a Philadelphia brick-rowhouse courtyard.",
    title: "Local homes. Hands-on care.",
    description: "Heating and cooling expertise for Philadelphia rowhouses and Main Line homes.",
    label: "Philadelphia & the Main Line",
  },
];
</script>

<template>
  <section id="about" class="mission-section page-section" aria-labelledby="mission-title">
    <div class="mission-container">
      <header class="mission-heading">
        <p class="mission-eyebrow section-tag"><span aria-hidden="true"></span>About Philly HVAC Pros</p>
        <h2 id="mission-title">Local homes.<br /><span>Local expertise.</span></h2>
        <div class="mission-introduction">
          <div class="mission-intro-heading">
            <SiteIcon name="air" />
            <p class="mission-lead">Superior Comfort.<br />Every season.</p>
          </div>
          <p>
            Superior Comfort Heating &amp; Cooling LLC serves homeowners,
            landlords, property managers, and businesses across Philadelphia and
            the surrounding counties. From older steam boilers to cold-climate
            heat pumps, we repair, replace, and maintain the systems you rely on.
          </p>
        </div>
      </header>

      <div class="mission-composition">
        <div class="mission-scene">
        <figure class="mission-home mission-image-frame">
          <button type="button" class="mission-home-inner mission-gallery-trigger" :aria-label="`View full image: ${images[0].title}`" aria-haspopup="dialog" @click="selectedImage = 0">
            <img :src="images[0].src" :srcset="images[0].srcset" sizes="(min-width: 1504px) 1428px, calc(100vw - 40px)"
              :alt="images[0].alt" width="1536" height="1024" loading="lazy" decoding="async" />
            <span class="mission-photo-index">01 / Philadelphia homes</span>
          </button>
          <figcaption>
            <span class="mission-caption-eyebrow"><SiteIcon name="home" />HOMES &amp; BUSINESSES</span>
            <h3>From rowhouses<br />to Main Line homes.</h3>
            <p>Heating, cooling, and hot water.<br />Service for all major brands.</p>
          </figcaption>
        </figure>

        <div class="mission-details">
        <figure class="mission-system mission-story">
          <button type="button" class="mission-story-image mission-gallery-trigger" :aria-label="`View full image: ${images[1].title}`" aria-haspopup="dialog" @click="selectedImage = 1">
            <img :src="images[1].src" :srcset="images[1].srcset" sizes="(min-width: 1101px) 26vw, (min-width: 768px) 45vw, 44vw"
              :alt="images[1].alt" width="1536" height="1024" loading="lazy" decoding="async" />
          </button>
          <figcaption>
            <div class="mission-story-top"><span class="mission-story-index"><SiteIcon name="shield" />Boiler care</span></div>
            <div class="mission-story-copy">
              <h3><span class="mission-story-title-desktop">Older homes. Expert care.</span><span class="mission-story-title-mobile">Boiler care.</span></h3>
              <p>Steam, hot water, and high-efficiency boilers.</p>
            </div>
          </figcaption>
        </figure>

        <figure class="mission-air mission-story">
          <button type="button" class="mission-story-image mission-gallery-trigger" :aria-label="`View full image: ${images[2].title}`" aria-haspopup="dialog" @click="selectedImage = 2">
            <img :src="images[2].src" :srcset="images[2].srcset" sizes="(min-width: 1101px) 26vw, (min-width: 768px) 45vw, 44vw"
              :alt="images[2].alt" width="1536" height="1024" loading="lazy" decoding="async" />
          </button>
          <figcaption>
            <div class="mission-story-top"><span class="mission-story-index"><SiteIcon name="air" />Heat pumps</span></div>
            <div class="mission-story-copy">
              <h3><span class="mission-story-title-desktop">Efficient upgrades.</span><span class="mission-story-title-mobile">Heat pumps.</span></h3>
              <p>Ducted, ductless, and cold-climate systems.</p>
            </div>
          </figcaption>
        </figure>

        </div>

        <div class="mission-principles">
          <p class="mission-small-title">Repair first. Replace when needed.</p>
          <div>
            <SiteIcon name="conversation" />
            <p><strong>Written quotes upfront.</strong> Understand the repair or replacement options before work begins.</p>
          </div>
          <div>
            <SiteIcon name="tool" />
            <p><strong>Experience with older systems.</strong> Steam, hot water, gas, oil, and high-efficiency equipment.</p>
          </div>
        </div>
        </div>
      </div>

      <footer class="mission-closing">
        <p>Serving the Main Line<br /><span>since 2018.</span></p>
        <a href="#services" class="button button-blue mission-link">See our HVAC services<span><SiteIcon /></span></a>
      </footer>
    </div>
    <ImageLightbox v-model:index="selectedImage" :images="images" />
  </section>
</template>

<style scoped>
.mission-section { position: relative; isolation: isolate; padding-block: 112px 88px; background: #fff; color: #183343; }
.mission-container { position: relative; width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; }
.mission-heading { display: grid; grid-template-columns: 1.25fr 1fr; align-items: start; gap: 28px 48px; margin-bottom: 60px; }
.mission-eyebrow { grid-column: 1 / -1; justify-self: start; }
.mission-heading h2 { font-family: inherit; font-size: clamp(56px, 5.6vw, 72px); font-weight: 500; line-height: 1.08; letter-spacing: -2.6px; }
.mission-heading h2 > span { color: #178ac0; }
.mission-introduction { width: 100%; max-width: 420px; justify-self: end; padding-top: 6px; }
.mission-intro-heading { display: flex; align-items: flex-start; justify-content: flex-start; gap: 16px; margin-bottom: 20px; }
.mission-intro-heading > svg { margin-top: 3px; width: 34px; height: 34px; flex-shrink: 0; color: #178ac0; stroke-width: 1.7; }
.mission-lead { font-size: 22px; font-weight: 500; line-height: 1.25; letter-spacing: -.6px; }
.mission-introduction > p:last-child { color: #596975; font-size: 16px; line-height: 1.7; }
.mission-composition { display: block; }
.mission-composition figure { margin: 0; min-width: 0; }
.mission-scene { position: relative; }
.mission-home { position: relative; padding: 6px; border-radius: var(--radius-panel); background: #fff; box-shadow: none; overflow: hidden; }
.mission-home-inner { position: relative; width: 100%; height: clamp(740px, 54vw, 800px); overflow: hidden; border-radius: var(--radius-media); isolation: isolate; }
.mission-home img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; object-position: 25% center; }
.mission-home-inner::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, #17232933 75%, #17232970 100%), radial-gradient(ellipse at 8% 100%, #17232999, transparent 60%); pointer-events: none; }
.mission-photo-index { position: absolute; z-index: 1; top: 30px; left: 34px; color: #264653; background: #ffffffe0; padding: 8px 11px; border-radius: var(--radius-control); font-size: 14px; letter-spacing: 1.3px; text-transform: uppercase; font-weight: 500; }
.mission-home figcaption { position: absolute; z-index: 1; left: 42px; bottom: 184px; width: 36%; color: #fff; text-shadow: 0 2px 14px #00000030; }
.mission-caption-eyebrow { display: inline-flex; align-items: center; gap: 10px; color: #fff; font-size: 14px; font-weight: 500; letter-spacing: 1.6px; margin-bottom: 16px; }
.mission-caption-eyebrow svg { width: 23px; height: 23px; }
.mission-home figcaption > p { margin-top: 17px; color: #f0f3f4; font-size: 15px; line-height: 1.65; }
.mission-home h3 { font-size: clamp(30px, 3vw, 42px); line-height: 1.12; letter-spacing: -1.1px; font-weight: 500; }
.mission-details { position: absolute; z-index: 2; bottom: 174px; right: 36px; width: 54%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.mission-story { position: relative; min-height: 310px; border: 1px solid #ffffff99; border-radius: 14px; overflow: hidden; background: #f5f3ee; box-shadow: 0 8px 28px #23312b14; }
.mission-story-image { position: absolute; inset: 0; }
.mission-story-image img { display: block; width: 100%; height: 100%; object-fit: cover; filter: saturate(.72) contrast(.88) brightness(1.06); }
.mission-system img { object-position: 50% 56%; }
.mission-air img { object-position: 50% 40%; }
.mission-story figcaption { position: relative; min-height: 308px; padding: 0; color: #fff; }
.mission-story-copy { position: absolute; inset: auto 0 0; min-height: 122px; padding: 18px 22px 20px; background: linear-gradient(180deg, rgb(0 0 0 / 56%), rgb(0 0 0 / 70%)); }
.mission-story-copy::before { content: ""; position: absolute; inset: -80px 0 auto; height: 80px; background: linear-gradient(180deg, transparent, rgb(0 0 0 / 56%)); pointer-events: none; }
.mission-story-top { position: absolute; top: 16px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.mission-story-index { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid #ffffff33; border-radius: 100px; background: rgb(0 0 0 / 72%); color: #fff; font-size: 14px; font-weight: 500; letter-spacing: 0; text-shadow: none; }
.mission-story-index svg { width: 18px; height: 18px; flex-shrink: 0; color: #fff; }
.mission-story h3 { color: #fff; font-size: clamp(21px, 1.65vw, 25px); font-weight: 500; line-height: 1.25; letter-spacing: -.45px; text-shadow: none; text-wrap: balance; }
.mission-story p { margin-top: 8px; color: #f0f0f0; font-size: 14px; line-height: 1.55; max-width: 260px; }
.mission-story-title-mobile { display: none; }
.mission-principles { position: absolute; z-index: 3; bottom: 32px; left: 36px; right: 36px; display: grid; grid-template-columns: .85fr 1.15fr 1.1fr; align-items: center; gap: 28px; min-height: 114px; padding: 23px 26px; border: 1px solid #ffffffcc; border-radius: var(--radius-panel); background: #f5fbfff0; box-shadow: none; }
.mission-small-title { max-width: 260px; color: #183343; font-size: 22px; font-weight: 500; line-height: 1.25; letter-spacing: -.5px; }
.mission-principles > div { display: flex; gap: 12px; padding-left: 22px; border-left: 1px solid #bfd7e3; }
.mission-principles svg { width: 24px; height: 24px; flex-shrink: 0; color: #178ac0; }
.mission-principles div p { font-size: 14px; line-height: 1.65; color: #596975; }
.mission-principles strong { display: block; margin-bottom: 5px; font-size: 16px; font-weight: 500; color: #183343; }
.mission-closing { position: relative; margin-top: 62px; padding-top: 34px; display: flex; justify-content: space-between; align-items: center; gap: 28px; }
.mission-closing::before { content: ""; position: absolute; top: 0; inset-inline: 0; height: 1px; background: linear-gradient(90deg, #18334326, #18334308); }
.mission-closing > p { font-size: 25px; line-height: 1.3; letter-spacing: -.6px; }
.mission-closing > p span { color: #178ac0; }
.mission-link { display: inline-flex; align-items: center; justify-content: space-between; gap: 22px; padding: 12px 22px; min-height: 56px; border-radius: var(--radius-control); color: #fff; font-size: 15px; font-weight: 500; transition: transform 350ms cubic-bezier(.22, 1, .36, 1); }
.mission-link > span { display: grid; place-items: center; width: 22px; height: 22px; }
.mission-link svg { width: 22px; height: 22px; transition: transform 350ms cubic-bezier(.22, 1, .36, 1); }
.mission-link:hover svg { transform: translateX(3px); }
.mission-link:active { transform: scale(.98); }
@media (max-width: 1100px) {
  .mission-heading { gap: 24px 32px; }
  .mission-heading h2 { font-size: 60px; }
  .mission-home-inner { height: 810px; }
  .mission-home figcaption { top: 60px; bottom: auto; left: auto; right: 34px; width: 46%; }
  .mission-home .mission-photo-index { top: 24px; left: 28px; }
  .mission-home-inner::after { background: radial-gradient(ellipse at 90% 10%, #172329aa 0%, #17232944 35%, transparent 65%); }
  .mission-details { width: auto; left: 28px; right: 28px; bottom: 214px; }
  .mission-story { min-height: 270px; }
  .mission-story figcaption { min-height: 268px; }
  .mission-principles { left: 28px; right: 28px; bottom: 28px; grid-template-columns: 1fr 1fr; gap: 18px; }
  .mission-small-title { grid-column: 1 / -1; max-width: none; font-size: 20px; }
  .mission-principles > div { padding-left: 0; border: 0; }
}
@media (max-width: 767px) {
  .mission-section { padding-block: 56px; }
  .mission-container { width: calc(100% - 40px); }
  .mission-heading { grid-template-columns: 1fr; gap: 20px; margin-bottom: 28px; text-align: center; }
  .mission-eyebrow { justify-self: center; }
  .mission-heading h2 { font-size: clamp(42px, 9vw, 60px); letter-spacing: -1.8px; }
  .mission-introduction { max-width: 480px; justify-self: center; padding: 0; }
  .mission-intro-heading { display: none; }
  .mission-introduction > p:last-child { font-size: 16px; line-height: 1.6; }
  .mission-home { padding: 4px; border-radius: var(--radius-panel); box-shadow: none; }
  .mission-home-inner { height: clamp(340px, 90vw, 430px); border-radius: var(--radius-media); }
  .mission-home img { object-position: 20% center; }
  .mission-home-inner::after { background: linear-gradient(180deg, transparent 35%, #17232922 55%, #172329ba 100%); }
  .mission-home figcaption { left: 24px; right: 24px; top: auto; bottom: 26px; width: auto; }
  .mission-home .mission-photo-index, .mission-caption-eyebrow { display: none; }
  .mission-home h3 { font-size: clamp(28px, 7vw, 36px); }
  .mission-home figcaption > p { font-size: 14px; margin-top: 10px; }
  .mission-details { position: relative; inset: auto; width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 14px 0 0; padding: 0; }
  .mission-story { min-height: 0; border: 1px solid #d6e9f3; border-radius: var(--radius-panel); background: #fff; box-shadow: none; }
  .mission-story-image { position: relative; inset: auto; aspect-ratio: 4 / 5; }
  .mission-system img { object-position: 50% 55%; }
  .mission-air img { object-position: 48% 40%; }
  .mission-story figcaption { min-height: 0; padding: 16px 14px 18px; justify-content: flex-start; color: #183343; }
  .mission-story-top { position: static; margin-bottom: 12px; }
  .mission-story-index { display: none; }
  .mission-story-icon { width: 30px; height: 30px; border: 0; border-radius: 0; background: none; color: #178ac0; }
  .mission-story-icon svg { width: 28px; height: 28px; }
  .mission-story h3 { color: #183e55; font-size: clamp(18px, 4.7vw, 24px); letter-spacing: -.45px; line-height: 1.2; overflow-wrap: anywhere; }
  .mission-story p { color: #596f7d; font-size: 14px; line-height: 1.5; margin-top: 8px; min-height: 0; }
  .mission-principles { position: relative; inset: auto; margin: 28px 0 0; padding: 0; grid-template-columns: 1fr; gap: 20px; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
  .mission-small-title { max-width: none; font-size: 24px; text-align: center; margin-bottom: 2px; }
  .mission-principles > div { padding: 18px 0 0; border: 0; border-top: 1px solid #c9e2ef; gap: 14px; }
  .mission-principles svg { width: 26px; height: 26px; margin-top: 2px; }
  .mission-principles div p { font-size: 14px; line-height: 1.6; }
  .mission-principles strong { font-size: 17px; }
  .mission-closing { margin-top: 26px; padding-top: 0; }
  .mission-closing::before, .mission-closing > p { display: none; }
  .mission-link { width: 100%; }
}
@media (max-width: 767px) {
  .mission-story { aspect-ratio: 1; border: 1px solid #e8e7e1; border-radius: 12px; }
  .mission-story-image { position: absolute; inset: 0; aspect-ratio: auto; }
  .mission-story figcaption { position: absolute; inset: 0; padding: 0; }
  .mission-story-copy { min-height: 0; padding: 10px 12px 12px; }
  .mission-story-copy::before { top: -48px; height: 48px; }
  .mission-story-top, .mission-story p { display: none; }
  .mission-story h3 { color: #fff; font-size: clamp(18px, 4.4vw, 22px); line-height: 1.25; letter-spacing: -.3px; text-shadow: none; }
  .mission-story-title-desktop { display: none; }
  .mission-story-title-mobile { display: block; }
}
@media (prefers-reduced-motion: reduce) {
  .mission-link, .mission-link svg { transition: none; }
}
.mission-gallery-trigger { display: block; padding: 0; border: 0; background: #d5e1e5; color: inherit; text-align: left; cursor: zoom-in; }
.mission-story-image.mission-gallery-trigger { width: 100%; height: 100%; }
.mission-gallery-trigger:focus-visible { outline: 3px solid #7dd6ff; outline-offset: -4px; }
.mission-home figcaption, .mission-story figcaption { pointer-events: none; }
</style>
