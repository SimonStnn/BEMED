<script setup lang="ts">
</script>

<template>
  <v-container class="homepage">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="home-card">
          <v-card-title>
            <h4 class="title">BEMED - Zero Waste</h4>
            <h1 class="headline">To change the way Montenegro tackles waste</h1>
          </v-card-title>
          <v-card-text>
            <h3 class="intro">Our mission is to raise awareness and lobby to change laws
            and behaviours to stop littering and reduce waste production.
            </h3>
          </v-card-text>
          <v-icon color="primary" class="icon">mdi-map-marker</v-icon>
          <span>We are located in Podgorica, Montenegro</span>
          <v-card-text>
            <p>
              The methodologies we use involve alternatives to single-use products
              and packaging, reusing and recycling discarded materials at the source,
              and moving away from waste incineration and land-filling. <br>
              We are part of the global ecological transition, acting with respect for human rights
              and better consideration of the most disadvantaged and
              future generations.
              If you would like to read more about the Zero Waste movement, <br>
              go to <a href="https://zerowasteeurope.eu" target="_blank" rel="noopener noreferrer" class="link">ZeroWasteEurope</a> and read more about this special journey.
            </p>
            <h3 class="contact-us">Contact us</h3>
            <p>
              In case you want to follow our journey of cleaning up the country,
              check out our instagram at <a href="https://www.instagram.com/zero.waste.montenegro/" target="_blank" rel="noopener noreferrer" class="link">@zero.waste.montenegro</a>.
              <br> <br> For any questions, feel free to send an email to
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--Room for images here-->
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-img src="/assets/img/logo.png" alt="logo zero waste" class="image"></v-img>
      </v-col>
      <v-col cols="12" md="4">
        <v-img src="/assets/img/logo.png" alt="logo zero waste" class="image"></v-img>
      </v-col>
    </v-row>
  </v-container>

  
</template>

<style>

.homepage {
  padding: 20px;
}

.home-card {
  padding: 20px;
  border-radius: 10px;
}

.title {
  padding-left: 10px;
  padding-top: 10px;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
}

.headline {
  padding-left: 10px;
  font-weight: bold;
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
  color: #333;
}

.icon {
  padding-left: 30px;
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
  color: #c1121f; /* our primary red */
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

</style>