<script setup>
import SiteIcon from "./SiteIcon.vue";
import ComfortOverview from "./ComfortOverview.vue";
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
        <div class="hero-eyebrow"><SiteIcon name="air" /><span>HEATING. COOLING. PEACE OF MIND.</span></div>
        <h1 id="hero-title">Home comfort.<br /><span>Done right.</span></h1>
        <p class="hero-description">Expert heating, cooling, and air care.<br />Honest service. A more comfortable home.</p>
        <div class="hero-cta-row">
          <button class="button button-white" @click="$emit('quote')">Book a Service<SiteIcon /></button>
          <a href="#services" class="hero-services-link">Explore services<SiteIcon /></a>
        </div>
        <div class="hero-care-note">
          <span class="hero-shield"><SiteIcon name="shield" /></span>
          <div><strong>Expert hands. Honest advice.</strong><p>Licensed, insured, and here to help.</p></div>
        </div>
      </div>
    </div>
    </div>
  </section>
    <ComfortOverview />
  </div>
</template>

<style scoped>
.hero-composition { height: min(100dvh, 1000px); margin-top: -110px; display: grid; grid-template-rows: minmax(0, 1fr) auto; }
.hero-visual picture { display: block; width: 100%; height: 100%; }

.hero-section { --hero-nav-space: 110px; height: 100%; min-height: 0; margin-top: 0; padding: 0; display: grid; grid-template-rows: minmax(0, 1fr); background: #095979; }
.hero-stage { position: relative; min-height: 0; padding-top: var(--hero-nav-space); background: linear-gradient(145deg, #095979 0%, #0d759c 58%, #3fa7c6 100%); overflow: hidden; }
.hero-visual {
  position: absolute;
  inset: 0 0 0 40%;
  z-index: 0;
  mask-image: linear-gradient(90deg, transparent, #000 24%), linear-gradient(110deg, transparent 4%, #00000008 10%, #00000080 20%, #000 30%);
  mask-composite: intersect;
}
.hero-visual img { display: block; width: 100%; height: 100%; max-width: none; object-fit: cover; object-position: 56% 47%; }
.hero-visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, #063f69b3 0%, transparent 30%, transparent 65%, #083f6359 100%); }
.hero-inner { position: relative; z-index: 3; height: 100%; min-height: 0; display: grid; grid-template-columns: 1.05fr 1fr; gap: 90px; align-items: center; padding-block: 24px 36px; }
.hero-editorial { width: 100%; max-width: 590px; }
.hero-eyebrow { display: flex; align-items: center; gap: 12px; color: #87dcff; font-size: 14px; font-weight: 500; letter-spacing: 1.8px; margin-bottom: clamp(16px, 2.8dvh, 28px); }
.hero-eyebrow svg { width: 28px; height: 28px; flex-shrink: 0; }
.hero-editorial h1 { font-size: clamp(48px, min(5.1vw, 8dvh), 74px); font-weight: 500; line-height: 1.12; letter-spacing: -2.8px; color: #fff; }
.hero-editorial h1 span { display: inline-block; margin-top: 5px; color: #58d1ff; }
.hero-description { max-width: 440px; margin-top: 28px; color: #e2f4fc; font-size: 18px; line-height: 1.65; }
.hero-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 32px; margin-top: 34px; }
.hero-cta-row .button { min-height: 54px; padding: 15px 23px; border-radius: 13px; color: #fff; gap: 25px; background: linear-gradient(180deg, #1597ce, #2db9ee); border: 1px solid #8edfff; box-shadow: inset 0 1px 2px #ffffff80, 0 8px 22px #08618a25; }
.hero-cta-row .button:hover { background: linear-gradient(180deg, #1aa5dc, #40c5f5); border-color: #c5efff; }
.hero-services-link { display: inline-flex; align-items: center; gap: 12px; color: #fff; min-height: 48px; font-size: 15px; }
.hero-services-link svg { width: 19px; height: 19px; }
.hero-services-link:hover { text-decoration: underline; text-underline-offset: 6px; }
.hero-care-note { display: flex; align-items: center; gap: 14px; margin-top: clamp(20px, 3dvh, 32px); padding: 18px 20px; border-left: 2px solid #58d1ff; border-radius: 0 12px 12px 0; background: #06476555; max-width: 435px; color: #dff3fb; }
.hero-shield { display: grid; place-items: center; width: 42px; height: 42px; flex-shrink: 0; color: #58d1ff; border: 1px solid #58d1ff50; border-radius: 50%; }
.hero-shield svg { width: 24px; height: 24px; }
.hero-care-note strong { display: block; font-size: 15px; font-weight: 500; }
.hero-care-note p { margin-top: 4px; font-size: 14px; line-height: 1.5; color: #c9e4ef; }
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
@media (max-width: 767px) {
  .hero-composition { height: auto; display: block; }
  .hero-section { height: 100dvh; max-height: none; margin-top: 0; }
  .hero-stage { padding: 0; display: grid; grid-template-rows: minmax(0, 1fr) auto; background: #095979; }
  .hero-visual { inset: 0 0 auto; height: 72%; mask-image: none; opacity: 1; }
  .hero-visual img { object-position: 50% 40%; }
  .hero-visual::after { background: linear-gradient(180deg, #062f49a6 0%, transparent 22%, transparent 52%, #09597980 75%, #095979 100%); }
  .hero-inner { grid-row: 2; display: block; width: 100%; height: auto; min-height: 0; padding: 44px 24px max(28px, env(safe-area-inset-bottom)); margin: 0; background: linear-gradient(180deg, #09597900, #095979 34%); }
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
  .hero-services-link { border: 1px solid #b8e6f866; border-radius: 13px; background: #ffffff08; }
}
</style>
