<script setup>
import SiteIcon from "./SiteIcon.vue";

const benefits = [
  { icon: "shield", title: "Licensed & insured", text: "Pennsylvania HVAC service for homes and businesses." },
  { icon: "clock", title: "24/7 emergency help", text: "Same-day priority for no-heat and no-cool calls." },
  { icon: "price", title: "Free estimates", text: "A written quote before any work begins." },
  { icon: "check", title: "Home warranty friendly", text: "We work with most home warranty companies." },
];
</script>

<template>
  <section id="why-us" class="benefits-band page-section" aria-labelledby="benefits-title">
    <div class="benefits-band-inner">
      <header class="benefits-band-heading">
        <p>Why Philly HVAC Pros</p>
        <h2 id="benefits-title">Local service.<br />Clear options.</h2>
      </header>
      <ul class="benefits-band-list">
        <li v-for="benefit in benefits" :key="benefit.title">
          <SiteIcon :name="benefit.icon" />
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.benefits-band.page-section {
  padding-block: 44px;
  background: var(--brand-primary);
  border-top: 1px solid #ffffff26;
  color: #fff;
}
.benefits-band-inner {
  width: min(var(--content-max-width), calc(100% - 64px));
  margin-inline: auto;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  align-items: center;
  gap: 44px;
}
.benefits-band-heading > p {
  margin-bottom: 12px;
  color: var(--surface-muted);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.4px;
  text-transform: uppercase;
}
.benefits-band-heading h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -.8px;
}
.benefits-band-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0 0 0 36px;
  border-left: 1px solid color-mix(in srgb, var(--surface-muted) 22.0%, transparent);
}
.benefits-band-list svg { width: 29px; height: 29px; color: var(--surface-muted); margin-bottom: 13px; }
.benefits-band-list h3 { color: #fff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -.2px; margin-bottom: 7px; }
.benefits-band-list p { color: var(--surface-muted); font-size: 14px; line-height: 1.55; max-width: 185px; }
@media (max-width: 1000px) {
  .benefits-band-inner { grid-template-columns: 160px minmax(0, 1fr); gap: 24px; }
  .benefits-band-list { gap: 20px; padding-left: 24px; }
  .benefits-band-heading h2 { font-size: 25px; }
}
@media (max-width: 767px) {
  .benefits-band.page-section { padding-block: 40px; }
  .benefits-band-inner { width: calc(100% - 40px); grid-template-columns: 1fr; gap: 26px; min-width: 0; }
  .benefits-band-heading { text-align: center; }
  .benefits-band-heading > p { margin-bottom: 12px; }
  .benefits-band-heading h2 { font-size: 30px; line-height: 1.15; }
  .benefits-band-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 0; margin: 0; border: 0; }
  .benefits-band-list li { min-width: 0; padding: 22px 12px; border: 1px solid color-mix(in srgb, var(--surface-muted) 22.0%, transparent); border-radius: var(--radius-control); background: #ffffff08; text-align: center; }
  .benefits-band-list svg { display: block; margin: 0 auto 14px; }
  .benefits-band-list h3 { font-size: 16px; line-height: 1.3; }
  .benefits-band-list p { max-width: 230px; margin-inline: auto; font-size: 14px; line-height: 1.5; }
}
</style>
