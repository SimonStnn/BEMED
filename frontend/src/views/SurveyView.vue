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
  <v-card class="survey-card">
    <v-btn color="primary" @click="sendRequest({
        path: '/treatment',
        method: 'DELETE',
        body: {
          id: 9,
          
          answers: [
            {questionId: 1, answer: 'Yes'},
            {questionId: 2, answer: 'No'},
            {questionId: 3, answer: 'Yes'},
            {questionId: 4, answer: 'No'},
            {questionId: 5, answer: 10},
            {questionId: 6, answer: 5},
            {questionId: 7, answer: 15}
          ]
        }, 
      }).then(res=>res.json()).then(console.log)">
      CLick me
    </v-btn>
    <v-card-title>
      <span class="headline">Survey Page</span>
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
        <v-btn class="sub-button" type="submit" color="primary">Submit</v-btn>

      </api-form>
    </v-card-text>
  </v-card>
</template>
  
<script lang="ts">
</script>

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

.survey-card {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: scroll;
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

.sub-button {
  margin-bottom: 50px;
}

</style>  