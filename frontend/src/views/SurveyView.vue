<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue';
import { ref } from 'vue';

const formData = ref({
  questions: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
  }
})

function onSuccess(data: any) {
  console.log("Response from server:", data);
}
</script>

<template>
  <v-container class="survey">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="survey-card">
          <v-card-title>
            <span class="headline">Survey Page</span>
          </v-card-title>
          <v-card-text class="survey-content">
            <api-form action="/survey" method="POST" v-on:success="onSuccess" v-bind:body="formData">
              
              <!--Yes/no questions (4)-->
              <v-radio-group v-model="formData.questions[1]" class="survey-field" requiered>
                <p class="question-label">Does your institution currently practice waste separation?</p>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
                <v-radio label="I don't know" value="I don't know"></v-radio>
              </v-radio-group>

              <v-radio-group v-model="formData.questions[2]" class="survey-field" requiered>
                <p class="question-label">Does your institution have special bins or containers for separate waste collection?</p>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
                <v-radio label="I don't know" value="I don't know"></v-radio>
              </v-radio-group>

              <v-radio-group v-model="formData.questions[3]" class="survey-field" requiered>
                <p class="question-label">Does your institution have established policies or guidelines for waste management?</p>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
                <v-radio label="I don't know" value="I don't know"></v-radio>
              </v-radio-group>

              <v-radio-group v-model="formData.questions[4]" class="survey-field" requiered>
                <p class="question-label">Does your institution conduct training to raise awareness about waste management?</p>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
                <v-radio label="I don't know" value="I don't know"></v-radio>
              </v-radio-group>

              <!--Numeric questions-->
              <div class="survey-field">
              <p class="num-question-label">How much single-use plastic packaging has your institution collected since the beginning of the year? Approximation in KG</p>
              <v-text-field v-model.number="formData.questions[5]" type="number" required></v-text-field></div>

              <div class="survey-field">
              <p class="num-question-label">How much paper (if collected separately) has your institution gathered so far? Approximation in KG</p>
              <v-text-field v-model.number="formData.questions[6]" type="number"></v-text-field></div>

              <div class="survey-field">
              <p class="num-question-label">What is the total amount of separately collected waste? Approximation in KG</p>
              <v-text-field v-model.number="formData.questions[7]" type="number" required></v-text-field></div>

              <!--Submit survey-->
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

<style scoped>
  .headline {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .survey-card {
    max-height: 80vh;
    overflow-y: auto; /* to enable scrolling */
  }

  /* to make survey fields look similar */
  .survey-field {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f9f9f9; /* light gray */
    border-radius: 8px;
  }

  .question-label {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
    display: block;
  }

  .num-question-label {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
  }

</style>  