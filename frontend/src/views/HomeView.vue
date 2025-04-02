<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
console.log(authStore.userInfo);
</script>

<template>
  <v-card class="home-card">
    <v-card-title>
      <h4 class="title">BEMED - Zero Waste</h4>
      <h1 class="headline">To change the way Montenegro tackles waste</h1>
    </v-card-title>
    <v-card-text class="home-content">
      <h3 class="intro">Our mission is to raise awareness and lobby to change laws
      and behaviours to stop littering and reduce waste production.
      </h3>
      <p>
        The methodologies we use involve alternatives to single-use products
        and packaging, reusing and recycling discarded materials at the source,
        and moving away from waste incineration and land-filling. <br>
        We are part of the global ecological transition, acting with respect for human rights
        and better consideration of the most disadvantaged and
        future generations.
        If you would like to read more about the Zero Waste movement, <br>
        go to <a href="https://zerowasteeurope.eu" target="_blank" rel="noopener noreferrer" 
        class="link">ZeroWasteEurope</a> and read more about this special journey.
      </p>
      <h3 class="contact-us">Contact us</h3>
    </v-card-text>
    <div class="contact-item">
    <v-icon color="primary" class="icon">mdi-map-marker</v-icon>
    <span class="span">We are located in Podgorica, Montenegro</span></div>

    <div class="contact-item"><v-icon color="primary" class="icon">mdi-instagram</v-icon>
    <span class="span">You can follow our progress on <a href="https://www.instagram.com/zero.waste.montenegro/" 
      target="_blank" rel="noopener noreferrer" class="link">Instagram</a> at @zero.waste.montenegro.</span></div>
    
    <div class="contact-item"><v-icon color="primary" class="icon">mdi-email</v-icon>
    <a href="mailto:info@zerowastemontenegro.me" class="link">info@zerowastemontenegro.me</a></div>

    <div class="contact-item"><v-icon color="primary" class="icon">mdi-phone</v-icon>
    <a href="tel:+38267627645" class="link">+382(0) 67627645</a></div>
  </v-card>
</template>

<style>

.home-card {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: scroll;
}

.title {
  padding-left: 10px;
  padding-top: 10px;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
  color: #2f5a9a; /* Primary blue */
}

.headline {
  padding-left: 10px;
  font-weight: bold;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
  color: #333;
}

.icon {
  padding-left: 35px;
  padding-right: 20px;
}

.intro {
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 20px;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
}

.contact-us {
  padding-left: 10px;
  padding-top: 10px;
  font-weight: bold;
}

p {
  padding: 10px;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
}

.link {
  color: #2f5a9a; /* our primary blue */
  text-decoration: none;
  font-weight: bold;
}

.contact-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
}

.link:hover {
  text-decoration: underline;
}

</style>