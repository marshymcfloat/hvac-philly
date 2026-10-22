<script setup>
import SiteIcon from "./SiteIcon.vue";
import ComfortOverview from "./ComfortOverview.vue";
import { business } from "../siteContent.js";
defineEmits(["quote"]);
</script>

<template>
  <div class="hero-composition">
  <section id="home" class="hero-section" aria-labelledby="hero-title">
    <div class="hero-stage">
    <div class="hero-visual">
      <picture>
      <source media="(max-width: 767px)" srcset="/images/hero-hvac-mobile.png" />
      <img src="/images/hero-hvac-service-v2.png"
        alt="Technician checking refrigerant gauges while servicing an outdoor air conditioner beside a home"
        width="1122" height="1402" fetchpriority="high" />
      </picture>
    </div>
    <div class="hero-inner">
      <div class="hero-editorial">
        <div class="hero-eyebrow"><SiteIcon name="air" /><span>PHILADELPHIA &amp; THE MAIN LINE</span></div>
        <h1 id="hero-title">Philly heating.<br /><span>Cooling. Covered.</span></h1>
        <p class="hero-description">Furnace, boiler, AC, and heat-pump experts for homes and businesses. 24/7 emergency service across the Philadelphia metro area.</p>
        <div class="hero-cta-row">
          <a class="button button-white" :href="business.phoneHref">Call {{ business.phone }}<SiteIcon name="phone" /></a>
          <button type="button" class="hero-services-link" @click="$emit('quote')">Request an estimate<SiteIcon /></button>
        </div>
        <div class="hero-care-note">
          <span class="hero-shield"><SiteIcon name="shield" /></span>
          <div><strong>Superior Comfort Heating &amp; Cooling LLC</strong><p>Licensed in PA. Insured. Free estimates.</p></div>
        </div>
      </div>
    </div>
    </div>
  </section>
    <ComfortOverview />
  </div>
</template>

<style scoped>
.hero-composition { height: min(100dvh, 1000px); min-height: 780px; margin-top: -110px; display: grid; grid-template-rows: minmax(0, 1fr) auto; }
.hero-visual picture { display: block; width: 100%; height: 100%; }

.hero-section { --hero-nav-space: 110px; height: 100%; min-height: 0; margin-top: 0; padding: 0; display: grid; grid-template-rows: minmax(0, 1fr); background: var(--brand-dark); }
.hero-stage { position: relative; min-height: 0; padding-top: var(--hero-nav-space); background: linear-gradient(145deg, var(--brand-dark) 0%, var(--brand-primary) 58%, var(--brand-secondary) 100%); overflow: hidden; }
.hero-visual {
  position: absolute;
  inset: 0 0 0 40%;
  z-index: 0;
  mask-image: linear-gradient(90deg, transparent, #000 24%), linear-gradient(110deg, transparent 4%, #00000008 10%, #00000080 20%, #000 30%);
  mask-composite: intersect;
}
.hero-visual img { display: block; width: 100%; height: 100%; max-width: none; object-fit: cover; object-position: 56% 47%; }
.hero-visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, color-mix(in srgb, var(--brand-primary) 70.2%, transparent) 0%, transparent 30%, transparent 65%, color-mix(in srgb, var(--brand-primary) 34.9%, transparent) 100%); }
.hero-inner { position: relative; z-index: 3; height: 100%; min-height: 0; display: grid; grid-template-columns: 1.05fr 1fr; gap: 90px; align-items: center; padding-block: 24px 36px; }
.hero-editorial { width: 100%; max-width: 590px; }
.hero-eyebrow { display: flex; align-items: center; gap: 12px; color: var(--surface-muted); font-size: 14px; font-weight: 500; letter-spacing: 1.8px; margin-bottom: clamp(16px, 2.8dvh, 28px); }
.hero-eyebrow svg { width: 28px; height: 28px; flex-shrink: 0; }
.hero-editorial h1 { font-size: clamp(48px, min(5.1vw, 8dvh), 74px); font-weight: 500; line-height: 1.12; letter-spacing: -2.8px; color: #fff; }
.hero-editorial h1 span { display: inline-block; margin-top: 5px; color: var(--surface-muted); }
.hero-description { max-width: 440px; margin-top: 28px; color: var(--surface-muted); font-size: 18px; line-height: 1.65; }
.hero-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 32px; margin-top: 34px; }
.hero-cta-row .button { min-height: 54px; padding: 15px 23px; border-radius: var(--radius-control); color: var(--ink); gap: 25px; background: #fff; border: 1px solid #fff; box-shadow: none; }
.hero-cta-row .button:hover { background: var(--surface-muted); border-color: var(--surface-muted); }
.hero-services-link { display: inline-flex; align-items: center; gap: 12px; padding: 0; border: 0; background: transparent; color: #fff; min-height: 48px; font: inherit; font-size: 15px; cursor: pointer; }
.hero-services-link svg { width: 19px; height: 19px; }
.hero-services-link:hover { text-decoration: underline; text-underline-offset: 6px; }
.hero-care-note { display: flex; align-items: center; gap: 14px; margin-top: clamp(20px, 3dvh, 32px); padding: 18px 20px; border-left: 2px solid var(--surface-muted); border-radius: 0; background: transparent; max-width: 435px; color: var(--surface-muted); }
.hero-shield { display: grid; place-items: center; width: 42px; height: 42px; flex-shrink: 0; color: var(--surface-muted); border: 0; }
.hero-shield svg { width: 24px; height: 24px; }
.hero-care-note strong { display: block; font-size: 15px; font-weight: 500; }
.hero-care-note p { margin-top: 4px; font-size: 14px; line-height: 1.5; color: var(--surface-muted); }
@media (max-width: 1150px) {
  .hero-section { --hero-nav-space: 92px; }
  .hero-inner { grid-template-columns: 1.1fr 1fr; gap: 32px; }
  .hero-editorial h1 { font-size: clamp(43px, min(5.5vw, 8dvh), 64px); letter-spacing: -2.5px; }
  .hero-description { font-size: 16px; }
  .hero-cta-row { gap: 16px; }
}
@media (max-height: 760px) and (min-width: 768px) {
  .hero-inner { padding-block: 16px 24px; }
  .hero-editorial h1 { font-size: clamp(40px, 7.5dvh, 58px); }
  .hero-description { margin-top: 18px; font-size: 16px; }
  .hero-cta-row { margin-top: 20px; }
  .hero-care-note { margin-top: 18px; padding: 10px 14px; }
}
@media (max-width: 1150px) {
  .hero-composition { margin-top: -92px; }
}
@media (min-width: 768px) and (max-width: 1000px) {
  .hero-care-note { display: none; }
}
@media (max-width: 767px) {
  .hero-composition { height: auto; min-height: 0; display: block; }
  .hero-section { height: 100dvh; max-height: none; margin-top: 0; }
  .hero-stage { padding: 0; display: grid; grid-template-rows: minmax(0, 1fr) auto; background: var(--brand-dark); }
  .hero-visual { inset: 0 0 auto; height: 72%; mask-image: none; opacity: 1; }
  .hero-visual img { object-position: 50% 40%; }
  .hero-visual::after { background: linear-gradient(180deg, color-mix(in srgb, var(--brand-dark) 65.1%, transparent) 0%, transparent 22%, transparent 52%, color-mix(in srgb, var(--brand-primary) 50.2%, transparent) 75%, var(--brand-primary) 100%); }
  .hero-inner { grid-row: 2; display: block; width: 100%; height: auto; min-height: 0; padding: 44px 24px max(28px, env(safe-area-inset-bottom)); margin: 0; background: linear-gradient(180deg, color-mix(in srgb, var(--brand-primary) 0.0%, transparent), var(--brand-primary) 34%); }
  .hero-editorial { max-width: 520px; margin-inline: auto; }
  .hero-eyebrow { font-size: 14px; letter-spacing: .5px; line-height: 1.4; gap: 9px; margin-bottom: 12px; }
  .hero-eyebrow svg { width: 24px; height: 24px; }
  .hero-editorial h1 { font-size: clamp(38px, 10vw, 58px); line-height: 1.05; letter-spacing: -1.7px; }
  .hero-editorial h1 span { margin-top: 3px; }
  .hero-description { margin-top: 16px; font-size: 16px; line-height: 1.5; max-width: 380px; }
  .hero-description br { display: none; }
  .hero-cta-row { display: flex; flex-wrap: wrap; margin-top: 22px; gap: 8px 20px; }
  .hero-cta-row .button { min-height: 48px; padding: 11px 15px; gap: 12px; font-size: 14px; }
  .hero-services-link { min-height: 48px; font-size: 14px; gap: 8px; }
  .hero-care-note { display: none; }
}
@media (max-width: 380px) {
  .hero-inner { padding-inline: 20px; }
  .hero-cta-row { gap: 6px 12px; }
  .hero-cta-row .button { padding-inline: 12px; gap: 8px; }
  .hero-cta-row .button svg { display: none; }
}
@media (max-height: 700px) and (max-width: 767px) {
  .hero-inner { padding-top: 28px; padding-bottom: 20px; }
  .hero-eyebrow { display: none; }
  .hero-editorial h1 { font-size: 38px; }
  .hero-description { margin-top: 12px; }
  .hero-cta-row { margin-top: 16px; }
}
@media (max-height: 480px) and (max-width: 767px) {
  .hero-stage { overflow-y: auto; }
  .hero-inner { margin-top: 110px; }
  .hero-visual { height: 100%; }
}
@media (max-width: 767px) {
  .hero-editorial { text-align: center; }
  .hero-eyebrow { justify-content: center; }
  .hero-description { margin-inline: auto; }
  .hero-cta-row { display: grid; grid-template-columns: 1fr; gap: 10px; }
  .hero-cta-row .button, .hero-services-link { width: 100%; min-height: 48px; justify-content: center; }
  .hero-services-link { border: 1px solid color-mix(in srgb, var(--surface-muted) 40.0%, transparent); border-radius: var(--radius-control); background: #ffffff08; }
}
</style>
