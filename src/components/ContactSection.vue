<script setup>
import { reactive, ref } from "vue";
import CustomSelect from "./CustomSelect.vue";
import SiteIcon from "./SiteIcon.vue";
import { business, serviceOptions } from "../siteContent.js";

const form = reactive({ name: "", email: "", phone: "", postcode: "", service: "", message: "" });
const serviceSelect = ref(null);
const serviceError = ref(false);
const saved = ref(false);
const error = ref("");
const options = serviceOptions;
function serviceChanged() { serviceError.value = false; saved.value = false; error.value = ""; }
function saveRequest() {
  saved.value = false;
  error.value = "";
  if (!form.service) {
    serviceError.value = true;
    serviceSelect.value.focus();
    return;
  }
  let url;
  let link;
  try {
    const text = [
      `${business.name.toUpperCase()} - CONTACT REQUEST`, business.company, "",
      `Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || 'Not provided'}`, `ZIP / postal code: ${form.postcode.trim() || 'Not provided'}`,
      `Service: ${form.service}`, "", "Message:", form.message.trim(), "",
      `Created: ${new Date().toISOString()}`, "",
      `This is a request draft. Email it to ${business.email} or call ${business.phone} to arrange service.`,
    ].join("\n");
    url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    link = document.createElement("a");
    link.href = url;
    link.download = "philly-hvac-pros-contact-request.txt";
    document.body.appendChild(link);
    link.click();
    saved.value = true;
  } catch {
    error.value = "Your request could not be downloaded. Your details are still here; please try again.";
  } finally {
    link?.remove();
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
</script>

<template>
  <section id="contact" class="contact-section page-section" aria-labelledby="contact-title">
    <div class="contact-container">
      <div class="contact-intro">
        <span class="section-tag"><span aria-hidden="true"></span>Contact Philly HVAC Pros</span>
        <h2 id="contact-title">Need HVAC<br /><span> service?</span></h2>
        <p class="contact-intro-copy">Call for 24/7 emergency heating and cooling help, or contact Superior Comfort Heating &amp; Cooling LLC for a free estimate.</p>
        <div class="contact-promises">
          <div><SiteIcon name="phone" /><p><strong><a :href="business.phoneHref">{{ business.phone }}</a></strong>24/7 emergency service. Call for same-day availability.</p></div>
          <div><SiteIcon name="mail" /><p><strong>Email our team</strong><a :href="business.emailHref">{{ business.email }}</a></p></div>
          <div><SiteIcon name="pin" /><p><strong>Based in Philadelphia</strong><a :href="business.mapHref">{{ business.address }}</a></p></div>
        </div>
        <div class="contact-signoff"><img src="/favicon.svg" alt="" width="38" height="38" /><span>Homeowners. Landlords. Businesses.<br /><strong>Philadelphia &amp; the surrounding counties.</strong></span></div>
      </div>

      <div class="contact-form-panel">
        <header class="contact-form-heading"><span><SiteIcon name="mail" /></span><div><h3>Prepare a service request</h3><p>Save your details to share with our team.</p></div></header>
        <form class="contact-form" @submit.prevent="saveRequest" @input="saved = false; error = ''">
          <div class="contact-field"><label for="contact-name">Full name <span>*</span></label><input id="contact-name" v-model.trim="form.name" name="name" autocomplete="name" placeholder="Your full name" required maxlength="120" /></div>
          <div class="contact-field"><label for="contact-email">Email address <span>*</span></label><input id="contact-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="254" /></div>
          <div class="contact-field"><label for="contact-phone">Phone number <small>Optional</small></label><input id="contact-phone" v-model.trim="form.phone" name="phone" type="tel" autocomplete="tel" placeholder="Your phone number" maxlength="40" /></div>
          <div class="contact-field"><label for="contact-postcode">ZIP code <small>Optional</small></label><input id="contact-postcode" v-model.trim="form.postcode" name="postal-code" autocomplete="postal-code" placeholder="Philadelphia-area ZIP code" maxlength="20" /></div>
          <div class="contact-field contact-field-wide">
            <label id="contact-service-label" for="contact-service">What can we help with? <span>*</span></label>
            <CustomSelect id="contact-service" ref="serviceSelect" v-model="form.service" :options="options" labelledby="contact-service-label"
              required :invalid="serviceError" :describedby="serviceError ? 'contact-service-error' : undefined" @update:model-value="serviceChanged" />
            <p v-if="serviceError" id="contact-service-error" class="contact-error" role="alert">Please choose a service.</p>
          </div>
          <div class="contact-field contact-field-wide"><label for="contact-message">Tell us a little more <span>*</span></label><textarea id="contact-message" v-model.trim="form.message" name="message" rows="4" placeholder="What's happening with your system, or what would you like help with?" required maxlength="4000"></textarea></div>
          <div class="contact-form-bottom contact-field-wide">
            <button class="button button-blue contact-submit" type="submit">Download My Request<SiteIcon /></button>
            <p class="contact-form-note">This saves a draft. Email it to <a :href="business.emailHref">{{ business.email }}</a> or call <a :href="business.phoneHref">{{ business.phone }}</a> to arrange service.</p>
          </div>
          <p v-if="saved" class="contact-feedback contact-field-wide" role="status"><SiteIcon name="check" /><span>Your draft has been downloaded. Email it to {{ business.email }} or call {{ business.phone }} to arrange service.</span></p>
          <p v-if="error" class="contact-error contact-field-wide" role="alert">{{ error }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section.page-section { border-radius: 0; padding-block: 96px 80px; background: var(--contact-footer-background); color: var(--surface-muted); }
.contact-container { width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; display: grid; grid-template-columns: .85fr 1.15fr; gap: 72px; align-items: center; }
.contact-intro { padding: 12px 0; }
.contact-intro .section-tag { color: var(--surface-muted); border-color: color-mix(in srgb, var(--surface-muted) 33.3%, transparent); background: #ffffff0d; }
.contact-intro .section-tag > span { background: var(--surface-muted); box-shadow: none; }
.contact-intro h2 { margin-top: 26px; color: #fff; font-size: clamp(52px, 5vw, 76px); font-weight: 500; line-height: 1.04; letter-spacing: -2.8px; }
.contact-intro h2 span { color: var(--surface-muted); }
.contact-intro-copy { max-width: 440px; margin-top: 25px; color: var(--surface-muted); font-size: 18px; line-height: 1.65; }
.contact-promises { display: grid; gap: 24px; margin-top: 38px; }
.contact-promises > div { display: flex; align-items: flex-start; gap: 15px; }
.contact-promises svg { width: 27px; height: 27px; flex-shrink: 0; color: var(--surface-muted); margin-top: 2px; }
.contact-promises p { max-width: 350px; font-size: 15px; color: var(--surface-muted); line-height: 1.6; }
.contact-promises a { display: inline-flex; align-items: center; min-height: 44px; overflow-wrap: anywhere; max-width: 100%; }
.contact-promises p { min-width: 0; }
.contact-promises a:hover, .contact-form-note a:hover { text-decoration: underline; }
.contact-form-note a { display: inline-flex; align-items: center; min-height: 44px; overflow-wrap: anywhere; max-width: 100%; }
.contact-promises strong { display: block; font-size: 17px; font-weight: 500; color: #fff; margin-bottom: 3px; }
.contact-signoff { display: flex; align-items: center; gap: 14px; padding-top: 28px; margin-top: 32px; border-top: 1px solid color-mix(in srgb, var(--surface-muted) 20.0%, transparent); max-width: 400px; }
.contact-signoff span { color: var(--surface-muted); font-size: 14px; line-height: 1.5; }
.contact-signoff strong { color: var(--surface-muted); font-weight: 500; }
.contact-form-panel { padding: clamp(25px, 3vw, 44px); background: var(--brand-secondary); color: #fff; border: 1px solid var(--brand-secondary); border-radius: var(--radius-panel); box-shadow: none; min-width: 0; }
.contact-form-heading { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; }
.contact-form-heading > span { display: grid; place-items: center; width: 52px; height: 52px; flex-shrink: 0; border-radius: var(--radius-control); background: var(--surface-muted); color: var(--brand-primary); }
.contact-form-heading svg { width: 27px; height: 27px; }
.contact-form-heading h3 { color: #fff; font-size: 28px; font-weight: 500; letter-spacing: -.7px; margin-bottom: 6px; }
.contact-form-heading p { color: #fff; font-size: 15px; }
.contact-form { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 20px; }
.contact-field { display: flex; flex-direction: column; gap: 9px; min-width: 0; }
.contact-field-wide { grid-column: 1 / -1; }
.contact-field label { color: #fff; font-size: 14px; font-weight: 500; line-height: 1.4; }
.contact-field label > span { color: #fff; }
.contact-field small { margin-left: 5px; color: #fff; font-size: 14px; font-weight: 500; }
.contact-field input, .contact-field textarea { width: 100%; min-width: 0; min-height: 54px; padding: 13px 15px; border: 1px solid var(--surface-muted); border-radius: var(--radius-control); background: var(--surface-muted); color: var(--brand-dark); font: inherit; font-size: 15px; line-height: 1.5; }
.contact-field textarea { resize: vertical; min-height: 125px; }
.contact-field input::placeholder, .contact-field textarea::placeholder { color: var(--brand-primary); opacity: 1; }
.contact-field input:focus, .contact-field textarea:focus { outline: 3px solid color-mix(in srgb, var(--brand-primary) 26.7%, transparent); outline-offset: 2px; border-color: var(--brand-primary); background: #fff; }
.contact-form-bottom { padding-top: 2px; }
.contact-submit { width: 100%; justify-content: space-between; min-height: 53px; }
.contact-form-note { color: #fff; font-size: 14px; line-height: 1.5; margin-top: 12px; text-align: center; }
.contact-error { color: #fff; font-size: 14px; line-height: 1.5; margin: 0; }
.contact-feedback { display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: var(--radius-control); background: var(--surface-muted); color: var(--brand-primary); font-size: 14px; line-height: 1.5; }
.contact-feedback svg { width: 21px; height: 21px; flex-shrink: 0; }
@media (max-width: 1100px) {
  .contact-container { gap: 36px; grid-template-columns: .8fr 1.2fr; }
  .contact-form { gap: 20px 14px; }
  .contact-intro h2 { font-size: 58px; }
  .contact-intro-copy { font-size: 16px; }
}
@media (max-width: 850px) {
  .contact-section.page-section { padding-block: 64px; }
  .contact-container { width: calc(100% - 40px); grid-template-columns: 1fr; gap: 32px; }
  .contact-intro h2 { font-size: 52px; }
  .contact-intro-copy { max-width: 620px; }
  .contact-promises { grid-template-columns: 1fr 1fr; gap: 22px; }
  .contact-signoff { display: none; }
}
@media (max-width: 540px) {
  .contact-intro h2 { font-size: 46px; letter-spacing: -1.8px; }
  .contact-promises { grid-template-columns: 1fr; margin-top: 28px; }
  .contact-form-panel { padding: 24px 18px; border-radius: var(--radius-panel); }
  .contact-form { grid-template-columns: 1fr; }
  .contact-form-heading h3 { font-size: 25px; }
  .contact-field input, .contact-field textarea { font-size: 16px; }
}

@media (max-width: 850px) {
  .contact-section.page-section { padding-block: 56px; }
  .contact-intro { padding: 0; }
  .contact-intro h2 { font-size: clamp(42px, 8vw, 60px); }
  .contact-intro h2 br { display: none; }
  .contact-intro-copy { margin-top: 20px; font-size: 16px; }
  .contact-promises { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 24px; }
  .contact-form-panel { padding: 26px 20px; }
  .contact-form-heading { gap: 12px; margin-bottom: 24px; }
  .contact-form-heading > span { width: 44px; height: 44px; border-radius: var(--radius-control); }
  .contact-field label { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px; }
  .contact-field small { margin-left: auto; }
  .contact-field :is(input, textarea) { font-size: 16px; }
  .contact-form-note { font-size: 14px; text-align: left; }
}

</style>
