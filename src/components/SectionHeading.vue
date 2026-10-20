<script setup>
defineProps({ label: String, title: String, centered: Boolean });
</script>

<template>
  <div class="section-title" :class="{ 'is-centered': centered }">
    <span class="section-tag"><span aria-hidden="true"></span>{{ label }}</span>
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>
