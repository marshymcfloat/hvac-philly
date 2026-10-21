<script setup>
import SiteIcon from "./SiteIcon.vue";

const services = [
  { icon: "heat", title: "Furnaces & boilers", detail: "Repair & replacement" },
  { icon: "snow", title: "AC & heat pumps", detail: "Installation & service" },
  { icon: "home", title: "Water heaters", detail: "Gas & electric systems" },
  { icon: "clock", title: "24/7 emergencies", detail: "Homes & businesses" },
];
</script>

<template>
  <section class="comfort-overview" aria-labelledby="comfort-overview-title">
    <div class="comfort-overview-inner">
      <div class="comfort-overview-heading">
        <span>PHILLY HVAC PROS</span>
        <h2 id="comfort-overview-title">Your local HVAC team.</h2>
      </div>
      <ul class="comfort-overview-services">
        <li v-for="service in services" :key="service.icon">
          <SiteIcon :name="service.icon" />
          <div><h3>{{ service.title }}</h3><p>{{ service.detail }}</p></div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.comfort-overview { position: relative; z-index: 4; padding: 26px 0; background: #e7f4fb; border-top: 1px solid #ffffff90; }
.comfort-overview-inner { width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; display: grid; grid-template-columns: 220px 1fr; align-items: center; gap: 32px; }
.comfort-overview-heading > span { color: #50788c; font-size: 14px; font-weight: 500; letter-spacing: 1.4px; }
.comfort-overview-heading h2 { margin-top: 9px; color: #214c64; font-size: 25px; font-weight: 500; line-height: 1.15; letter-spacing: -.8px; }
.comfort-overview-services { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); list-style: none; margin: 0; padding: 0; }
.comfort-overview-services li { display: flex; align-items: center; gap: 13px; min-height: 64px; padding: 6px 22px; border-left: 1px solid #c5dfec; }
.comfort-overview-services svg { width: 29px; height: 29px; flex-shrink: 0; color: #178ac0; stroke-width: 1.5; }
.comfort-overview-services h3 { color: #254b61; font-size: 17px; font-weight: 500; letter-spacing: -.3px; }
.comfort-overview-services p { color: #567689; font-size: 14px; line-height: 1.4; margin-top: 4px; }
@media (max-width: 1100px) {
  .comfort-overview-inner { grid-template-columns: 170px 1fr; gap: 16px; }
  .comfort-overview-heading h2 { font-size: 22px; }
  .comfort-overview-services li { padding-inline: 13px; gap: 10px; }
  .comfort-overview-services h3 { font-size: 15px; }
  .comfort-overview-services svg { width: 25px; height: 25px; }
}
@media (max-width: 767px) {
  .comfort-overview { padding-block: 22px 24px; }
  .comfort-overview-inner { width: calc(100% - 40px); grid-template-columns: 1fr; gap: 20px; min-width: 0; }
  .comfort-overview-heading { text-align: center; }
  .comfort-overview-heading > span { display: none; }
  .comfort-overview-heading h2 { margin: 0; font-size: 22px; letter-spacing: -.5px; }
  .comfort-overview-services { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; }
  .comfort-overview-services li { flex-direction: column; justify-content: flex-start; text-align: center; min-width: 0; min-height: 0; padding: 14px 8px; border: 0; gap: 9px; }
  .comfort-overview-services li:nth-child(even) { border-left: 1px solid #c5dfec; }
  .comfort-overview-services li:nth-child(n + 3) { border-top: 1px solid #c5dfec; }
  .comfort-overview-services svg { width: 28px; height: 28px; }
  .comfort-overview-services h3 { font-size: 16px; line-height: 1.3; }
  .comfort-overview-services p { font-size: 14px; margin-top: 4px; line-height: 1.4; }
}
</style>
