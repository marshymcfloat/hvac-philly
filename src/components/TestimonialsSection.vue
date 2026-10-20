<script setup>
import { computed, ref } from "vue";
import SectionHeading from "./SectionHeading.vue";
import SiteIcon from "./SiteIcon.vue";
const active = ref(0);
const reviews = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    quote:
      "Quick, professional, and explained everything clearly. Our AC was cooling again the same afternoon. A really reassuring experience.",
    image: "/images/customer-1.jpg",
  },
  {
    name: "David Kim",
    role: "Property Manager",
    quote:
      "A dependable team for our properties. They arrive prepared, communicate clearly, and help us stay ahead of maintenance.",
    image: "/images/customer-2.jpg",
  },
  {
    name: "Emily Tran",
    role: "Homeowner",
    quote:
      "They took the time to explain our heating options without any pressure. The house feels more comfortable than ever.",
    image: "/images/customer-3.jpg",
  },
];
const current = computed(() => reviews[active.value]);
const smallReviews = [
  {
    name: "Sophia Bennett",
    role: "Homeowner",
    image: "/images/customer-1.jpg",
    quote:
      "Our cooling stopped on a hot evening. The team was calm, helpful, and got us comfortable again.",
  },
  {
    name: "Emily Tran",
    role: "Homeowner",
    image: "/images/customer-3.jpg",
    quote:
      "Friendly service and a really tidy installation. They explained the new system and made the whole process easy.",
  },
  {
    name: "David Kim",
    role: "Property Manager",
    image: "/images/customer-2.jpg",
    quote:
      "We appreciate the honest advice and consistent care. A team we can rely on for routine maintenance.",
  },
  {
    name: "Samantha Lee",
    role: "Small Business Owner",
    image: "/images/customer-1.jpg",
    quote:
      "A clear quote, good communication, and careful work. Our shop is comfortable again and running smoothly.",
  },
];
function change(direction) {
  active.value = (active.value + direction + reviews.length) % reviews.length;
}
</script>

<template>
  <section id="testimonials" class="testimonials-section page-section">
    <div class="page-container">
      <SectionHeading
        label="Testimonials"
        title="What Our Customers Are Saying"
        centered
      />
      <div class="featured-review">
        <div class="featured-review-image">
          <img
            src="/images/reference/customer-feature.png"
            alt="A happy homeowner"
            width="640"
            height="960"
            loading="lazy"
          />
        </div>
        <div class="featured-review-content" aria-live="polite">
          <span class="review-stars" aria-label="5 out of 5 stars"
            ><SiteIcon v-for="star in 5" :key="star" name="star"
          /></span>
          <blockquote>“{{ current.quote }}”</blockquote>
          <div class="featured-review-bottom">
            <div class="review-author">
              <img :src="current.image" alt="" width="48" height="48" />
              <div>
                <strong>{{ current.name }}</strong
                ><span>{{ current.role }}</span>
              </div>
            </div>
            <div class="carousel-buttons">
              <button aria-label="Previous testimonial" @click="change(-1)">
                <SiteIcon name="left" /></button
              ><button aria-label="Next testimonial" @click="change(1)">
                <SiteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="reviews-grid">
        <article
          v-for="review in smallReviews"
          :key="review.name"
          class="review-card"
        >
          <span class="review-stars" aria-label="5 out of 5 stars"
            ><SiteIcon v-for="star in 5" :key="star" name="star"
          /></span>
          <blockquote>“{{ review.quote }}”</blockquote>
          <div class="review-author">
            <img
              :src="review.image"
              alt=""
              width="42"
              height="42"
              loading="lazy"
            />
            <div>
              <strong>{{ review.name }}</strong
              ><span>{{ review.role }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
