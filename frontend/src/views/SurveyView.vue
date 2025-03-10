<script lang="ts" setup>
</script>

<template>
  <v-container class="survey">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Survey Page</span>
          </v-card-title>
          <v-card-text>
            <api-form action="/survey" method="POST" v-on:success="onSuccess">
              <v-btn type="submit" color="primary">Submit</v-btn>
            </api-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </template>
  
  <script lang="ts">

  </script>

  <style scoped></style>  