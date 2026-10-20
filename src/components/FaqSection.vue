<script setup>
import { onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import SiteIcon from "./SiteIcon.vue";
defineEmits(["quote"]);
const active = ref(null);
const animations = new Map();
function cancelAnswer(element) {
  animations.get(element)?.kill();
  animations.delete(element);
}
function animateAnswer(element, done, opening) {
  cancelAnswer(element);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const currentHeight = element.getBoundingClientRect().height;
  const targetHeight = opening ? element.firstElementChild.offsetHeight : 0;
  gsap.set(element, { height: currentHeight });
  const tween = gsap.to(element, {
    height: targetHeight,
    opacity: opening ? 1 : 0,
    duration: reduced ? 0 : 0.32,
    ease: "power2.inOut",
    overwrite: true,
    onComplete: () => {
      animations.delete(element);
      if (opening) element.style.height = "auto";
      done();
    },
  });
  if (tween.isActive()) animations.set(element, tween);
}
const expandAnswer = (element, done) => animateAnswer(element, done, true);
const collapseAnswer = (element, done) => animateAnswer(element, done, false);
onUnmounted(() => {
  animations.forEach((animation) => animation.kill());
  animations.clear();
});
const faqs = [
  {
    question: "What heating and cooling services do you offer?",
    mobileQuestion: "What services do you offer?",
    answer:
      "We help with air conditioning repairs and installation, furnace and heat pump service, seasonal maintenance, ventilation, air filtration, and indoor air quality. We work with both homes and businesses.",
  },
  {
    question: "Do you offer emergency HVAC services?",
    mobileQuestion: "Can you help in an emergency?",
    answer:
      "Yes. Contact our team when your heating or cooling fails unexpectedly. We will help assess the issue, explain the next steps, and confirm the earliest available appointment.",
  },
  {
    question: "How quickly can a technician arrive?",
    mobileQuestion: "How soon can you visit?",
    answer:
      "Availability depends on your location, the issue, and our current schedule. We prioritize urgent problems and confirm an arrival window when you book.",
  },
  {
    question: "Are your technicians licensed and insured?",
    mobileQuestion: "Are you licensed and insured?",
    answer:
      "Our service is built around qualified technicians, appropriate licensing, and insurance. Ask our team for the credentials relevant to your system and service area.",
  },
  {
    question: "How does your pricing work?",
    mobileQuestion: "How does pricing work?",
    answer:
      "We explain the diagnosis, recommended work, and price before you approve the job. If there are different repair or replacement options, we walk you through them.",
  },
  {
    question: "How do I schedule an appointment?",
    mobileQuestion: "How do I book a service?",
    answer:
      "Select Book Now or Get a Quote to prepare your contact details and choose the service you need.",
  },
];
const groups = [
  { title: "Services & availability", icon: "tool", items: faqs.slice(0, 3).map((faq, index) => ({ ...faq, index })) },
  { title: "Booking & peace of mind", icon: "shield", items: faqs.slice(3).map((faq, index) => ({ ...faq, index: index + 3 })) },
];
</script>

<template>
  <section id="faq" class="faq-section page-section" aria-labelledby="faq-title">
    <div class="faq-container">
      <header class="faq-heading">
        <span class="section-tag"><span aria-hidden="true"></span>Frequently Asked Questions</span>
        <h2 id="faq-title">A little clarity.<br /><span>A lot more comfort.</span></h2>
        <p><span class="faq-desktop-copy">From your first question to your next service visit, here's what you can expect from Climaro.</span><span class="faq-mobile-copy">Helpful answers. One less thing to worry about.</span></p>
      </header>

      <div class="faq-columns">
        <div v-for="group in groups" :key="group.title" class="faq-group">
          <div class="faq-group-heading"><SiteIcon :name="group.icon" /><p>{{ group.title }}</p></div>
          <article v-for="faq in group.items" :key="faq.index" class="faq-item" :class="{ 'is-open': active === faq.index }">
            <h3>
              <button :id="`faq-question-${faq.index}`" :aria-expanded="active === faq.index"
                :aria-controls="`faq-answer-${faq.index}`" @click="active = active === faq.index ? null : faq.index">
                <span class="faq-number" aria-hidden="true">0{{ faq.index + 1 }}</span>
                <span class="faq-question"><span class="faq-desktop-copy">{{ faq.question }}</span><span class="faq-mobile-copy">{{ faq.mobileQuestion }}</span></span>
                <span class="faq-toggle"><SiteIcon name="plus" /></span>
              </button>
            </h3>
            <Transition :css="false" @enter="expandAnswer" @leave="collapseAnswer"
              @enter-cancelled="cancelAnswer" @leave-cancelled="cancelAnswer">
              <div v-show="active === faq.index" :id="`faq-answer-${faq.index}`"
                class="faq-answer" role="region" :aria-hidden="active !== faq.index"
                :inert="active !== faq.index" :aria-labelledby="`faq-question-${faq.index}`">
                <div class="faq-answer-inner"><p>{{ faq.answer }}</p></div>
              </div>
            </Transition>
          </article>
        </div>
      </div>

      <div class="faq-help">
        <span class="faq-help-icon"><SiteIcon name="conversation" /></span>
        <div><h3>Still have a question?</h3><p>Tell us what your home needs. We'll help you find the next step.</p></div>
        <button class="button button-blue" @click="$emit('quote')">Start a Request<SiteIcon /></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-mobile-copy { display: none; }
.faq-section.page-section {
  position: relative;
  padding-block: 96px;
  color: #183343;
  background: linear-gradient(180deg, #e2f4fd 0%, #f4fbff 40%, #fff 100%);
}
.faq-container { width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; }
.faq-heading { display: grid; grid-template-columns: 1.4fr 1fr; align-items: end; gap: 24px 64px; margin-bottom: 40px; }
.faq-heading > .section-tag { grid-column: 1 / -1; justify-self: start; }
.faq-heading h2 { color: #183343; font-size: clamp(40px, 4.2vw, 56px); font-weight: 500; line-height: 1.08; letter-spacing: -2px; }
.faq-heading h2 > span { color: #178ac0; }
.faq-heading > p { max-width: 360px; color: #596975; font-size: 17px; line-height: 1.65; padding-bottom: 4px; }
.faq-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.faq-group { min-width: 0; padding: 12px 26px 10px; border: 1px solid #d8ebf6; border-radius: 26px; background: #fff; box-shadow: 0 12px 35px -24px #176e9c30; }
.faq-group-heading { display: flex; align-items: center; gap: 11px; padding-block: 13px 22px; color: #277da6; }
.faq-group-heading svg { width: 23px; height: 23px; }
.faq-group-heading p { font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.2px; }
.faq-item { border-top: 1px solid #e1edf4; }
.faq-item h3 { margin: 0; }
.faq-item button { display: flex; align-items: center; gap: 14px; width: 100%; min-height: 92px; padding: 21px 0; border-radius: 8px; background: transparent; color: #183343; text-align: left; }
.faq-number { align-self: flex-start; margin-top: 4px; color: #7394a6; font-size: 14px; font-weight: 500; letter-spacing: 1px; }
.faq-question { flex: 1; font-size: 18px; font-weight: 500; line-height: 1.4; letter-spacing: -.35px; }
.faq-toggle { display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; color: #178ac0; background: #edf8fe; }
.faq-toggle svg { width: 19px; height: 19px; transition: transform 220ms cubic-bezier(.22, 1, .36, 1); }
.faq-item button:hover .faq-question, .faq-item.is-open .faq-question { color: #1277a5; }
.faq-item.is-open .faq-toggle { color: #fff; background: #178ac0; }
.faq-item.is-open .faq-toggle svg { transform: rotate(45deg); }
.faq-answer { height: 0; opacity: 0; overflow: hidden; }
.faq-answer-inner { padding: 0 46px 25px 30px; }
.faq-answer p { color: #596f7d; font-size: 15px; line-height: 1.75; }
.faq-help { display: flex; align-items: center; gap: 18px; padding: 25px 28px; margin-top: 28px; border-radius: 22px; background: linear-gradient(110deg, #e8f6ff, #f3faff); border: 1px solid #d7edf9; }
.faq-help-icon { display: grid; place-items: center; width: 50px; height: 50px; flex-shrink: 0; color: #178ac0; border: 1px solid #c9e7f7; border-radius: 16px; background: #fff; }
.faq-help-icon svg { width: 26px; height: 26px; }
.faq-help h3 { color: #183343; font-size: 21px; font-weight: 500; letter-spacing: -.4px; margin-bottom: 6px; }
.faq-help p { color: #536d7e; font-size: 14px; line-height: 1.5; }
.faq-help > button { margin-left: auto; flex-shrink: 0; }
@media (max-width: 1000px) {
  .faq-heading { gap: 24px 36px; }
  .faq-group { padding-inline: 20px; }
  .faq-question { font-size: 17px; }
  .faq-item button { gap: 10px; }
  .faq-answer-inner { padding-left: 26px; padding-right: 10px; }
}
@media (max-width: 767px) {
  .faq-section.page-section { padding-block: 56px; }
  .faq-container { width: calc(100% - 40px); }
  .faq-desktop-copy { display: none; }
  .faq-mobile-copy { display: inline; }
  .faq-heading { grid-template-columns: 1fr; gap: 20px; margin-bottom: 34px; text-align: center; }
  .faq-heading > .section-tag { justify-self: center; white-space: normal; font-size: 14px; }
  .faq-heading > .section-tag > span { flex-shrink: 0; }
  .faq-heading h2 { font-size: clamp(34px, 8vw, 46px); letter-spacing: -1.3px; line-height: 1.1; }
  .faq-heading > p { max-width: 300px; margin-inline: auto; font-size: 16px; line-height: 1.5; padding: 0; }
  .faq-columns { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .faq-group { padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
  .faq-group-heading { gap: 10px; padding: 0 4px 14px; }
  .faq-group-heading svg { width: 24px; height: 24px; flex-shrink: 0; }
  .faq-group-heading p { font-size: 14px; letter-spacing: 0; text-transform: none; }
  .faq-item { border: 1px solid #d4e8f3; border-radius: 16px; background: #fff; margin-bottom: 10px; }
  .faq-item:last-child { margin-bottom: 0; }
  .faq-item.is-open { border-color: #9dd4ed; background: #eef8fe; }
  .faq-item button { min-height: 76px; padding: 17px 16px; gap: 12px; border-radius: 16px; }
  .faq-item button:focus-visible { outline: 3px solid #168fc3; outline-offset: 3px; }
  .faq-number { display: none; }
  .faq-question { min-width: 0; font-size: 17px; line-height: 1.35; letter-spacing: -.2px; }
  .faq-toggle { width: 32px; height: 32px; border: 1px solid #cde7f4; background: #f2faff; }
  .faq-answer-inner { padding: 0 18px 20px; }
  .faq-answer p { font-size: 15px; line-height: 1.65; }
  .faq-help { display: grid; grid-template-columns: 1fr; justify-items: center; text-align: center; padding: 26px 22px; gap: 16px; margin-top: 32px; background: #e7f5fd; border: 1px solid #cee7f4; border-radius: 22px; }
  .faq-help-icon { display: grid; width: 46px; height: 46px; border-radius: 14px; }
  .faq-help > div { min-width: 0; }
  .faq-help h3 { font-size: 23px; margin-bottom: 8px; }
  .faq-help p { font-size: 14px; max-width: 300px; }
  .faq-help > button { width: 100%; min-height: 50px; margin: 2px 0 0; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .faq-toggle svg { transition: none; }
}
</style>
