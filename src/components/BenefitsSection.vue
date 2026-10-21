<script setup>
import SiteIcon from "./SiteIcon.vue";

const benefits = [
  { icon: "shield", title: "Licensed experts", text: "Qualified care for your heating and cooling." },
  { icon: "clock", title: "Responsive support", text: "Help when your comfort needs attention." },
  { icon: "price", title: "Upfront pricing", text: "Know the cost before work begins." },
  { icon: "check", title: "Work done right", text: "Careful work. Respect for your home." },
];
</script>

<template>
  <section id="why-us" class="benefits-band page-section" aria-labelledby="benefits-title">
    <div class="benefits-band-inner">
      <header class="benefits-band-heading">
        <p>Why choose us</p>
        <h2 id="benefits-title">Care you can<br />count on.</h2>
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
  background: #155d7b;
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
  color: #c0eaff;
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
  border-left: 1px solid #bde7fa38;
}
.benefits-band-list svg { width: 29px; height: 29px; color: #91ddff; margin-bottom: 13px; }
.benefits-band-list h3 { color: #fff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -.2px; margin-bottom: 7px; }
.benefits-band-list p { color: #d4eaf6; font-size: 14px; line-height: 1.55; max-width: 185px; }
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
  .benefits-band-list li { min-width: 0; padding: 22px 12px; border: 1px solid #bde7fa38; border-radius: var(--radius-control); background: #ffffff08; text-align: center; }
  .benefits-band-list svg { display: block; margin: 0 auto 14px; }
  .benefits-band-list h3 { font-size: 16px; line-height: 1.3; }
  .benefits-band-list p { max-width: 230px; margin-inline: auto; font-size: 14px; line-height: 1.5; }
}
</style>
