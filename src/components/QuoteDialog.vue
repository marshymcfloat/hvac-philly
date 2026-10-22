<script setup>
import { ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
import { useLockScroll } from "../composables/useLockScroll.ts";
import { business, serviceOptions } from "../siteContent.js";
const { lock, unlock } = useLockScroll();
const dialog = ref(null);
const email = ref("");
const name = ref("");
const service = ref(serviceOptions[0].value);
const saved = ref(false);
function open(prefill = "", requestedService = "") {
  email.value = prefill;
  service.value = serviceOptions.find((option) => option.value === requestedService)?.value || serviceOptions[0].value;
  saved.value = false;
  dialog.value.showModal();
  lock();
}
function saveRequest() {
  const request = {
    name: name.value,
    email: email.value,
    service: service.value,
    createdAt: new Date().toISOString(),
  };
  const file = new Blob(
    [
      `${business.name.toUpperCase()} - SERVICE REQUEST\n${business.company}\n\nName: ${request.name}\nEmail: ${request.email}\nService: ${request.service}\nCreated: ${request.createdAt}\n\nEmail this draft to ${business.email} or call ${business.phone} to arrange service.\n`,
    ],
    { type: "text/plain;charset=utf-8" },
  );
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "philly-hvac-pros-service-request.txt";
  link.click();
  URL.revokeObjectURL(link.href);
  saved.value = true;
}
defineExpose({ open });
</script>

<template>
  <Teleport to="body">
  <dialog
    ref="dialog"
    @close="unlock"
    data-lenis-prevent
    class="quote-dialog"
    aria-labelledby="quote-title"
    @click="
      (event) => {
        if (event.target === dialog) dialog.close();
      }
    "
  >
    <button
      class="dialog-close"
      aria-label="Close quote form"
      @click="dialog.close()"
    >
      <SiteIcon name="close" />
    </button>
    <span class="eyebrow">PHILLY HVAC PROS</span>
    <h2 id="quote-title">Request a free estimate</h2>
    <p>Call <a :href="business.phoneHref">{{ business.phone }}</a> or prepare a service request below.</p>
    <form v-if="!saved" class="quote-form" @submit.prevent="saveRequest">
      <label for="quote-name">Your name</label
      ><input
        id="quote-name"
        v-model="name"
        autocomplete="name"
        required
        placeholder="Full name"
      /><label for="quote-email">Email address</label
      ><input
        id="quote-email"
        v-model="email"
        type="email"
        autocomplete="email"
        required
        placeholder="you@example.com"
      /><label for="quote-service">What do you need?</label
      ><select id="quote-service" v-model="service">
        <option v-for="option in serviceOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select
      ><button class="button button-blue" type="submit">
        Download request
      </button>
      <p class="form-note">
        This saves a draft. Email it to <a :href="business.emailHref">{{ business.email }}</a> to arrange service. For emergencies, call directly.
      </p>
    </form>
    <div v-else class="quote-success" role="status">
      <h3>Your service draft is ready.</h3>
      <p>
        Your details have been downloaded. Email the draft to
        <a :href="business.emailHref">{{ business.email }}</a> or call
        <a :href="business.phoneHref">{{ business.phone }}</a> to arrange service.
      </p>
      <button class="button button-blue" @click="dialog.close()">Done</button>
    </div>
  </dialog>
  </Teleport>
</template>

<style scoped>
.quote-dialog { z-index: 2147483647; max-height: calc(100dvh - 32px); overflow-y: auto; overscroll-behavior: contain; }
.dialog-close { min-width: 44px; min-height: 44px; display: grid; place-items: center; }
.dialog-close svg { width: 24px; height: 24px; }
.quote-dialog a { display: inline-flex; align-items: center; min-height: 44px; max-width: 100%; overflow-wrap: anywhere; color: var(--brand-primary); text-decoration: underline; }
@media (max-width: 540px) {
  .quote-dialog { width: calc(100% - 32px); padding: 52px 22px 26px; }
  .quote-dialog h2 { font-size: 30px; }
  .quote-form :is(input, select) { font-size: 16px; min-height: 48px; }
}
</style>
