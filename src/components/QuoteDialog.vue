<script setup>
import { ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
import { useLockScroll } from "../composables/useLockScroll.ts";
const { lock, unlock } = useLockScroll();
const dialog = ref(null);
const email = ref("");
const name = ref("");
const service = ref("Air conditioning");
const saved = ref(false);
function open(prefill = "", requestedService = "") {
  email.value = prefill;
  const category = requestedService.toLowerCase();
  service.value = category.includes("emergency")
    ? "Emergency repair"
    : category.includes("quality")
      ? "Indoor air quality"
      : category.includes("heat")
        ? "Heating"
        : "Air conditioning";
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
      `CLIMARO — SERVICE REQUEST\n\nName: ${request.name}\nEmail: ${request.email}\nService: ${request.service}\nCreated: ${request.createdAt}\n\nThis is a saved request draft. It has not been sent.\n`,
    ],
    { type: "text/plain;charset=utf-8" },
  );
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "climaro-service-request.txt";
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
    <span class="eyebrow">LET'S GET COMFORTABLE.</span>
    <h2 id="quote-title">How can we help?</h2>
    <p>Start with a few details for your service request.</p>
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
        <option>Air conditioning</option>
        <option>Heating</option>
        <option>Indoor air quality</option>
        <option>Emergency repair</option></select
      ><button class="button button-blue" type="submit">
        Download request
      </button>
      <p class="form-note">
        Download a copy of your details. This demo does not send requests.
      </p>
    </form>
    <div v-else class="quote-success" role="status">
      <h3>Your request is ready.</h3>
      <p>
        Your details have been downloaded to your device. No request has been
        sent.
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
@media (max-width: 540px) {
  .quote-dialog { width: calc(100% - 32px); padding: 52px 22px 26px; }
  .quote-dialog h2 { font-size: 30px; }
  .quote-form :is(input, select) { font-size: 16px; min-height: 48px; }
}
</style>
