<script setup>
defineProps({ name: { type: String, default: "arrow" } });
</script>

<template>
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <g v-if="name === 'home'">
      <path d="m3 14 13-11 13 11M6 12v16h20V12M12 28v-9h8v9" />
      <path d="M13 12h6" />
    </g>
    <g v-else-if="name === 'conversation'">
      <path d="M6 5h20a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H14l-8 5v-5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
      <path d="M9 12h14M9 17h9" />
    </g>
    <g v-else-if="name === 'snow'">
      <path
        d="M16 3v26M5 9l22 14M5 23 27 9M11 6l5 5 5-5M11 26l5-5 5 5M5 15l6-2-2-6M27 17l-6 2 2 6M5 17l6 2-2 6M27 15l-6-2 2-6"
      />
    </g>
    <g v-else-if="name === 'heat'">
      <path
        d="M19 3c1 7-7 7-4 13 1-3 4-3 4-7 7 6 9 10 7 15-2 5-6 6-10 6S6 27 6 21c0-6 6-9 7-14 0 5 3 7 3 7"
      />
    </g>
    <g v-else-if="name === 'air'">
      <path
        d="M3 11h17c7 0 7-8 2-8-3 0-4 2-4 4M3 17h22c7 0 7 10 1 10-3 0-4-2-4-4M3 23h9c6 0 6 7 1 7"
      />
    </g>
    <g v-else-if="name === 'shield'">
      <path d="m16 3 11 4v9c0 7-6 11-11 13C11 27 5 23 5 16V7l11-4Z" />
      <path d="m10 16 4 4 8-9" />
    </g>
    <g v-else-if="name === 'clock'">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 8v9l6 3" />
    </g>
    <g v-else-if="name === 'price'">
      <path d="M18 4H5v13l12 12 12-12L18 4Z" />
      <circle cx="11" cy="10" r="2" />
    </g>
    <g v-else-if="name === 'tool'">
      <path
        d="M21 4a8 8 0 0 0-9 11L4 23a4 4 0 0 0 5 5l9-9a8 8 0 0 0 10-10l-6 6-5-5 6-6Z"
      />
    </g>
    <g v-else-if="name === 'phone'">
      <path
        d="m10 4 4 7-4 4c2 4 4 6 8 8l4-4 6 4c0 4-3 6-6 5C11 26 5 20 3 10 2 7 5 4 10 4Z"
      />
    </g>
    <g v-else-if="name === 'mail'">
      <rect x="3" y="6" width="26" height="20" rx="4" />
      <path d="m4 8 12 10L28 8" />
    </g>
    <g v-else-if="name === 'pin'">
      <path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z" />
      <circle cx="16" cy="13" r="3" />
    </g>
    <g v-else-if="name === 'star'" fill="currentColor" stroke="none">
      <path d="m16 2 4 9 10 1-8 7 2 11-8-6-9 6 2-11-7-7 10-1 4-9Z" />
    </g>
    <path v-else-if="name === 'check'" d="m7 16 6 6L26 9" />
    <path v-else-if="name === 'plus'" d="M16 6v20M6 16h20" />
    <path v-else-if="name === 'left'" d="M26 16H6m8-8-8 8 8 8" />
    <path v-else-if="name === 'close'" d="m8 8 16 16M8 24 24 8" />
    <path v-else d="M6 16h20m-8-8 8 8-8 8" />
  </svg>
</template>
