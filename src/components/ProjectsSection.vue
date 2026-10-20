<script setup>
import { ref } from "vue";
import SectionHeading from "./SectionHeading.vue";
import SiteIcon from "./SiteIcon.vue";
const lightbox = ref(null);
const selected = ref(0);
const projects = [
  {
    image: "/images/hvac-service-photo.png",
    title: "Cool Comfort, Beautifully Installed",
    category: "AC Installation",
    text: "Thoughtful equipment placement and a carefully commissioned cooling system for a comfortable family home.",
  },
  {
    image: "/images/hvac-indoor-photo.png",
    title: "Ready for Every Season",
    category: "Heating & Ventilation",
    text: "A carefully inspected heating and ventilation system, prepared for reliable everyday comfort.",
  },
  {
    image: "/images/hvac-service-photo.png",
    title: "A Fresh Start for Home Comfort",
    category: "Preventive Maintenance",
    text: "Professional attention to the components that keep a home cooling efficiently.",
  },
  {
    image: "/images/hvac-indoor-photo.png",
    title: "Better Air, Better Living",
    category: "Indoor Air Quality",
    text: "Clean connections, careful checks, and a better approach to air moving through the home.",
  },
];
function showProject(index) {
  selected.value = index;
  lightbox.value.showModal();
}
function step(direction) {
  selected.value =
    (selected.value + direction + projects.length) % projects.length;
}
</script>

<template>
  <section id="gallery" class="projects-section page-section">
    <div class="page-container">
      <div class="section-topline">
        <SectionHeading
          label="Featured Work"
          title="Our Recent Projects"
        /><button class="button button-blue" @click="showProject(0)">
          View All<SiteIcon />
        </button>
      </div>
      <div class="project-mosaic">
        <button
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-photo"
          :class="`project-photo-${index + 1}`"
          @click="showProject(index)"
        >
          <img
            :src="project.image"
            :alt="project.title"
            :class="{ 'alternate-crop': index > 1 }"
            width="900"
            height="700"
            loading="lazy"
          /><span class="project-photo-caption"
            ><span
              ><small>{{ project.category }}</small
              ><strong>{{ project.title }}</strong></span
            ><span class="round-arrow"><SiteIcon /></span
          ></span>
        </button>
        <div class="project-text-card">
          <SiteIcon name="shield" />
          <div>
            <h3>Every Project,<br />Done Right.</h3>
            <p>
              From a quick repair to a complete system installation, our work
              reflects the same attention to detail, respect for your home, and
              care for your comfort.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <dialog
    ref="lightbox"
    data-lenis-prevent
    class="project-lightbox"
    aria-label="Project gallery"
    @click="
      (event) => {
        if (event.target === lightbox) lightbox.close();
      }
    "
    @keydown.left="step(-1)"
    @keydown.right="step(1)"
  >
    <button
      class="lightbox-close"
      aria-label="Close project gallery"
      @click="lightbox.close()"
    >
      <SiteIcon name="close" /></button
    ><img :src="projects[selected].image" :alt="projects[selected].title" />
    <div class="lightbox-bottom">
      <div>
        <span class="eyebrow">{{ projects[selected].category }}</span>
        <h2>{{ projects[selected].title }}</h2>
        <p>{{ projects[selected].text }}</p>
      </div>
      <div class="carousel-buttons">
        <button aria-label="Previous project" @click="step(-1)">
          <SiteIcon name="left" /></button
        ><button aria-label="Next project" @click="step(1)">
          <SiteIcon />
        </button>
      </div>
    </div>
  </dialog>
</template>
