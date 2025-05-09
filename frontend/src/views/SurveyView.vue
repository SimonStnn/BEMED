<script lang="ts" setup>
import { sendRequest } from '@/apiController';
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

function checkFormData() {
  console.log("Submitting form data:", JSON.stringify(formData.value));
}

function onSuccess(data: any) {
  console.log("Response from server:", data);
}
</script>

<template>
  <v-card-title>
    <span class="headline">Survey Page</span>
    <p class="explanation">Please select max. 1 option for every question</p>
  </v-card-title>
  <v-card-text class="survey-content">
    <api-form action="/survey" method="POST" v-on:success="onSuccess" v-bind:body="formData"
    @submit="checkFormData">
      
      <!--Yes/no questions (4)-->
      <v-radio-group v-model="formData.questions[1]" class="survey-field" name="q1" required>
        <p class="question-label">Does your institution currently practice waste separation?</p>
        <v-radio label="Yes" value="Yes"></v-radio>
        <v-radio label="No" value="No"></v-radio>
        <v-radio label="I don't know" value="I don't know"></v-radio>
      </v-radio-group>

      <v-radio-group v-model="formData.questions[2]" class="survey-field" name="q2" required>
        <p class="question-label">Does your institution have special bins or containers for separate waste collection?</p>
        <v-radio label="Yes" value="Yes"></v-radio>
        <v-radio label="No" value="No"></v-radio>
        <v-radio label="I don't know" value="I don't know"></v-radio>
      </v-radio-group>

      <v-radio-group v-model="formData.questions[3]" class="survey-field" name="q3" required>
        <p class="question-label">Does your institution have established policies or guidelines for waste management?</p>
        <v-radio label="Yes" value="Yes"></v-radio>
        <v-radio label="No" value="No"></v-radio>
        <v-radio label="I don't know" value="I don't know"></v-radio>
      </v-radio-group>

      <v-radio-group v-model="formData.questions[4]" class="survey-field" name="q4" required>
        <p class="question-label">Does your institution conduct training to raise awareness about waste management?</p>
        <v-radio label="Yes" value="Yes"></v-radio>
        <v-radio label="No" value="No"></v-radio>
        <v-radio label="I don't know" value="I don't know"></v-radio>
      </v-radio-group>

      <!--Numeric questions-->
      <div class="survey-field">
      <p class="num-question-label">How much single-use plastic packaging has your institution collected since the beginning of the year? Approximation in KG</p>
      <v-text-field v-model.number="formData.questions[5]" type="number" label="Q5" name="q5" required></v-text-field></div>

      <div class="survey-field">
      <p class="num-question-label">How much paper (if collected separately) has your institution gathered so far? Approximation in KG</p>
      <v-text-field v-model.number="formData.questions[6]" type="number" label="Q6" name="q6"></v-text-field></div>

      <div class="survey-field">
      <p class="num-question-label">What is the total amount of separately collected waste? Approximation in KG</p>
      <v-text-field v-model.number="formData.questions[7]" type="number" label="Q7" name="q7" required></v-text-field></div>

      <!--Submit survey-->
      <p class="req-explanation">Questions with '*' are required</p>
      <v-btn class="sub-button" type="submit" color="primary">Submit</v-btn>

    </api-form>
  </v-card-text>
</template>

<style scoped>
.headline {
  font-size: 1.7rem;
  font-weight: bold;
}

.explanation {
  color: #2f5a9a;
  font-weight: bold;
  font-size: 1.2rem;
}

.survey-field {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
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

.req-explanation {
  font-size: 0.85rem;
  text-decoration: underline;
}

</style>  