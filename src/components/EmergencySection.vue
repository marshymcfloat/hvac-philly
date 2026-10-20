<script setup>
import SiteIcon from "./SiteIcon.vue";
defineEmits(["quote"]);
</script>

<template>
  <section class="emergency-section page-section">
    <div class="page-container emergency-banner">
      <div class="emergency-copy">
        <span class="section-tag"
          ><span aria-hidden="true"></span>24/7 Emergency Service</span
        >
        <h2>Comfort Can’t Wait.<br />Neither Should You.</h2>
        <p>
          When your heating or cooling lets you down, our team is ready to help
          you take the next step toward a comfortable home.
        </p>
        <div class="emergency-actions">
          <button
            class="button button-white"
            @click="$emit('quote', 'Emergency repair')"
          >
            <SiteIcon name="phone" />Get Urgent Help</button
          ><button class="button button-glass" @click="$emit('quote')">
            Book Service<SiteIcon />
          </button>
        </div>
      </div>
      <img
        src="/images/hvac-technician-wide.png"
        alt="HVAC expert ready to help with heating and cooling"
        width="1536"
        height="1024"
        loading="lazy"
      />
    </div>
  </section>
</template>
