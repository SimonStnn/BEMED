<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
console.log(authStore.userInfo);
</script>

<template>
  <v-card-title>
    <h4 class="title">BEMED - Zero Waste</h4>
    <h1 class="headline">To change the way Montenegro tackles waste</h1>
  </v-card-title>
  <v-card-text class="home-content">
    <h3 class="intro">Our mission is to raise awareness and lobby to change laws
      and behaviours to stop littering and reduce waste production.
    </h3>
    <p>
      The project aims to reduce single-use plastic products (SUPPs) in institutions 
      through a comprehensive approach, 
      starting with the development of an assessment tool to evaluate current SUPPs usage 
      and set benchmarks for future tracking. 
      Procurement guidelines will be created to help institutions transition to sustainable alternatives, 
      providing criteria for eco-friendly product selection. 
      Case studies of successful SUPP reduction efforts will be compiled to inspire and guide similar initiatives. 
      <br>Implementation strategies. <br>
      Training sessions will be conducted to raise awareness and improve waste management habits. 
      The project will culminate in a conference to share tools, and outcomes, and foster partnerships 
      for expanding SUPP reduction across Montenegrin institutions.
      Zero Waste Montenegro was established in 2016 with the objective to dedicate itself to one of the largest environmental issues in Montenegro: waste mismanagement. 
      With the support of passionate volunteers, 
      the organization initiated the first coalition of NGOs working together to raise awareness 
      on littering and single-use plastic pollution in Montenegro: <a href='https://cleanupmontenegro.me' target='_blank' rel='noopener noreferrer' class="link">Cleanup Montenegro></a>.
      Zero Waste Montenegro has grown since and its team of full and part-time employees, volunteers and freelancers, 
      led by a multi-disciplinary Steering Committee, 
      are now working on impactful projects with municipalities, citizen groups, (inter)national organizations, ministries and businesses on their ZW journey.​

      If you would like to read more about the Zero Waste movement, <br>
      go to <a href="https://zerowasteeurope.eu" target="_blank" rel="noopener noreferrer"
        class="link">ZeroWasteEurope</a> and read more about this special journey.
    </p>
    <h3 class="contact-us">Contact us</h3>
  </v-card-text>

  <div class="contact-item">
    <v-icon color="primary" class="icon">mdi-map-marker</v-icon>
    <span class="span">We are located in Podgorica, Montenegro</span>
  </div>

  <div class="contact-item"><v-icon color="primary" class="icon">mdi-instagram</v-icon>
    <span class="span">You can follow our progress on <a href="https://www.instagram.com/zero.waste.montenegro/"
        target="_blank" rel="noopener noreferrer" class="link">Instagram</a> at @zero.waste.montenegro.</span>
  </div>

  <div class="contact-item"><v-icon color="primary" class="icon">mdi-email</v-icon>
    <a href="mailto:info@zerowastemontenegro.me" class="link">info@zerowastemontenegro.me</a>
  </div>

  <div class="contact-item"><v-icon color="primary" class="icon">mdi-phone</v-icon>
    <a href="tel:+38267627645" class="link">+382(0) 67627645</a>
  </div>
</template>

<style>
.home-card {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: scroll;
}

.title {
  text-align: center;
  padding-left: 10px;
  padding-top: 10px;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
  color: #2f5a9a;
  /* Primary blue */
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
  color: #2f5a9a;/* our primary blue */
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