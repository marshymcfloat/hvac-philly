<script setup>
import SiteIcon from "./SiteIcon.vue";
import LegacyLogo from "./LegacyLogo.vue";
import { business, services } from "../siteContent.js";

defineEmits(["quote", "reviews"]);
const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "HVAC Services", href: "#services" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
</script>

<template>
  <footer id="footer" class="comfort-footer">
    <div class="page-container">
      <div class="footer-panel">
        <div class="footer-airflow" aria-hidden="true"><SiteIcon name="air" /></div>
        <div class="footer-intro-row">
          <div class="footer-statement">
            <span class="footer-eyebrow">PHILADELPHIA HEATING &amp; COOLING</span>
            <p>Your local team.<br /><span>Every season.</span></p>
          </div>
          <div class="footer-invitation">
            <SiteIcon name="conversation" />
            <p>No heat? No cooling?<br />24/7 emergency service is a call away.</p>
            <a :href="business.phoneHref" class="footer-talk">Call {{ business.phone }} <span><SiteIcon name="phone" /></span></a>
          </div>
        </div>
        <div class="footer-details">
          <div class="footer-identity">
            <a href="#home" class="brand" aria-label="Superior Comfort Heating and Cooling home"><LegacyLogo /></a>
            <p>{{ business.company }}</p>
            <span class="footer-local"><SiteIcon name="pin" />Philadelphia &amp; the Main Line</span>
          </div>

          <nav class="footer-navigation" aria-label="Footer navigation">
            <h2>Explore</h2>
            <a v-for="link in links" :key="link.label" :href="link.href">{{ link.label }}</a>
            <button type="button" @click="$emit('reviews')">Customer Stories</button>
          </nav>
          <div class="footer-support">
            <h2>Our services</h2>
            <button v-for="service in services" :key="service.id" @click="$emit('quote', service.name)"><SiteIcon :name="service.icon" />{{ service.name }}<SiteIcon class="footer-small-arrow" /></button>
            <button @click="$emit('quote', 'Emergency HVAC repair')"><SiteIcon name="clock" />24/7 emergency service<SiteIcon class="footer-small-arrow" /></button>
          </div>
          <div class="footer-updates footer-contact-details">
            <h2>Contact our Philadelphia team</h2>
            <a :href="business.phoneHref">{{ business.phone }}</a>
            <a :href="business.emailHref">{{ business.email }}</a>
            <a :href="business.mapHref">{{ business.address }}</a>
            <p>Serving Philadelphia and Delaware, Montgomery, Bucks, and Chester counties.</p>
          </div>
        </div>
        <div class="footer-end">
          <p>&#169;&#65038; {{ new Date().getFullYear() }} {{ business.company }}. All rights reserved.</p>
          <span class="footer-end-note">Licensed &amp; insured in Pennsylvania.</span>
          <a href="#home">Back to top<SiteIcon name="left" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.comfort-footer { position: relative; isolation: isolate; display: block; border: 0; padding: 0; overflow: hidden; background: var(--contact-footer-background); color: #fff; }
.footer-panel { position: relative; isolation: isolate; padding: 64px 0 0; border-top: 1px solid color-mix(in srgb, var(--surface-muted) 20.0%, transparent); }
.footer-airflow { position: absolute; z-index: -1; pointer-events: none; width: 680px; right: -210px; top: -80px; color: var(--surface-muted); opacity: .06; transform: rotate(-15deg); }
.footer-airflow svg { width: 100%; height: auto; stroke-width: .35; }
.footer-intro-row { display: grid; grid-template-columns: 1.5fr 1fr; align-items: end; gap: 80px; padding-bottom: 54px; }
.footer-identity .brand { --legacy-logo-width: 240px; max-width: 100%; min-width: 0; display: inline-flex; gap: 12px; align-items: center; font-size: 22px; line-height: 1.25; color: #fff; }
.footer-identity > p { font-size: 17px; line-height: 1.6; margin-top: 20px; color: var(--surface-muted); }
.footer-local { display: flex; align-items: center; gap: 8px; font-size: 14px; margin-top: 23px; color: var(--surface-muted); }
.footer-local svg { width: 18px; height: 18px; }
.footer-statement > p { font-size: clamp(52px, 6.3vw, 88px); line-height: 1.04; letter-spacing: -3px; font-weight: 500; }
.footer-eyebrow { display: block; font-size: 14px; letter-spacing: 1.8px; color: var(--surface-muted); margin-bottom: 22px; }
.footer-invitation { justify-self: end; padding-bottom: 4px; }
.footer-invitation > svg { width: 32px; height: 32px; color: var(--surface-muted); margin-bottom: 18px; }
.footer-invitation > p { color: var(--surface-muted); font-size: 17px; line-height: 1.6; }
.footer-statement > p span { color: var(--surface-muted); }
.footer-talk { display: inline-flex; align-items: center; gap: 18px; min-height: 44px; margin-top: 22px; font-size: 16px; }
.footer-talk > span { display: grid; place-items: center; height: 46px; width: 46px; border: 1px solid color-mix(in srgb, var(--surface-muted) 50.2%, transparent); border-radius: var(--radius-control); transition: background .2s, transform .2s; }
.footer-talk svg { width: 21px; height: 21px; }
.footer-talk:hover > span { background: #ffffff20; transform: translateX(3px); }
.footer-details { display: grid; grid-template-columns: 1fr .6fr 1fr 1.15fr; gap: 32px; padding-block: 46px 48px; border-top: 1px solid color-mix(in srgb, var(--surface-muted) 20.0%, transparent); }
.footer-details > * { min-width: 0; }
.footer-identity .brand img { flex-shrink: 0; }
.footer-contact-details a { display: flex; align-items: center; min-height: 44px; font-size: 14px; line-height: 1.6; color: var(--surface-muted); overflow-wrap: anywhere; }
.footer-contact-details a:hover { color: #fff; text-decoration: underline; }
.footer-contact-details > p { margin-top: 16px; }
.footer-details h2 { margin: 0 0 16px; font-size: 16px; font-weight: 500; letter-spacing: 0; color: #fff; }
.footer-navigation { display: flex; flex-direction: column; align-items: flex-start; }
.footer-navigation button { background: none; border: 0; padding: 0; text-align: left; cursor: pointer; }
.footer-navigation button:focus-visible { outline: 2px solid var(--surface-muted); outline-offset: 3px; }
.footer-navigation a, .footer-navigation button { display: flex; align-items: center; min-width: 44px; min-height: 44px; font-size: 14px; color: var(--surface-muted); }
.footer-support button { display: flex; align-items: center; width: 100%; gap: 10px; text-align: left; background: none; padding: 10px 0; min-height: 44px; font-size: 14px; color: var(--surface-muted); }
.footer-support svg { width: 21px; height: 21px; flex-shrink: 0; color: var(--surface-muted); }
.footer-support .footer-small-arrow { width: 16px; height: 16px; margin-left: auto; }
.footer-updates > p { font-size: 14px; line-height: 1.6; color: var(--surface-muted); max-width: 300px; margin-bottom: 20px; }
.footer-updates form { display: flex; gap: 4px; padding: 5px; border: 1px solid #ffffff65; background: var(--surface-muted); border-radius: var(--radius-control); }
.footer-updates input { min-width: 0; width: 100%; border: none; background: transparent; color: var(--brand-dark); padding: 10px; font: inherit; font-size: 14px; }
.footer-updates input::placeholder { color: var(--brand-primary); opacity: 1; }
.footer-updates form button { display: flex; align-items: center; gap: 8px; padding: 12px 16px; min-height: 44px; background: var(--brand-primary); color: #fff; border-radius: var(--radius-control); font: inherit; font-size: 14px; transition: background .2s; }
.footer-updates form button:hover { background: var(--brand-hover); }
.footer-updates form svg { width: 18px; height: 18px; }
.footer-updates .footer-notice { margin: 12px 0 0; font-size: 14px; }
.footer-end { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-block: 20px; border-top: 1px solid color-mix(in srgb, var(--surface-muted) 20.0%, transparent); font-size: 14px; color: var(--surface-muted); }
.footer-end a { display: flex; align-items: center; gap: 12px; min-height: 44px; }
.footer-end svg { width: 18px; height: 18px; transform: rotate(90deg); }
.footer-navigation a:hover, .footer-support button:hover, .footer-end a:hover { color: #fff; text-decoration: underline; text-underline-offset: 5px; }
.comfort-footer :is(a, button, input):focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
.footer-updates input:focus-visible { outline-color: var(--brand-primary); outline-offset: 0; border-radius: var(--radius-control); }
@media (max-width: 1050px) {
  .footer-panel { padding-top: 48px; }
  .footer-details { gap: 36px; grid-template-columns: 1fr 1fr; }
  .footer-end-note { display: none; }
}
@media (max-width: 760px) {
  .comfort-footer { padding-top: 0; }
  .footer-panel { padding: 40px 0 0; }
  .footer-intro-row { grid-template-columns: 1fr; gap: 28px; padding-bottom: 36px; }
  .footer-invitation { justify-self: start; }
  .footer-invitation > svg { display: none; }
  .footer-eyebrow { font-size: 14px; letter-spacing: 1.2px; }
  .footer-identity { grid-column: 1 / -1; }
  .footer-identity > p br { display: none; }
  .footer-local { margin-top: 12px; }
  .footer-statement > p { font-size: clamp(46px, 9vw, 64px); letter-spacing: -2px; }
  .footer-details { grid-template-columns: .7fr 1.3fr; gap: 30px 20px; padding-block: 28px; }
  .footer-updates { grid-column: 1 / -1; }
  .footer-updates > p { max-width: none; }
  .footer-navigation button { background: none; border: 0; padding: 0; text-align: left; cursor: pointer; }
.footer-navigation button:focus-visible { outline: 2px solid var(--surface-muted); outline-offset: 3px; }
.footer-navigation a, .footer-navigation button { min-height: 44px; }
  .footer-updates input { font-size: 16px; }
  .footer-end { align-items: flex-start; flex-direction: column; gap: 6px; }
}
@media (max-width: 390px) {
  .footer-details { grid-template-columns: 1fr; }
  .footer-statement > p { font-size: 43px; }
}
@media (prefers-reduced-motion: reduce) {
  .footer-talk > span, .footer-updates form button { transition: none; }
}

@media (max-width: 760px) {
  .footer-panel { padding-top: 36px; }
  .footer-intro-row { padding-bottom: 32px; gap: 0; }
  .footer-statement > p { font-size: clamp(38px, 9vw, 60px); }
  .footer-eyebrow { font-size: 14px; line-height: 1.5; letter-spacing: .5px; }
  .footer-invitation { display: none; }
  .footer-airflow { display: none; }
  .footer-details { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 28px 16px; }
  .footer-details > * { min-width: 0; }
  .footer-support .footer-small-arrow { display: none; }
  .footer-support button { align-items: flex-start; line-height: 1.5; }
  .footer-support button > svg { margin-top: 2px; }
  .footer-updates form button { padding-inline: 12px; }
  .footer-end { font-size: 14px; line-height: 1.5; }
}
@media (max-width: 350px) {
  .footer-details { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .footer-end { align-items: center; text-align: center; }
  .footer-end a { justify-content: center; }
}
</style>
