<script setup>
import { computed, ref } from "vue";
import SiteIcon from "./SiteIcon.vue";

defineEmits(["quote"]);
const selectedIndex = ref(0);
const services = [
  {
    id: "cooling", mobileDescription: "AC repairs, upgrades, and tune-ups to keep your home cool.", icon: "snow", name: "Air Conditioning", short: "Keep your cool.",
    image: "/images/hvac-service-photo.png",
    alt: "HVAC technician checking refrigerant gauges beside an outdoor air conditioner.",
    headline: "Cool air. Comfortable days.",
    description: "From an AC that won't cool to a system ready for an upgrade, we help you find the right fix and keep your home comfortable.",
    includes: [
      { icon: "tool", title: "AC repairs", detail: "Find the fault. Restore the cool." },
      { icon: "snow", title: "New installations", detail: "The right system for your space." },
      { icon: "clock", title: "Seasonal tune-ups", detail: "Keep your AC ready for the heat." },
    ],
    action: "Request AC Service",
  },
  {
    id: "heating", mobileDescription: "Reliable repairs and maintenance for a warmer, more comfortable home.", icon: "heat", name: "Heating Solutions", short: "Warmth you can rely on.",
    image: "/images/hvac-indoor-photo.png",
    alt: "Technician inspecting a residential heating system with a diagnostic meter.",
    headline: "A warmer welcome home.",
    description: "Uneven rooms, unusual noises, or no heat at all? We diagnose the problem and care for the system that keeps your home warm.",
    includes: [
      { icon: "tool", title: "Furnace repairs", detail: "Resolve faults and uneven heating." },
      { icon: "heat", title: "Heat pumps", detail: "Efficient comfort, all year round." },
      { icon: "clock", title: "Heating maintenance", detail: "Get your system ready for winter." },
    ],
    action: "Request Heating Service",
  },
  {
    id: "air-quality", mobileDescription: "Cleaner air and balanced humidity, tailored to your home.", icon: "air", name: "Indoor Air Quality", short: "Make room for better air.",
    image: "/images/service-air-quality.png",
    alt: "Gloved technician fitting a clean pleated air filter into a home air handler.",
    headline: "A fresh start, in every room.",
    description: "Give the air inside your home the attention it deserves with filtration, ventilation, and humidity solutions suited to your space.",
    includes: [
      { icon: "shield", title: "Air filtration", detail: "Help capture airborne particles." },
      { icon: "air", title: "Ventilation", detail: "Keep fresh air moving through." },
      { icon: "home", title: "Humidity control", detail: "Bring moisture levels into balance." },
    ],
    action: "Request Air Quality Service",
  },
  {
    id: "emergency", mobileDescription: "Heating or cooling stopped? Find the fault and get your comfort back.", icon: "tool", name: "Emergency HVAC Repair", short: "Get your comfort back.",
    image: "/images/service-emergency.png",
    alt: "HVAC technician diagnosing an outdoor air conditioner with a work light at dusk.",
    headline: "When comfort can't wait.",
    description: "An unexpected breakdown can disrupt your whole day. Get help identifying the fault, understanding your options, and restoring your heating or cooling.",
    includes: [
      { icon: "tool", title: "System diagnostics", detail: "Understand what's gone wrong." },
      { icon: "snow", title: "Cooling breakdowns", detail: "Get help when your AC stops." },
      { icon: "heat", title: "Heating failures", detail: "A clear path back to warmth." },
    ],
    action: "Request Emergency Repair",
  },
];
const selected = computed(() => services[selectedIndex.value]);
function selectService(index) {
  selectedIndex.value = index;
}
</script>

<template>
  <section id="services" class="service-showcase page-section" aria-labelledby="services-title">
    <div class="service-container">
      <header class="service-heading">
        <span class="section-tag"><span aria-hidden="true"></span>Our Services</span>
        <h2 id="services-title">Expert care.<br /><span>For every kind of comfort.</span></h2>
        <p>Cooling, heating, and healthier air. One team for everything your home needs.</p>
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
        <div class="service-feature-photo">
          <img v-for="(service, index) in services" :key="service.id" :src="service.image"
            :alt="selectedIndex === index ? service.alt : ''" :aria-hidden="selectedIndex !== index"
            :class="{ 'is-visible': selectedIndex === index }" width="1536" height="1024" loading="lazy" decoding="async" />
          <span class="service-photo-label"><span></span>Care that comes to you</span>
          <div class="service-photo-caption" aria-hidden="true">
            <SiteIcon :name="selected.icon" />
            <span>{{ selected.short }}</span>
            <span class="service-photo-number">0{{ selectedIndex + 1 }} / 04</span>
          </div>
        </div>
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
        <div><SiteIcon name="conversation" /><p>Not sure what your home needs?<span>Start with a conversation. We'll help with the rest.</span></p></div>
        <button type="button" @click="$emit('quote')">Let's find the right service<SiteIcon /></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-summary-mobile { display: none; }
.service-showcase { padding-block: 100px 72px; color: #183343; background: linear-gradient(180deg, #fff 0%, #f3fbff 55%, #e2f4fd 100%); }
.service-container { width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; }
.service-heading { display: grid; grid-template-columns: 1.6fr 1fr; align-items: end; gap: 24px 64px; margin-bottom: 44px; }
.service-heading > .section-tag { grid-column: 1 / -1; justify-self: start; }
.service-heading h2 { margin: 0; color: #183343; font-size: clamp(38px, 4.2vw, 56px); font-weight: 500; line-height: 1.08; letter-spacing: -2px; }
.service-heading h2 span { color: #178ac0; }
.service-heading > p { justify-self: end; max-width: 340px; margin: 0; color: #596f7d; font-size: 18px; line-height: 1.6; }
.service-options { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; padding: 7px; border: 1px solid #cce5f1; border-radius: 26px; background: #eaf5fb; margin-bottom: 22px; }
.service-option { position: relative; display: flex; flex-direction: column; gap: 19px; min-width: 0; padding: 24px; border: 0; border-radius: 19px; background: transparent; color: #31576d; text-align: left; cursor: pointer; transition: background 200ms, color 200ms, box-shadow 200ms; }
.service-option + .service-option::before { content: ''; position: absolute; left: 0; top: 26px; bottom: 26px; width: 1px; background: #cce2ed; }
.service-option.is-selected::before, .service-option.is-selected + .service-option::before { opacity: 0; }
.service-option:hover { background: #ffffff80; }
.service-option.is-selected { background: #fff; color: #126f9c; box-shadow: 0 5px 20px #175e7b10, inset 0 -3px #24a9e1; }
.service-option-top, .service-option-bottom { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.service-option-top > svg { width: 31px; height: 31px; color: #168fc3; stroke-width: 1.4; }
.service-option-top > span { font-size: 14px; letter-spacing: 1.5px; color: #6b8b9b; }
.service-option > strong { margin-top: 3px; color: inherit; font-size: clamp(17px, 1.5vw, 22px); font-weight: 500; letter-spacing: -.6px; line-height: 1.2; }
.service-option-bottom { margin-top: auto; font-size: 14px; color: #597787; }
.service-option-bottom > svg { width: 18px; height: 18px; flex-shrink: 0; color: #168fc3; transform: rotate(45deg); transition: transform 200ms; }
.service-option.is-selected .service-option-bottom > svg { transform: rotate(90deg); }
.service-feature { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); padding: 8px; border: 1px solid #daeaf2; border-radius: 30px; background: #fff; box-shadow: 0 24px 60px -40px #16688e50; overflow: hidden; }
.service-feature-photo { position: relative; isolation: isolate; min-height: 560px; overflow: hidden; border-radius: 23px; background: #cfe5ee; }
.service-feature-photo > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 48% center; opacity: 0; transition: opacity 300ms ease; }
.service-feature-photo > img.is-visible { opacity: 1; }
.service-feature-photo::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, #122e4215 0%, transparent 50%, #102c45a6 100%); }
.service-photo-label { position: absolute; z-index: 1; top: 25px; left: 25px; display: inline-flex; align-items: center; gap: 9px; padding: 10px 14px; border-radius: 50px; background: #fffffff0; color: #31576d; font-size: 14px; }
.service-photo-label > span { width: 6px; height: 6px; border-radius: 50%; background: #20a9df; }
.service-photo-caption { position: absolute; z-index: 1; inset: auto 30px 30px; display: flex; align-items: center; gap: 14px; color: #fff; }
.service-photo-caption > svg { width: 32px; height: 32px; flex-shrink: 0; stroke-width: 1.3; }
.service-photo-caption > span:not(.service-photo-number) { font-size: clamp(20px, 2vw, 29px); letter-spacing: -.6px; line-height: 1.2; }
.service-photo-number { margin-left: auto; white-space: nowrap; font-size: 14px; letter-spacing: 1px; }
.service-feature-content { display: flex; flex-direction: column; align-items: flex-start; padding: clamp(28px, 3.5vw, 50px); }
.service-eyebrow { color: #1686b8; font-size: 14px; font-weight: 500; letter-spacing: 1.6px; text-transform: uppercase; }
.service-feature-content h3 { margin: 17px 0 18px; max-width: 490px; font-size: clamp(32px, 3vw, 45px); font-weight: 500; line-height: 1.08; letter-spacing: -1.5px; color: #183e55; text-wrap: balance; }
.service-summary { margin: 0; color: #5a7180; font-size: 15px; line-height: 1.7; }
.service-inclusions { list-style: none; width: 100%; padding: 0; margin: 24px 0 28px; }
.service-inclusions li { display: flex; align-items: center; gap: 14px; padding: 15px 0; border-bottom: 1px solid #e0edf4; }
.service-inclusions li:first-child { border-top: 1px solid #e0edf4; }
.service-inclusion-icon { display: grid; place-items: center; width: 40px; height: 40px; flex-shrink: 0; color: #168fc3; background: #edf8fe; border-radius: 12px; }
.service-inclusion-icon svg { width: 23px; height: 23px; stroke-width: 1.4; }
.service-inclusions h4 { margin: 0 0 4px; font-size: 16px; line-height: 1.2; font-weight: 500; color: #24485e; }
.service-inclusions p { margin: 0; font-size: 14px; line-height: 1.4; color: #69808d; }
.service-check { margin-left: auto; flex-shrink: 0; width: 17px; height: 17px; color: #168fc3; }
.service-request { margin-top: auto; min-height: 50px; gap: 24px; font-size: 14px; }
.service-request svg { width: 19px; height: 19px; flex-shrink: 0; }
.service-guidance { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 28px 12px 0; }
.service-guidance > div { display: flex; align-items: center; gap: 16px; }
.service-guidance > div > svg { width: 29px; height: 29px; color: #168fc3; flex-shrink: 0; }
.service-guidance p { margin: 0; font-size: 16px; color: #31576d; }
.service-guidance p span { display: block; margin-top: 5px; color: #69808d; font-size: 14px; line-height: 1.5; }
.service-guidance button { display: inline-flex; align-items: center; gap: 15px; min-height: 44px; padding: 8px 0; background: transparent; border: 0; color: #167ead; font-size: 14px; cursor: pointer; }
.service-guidance button svg { width: 20px; height: 20px; }
.service-option:focus-visible, .service-request:focus-visible, .service-guidance button:focus-visible { outline: 3px solid #168fc3; outline-offset: 4px; }
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
  .service-options { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px; border-radius: 23px; }
  .service-option { gap: 13px; padding: 17px; border-radius: 16px; }
  .service-option + .service-option::before { display: none; }
  .service-option > strong { font-size: 18px; }
  .service-option-top > svg { width: 26px; height: 26px; }
  .service-option-bottom > span { line-height: 1.4; }
  .service-feature { grid-template-columns: 1fr; border-radius: 25px; }
  .service-feature-photo { min-height: 0; aspect-ratio: 16 / 11; border-radius: 18px; }
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
  .service-option { background: #eaf5fb; padding: 18px 14px; border: 1px solid #cce5f1; gap: 14px; }
  .service-option > strong { font-size: 17px; line-height: 1.25; }
  .service-option-bottom > svg { display: block; }
  .service-option.is-selected { border-color: #82cbea; }
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
  .service-inclusions { margin: 22px 0 24px; padding: 6px 14px; border-radius: 16px; background: #f1f9fd; }
  .service-inclusions li { padding: 12px 0; gap: 12px; }
  .service-inclusions li:first-child { border-top: 0; }
  .service-inclusions li:last-child { border-bottom: 0; }
  .service-inclusion-icon { width: 28px; height: 28px; background: none; border-radius: 0; }
  .service-inclusions h4 { margin: 0; font-size: 15px; line-height: 1.35; }
  .service-inclusions p, .service-check { display: none; }
  .service-request { min-height: 50px; }
}
</style>
