<script setup>
import SectionHeading from "./SectionHeading.vue";
const team = [
  {
    name: "John Anderson",
    role: "HVAC Service Technician",
    experience: "10 yrs exp",
    image: "/images/reference/team-1.png",
  },
  {
    name: "Marcus Reynolds",
    role: "Lead Comfort Specialist",
    experience: "8 yrs exp",
    image: "/images/reference/team-2.png",
  },
  {
    name: "Chris Alvarez",
    role: "Emergency Response Technician",
    experience: "6 yrs exp",
    image: "/images/reference/team-3.png",
  },
  {
    name: "Brandon Hayes",
    role: "Installation Expert",
    experience: "6 yrs exp",
    image: "/images/reference/team-4.png",
  },
  {
    name: "Marvin McKinney",
    role: "Heating & Cooling Specialist",
    experience: "10 yrs exp",
    image: "/images/reference/team-5.png",
  },
  {
    name: "Ronald Richards",
    role: "Maintenance Technician",
    experience: "4 yrs exp",
    image: "/images/reference/mission.png",
  },
];
</script>

<template>
  <section id="team" class="team-section page-section">
    <div class="page-container">
      <SectionHeading
        label="Meet the Team"
        title="The Experts Behind Every Fix"
        centered
      />
      <div class="team-grid">
        <article v-for="person in team" :key="person.name" class="team-card">
          <div class="team-photo">
            <img
              :src="person.image"
              :alt="person.name"
              width="768"
              height="940"
              loading="lazy"
            /><span>{{ person.experience }}</span>
          </div>
          <div class="team-details">
            <h3>{{ person.name }}</h3>
            <p>{{ person.role }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
