<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue';
import { ref } from 'vue';



//function onSuccess(data: any) {
//  console.log("Response from server:", data);
//}

</script>

<template>
  <v-container class="alternatives">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="survey-card">
          <v-card-title>
            <span class="headline">Plastic Alternatives Survey Page</span>
          </v-card-title>
          <v-card-text class="survey-content">
            <div v-for="(question, questionId) in questions" :key="questionId">
            <p class="question-label">{{ question.text }}</p>

          <!-- v-checkbox-group to bind to the selected options -->
          <v-container v-model="formData.questions[questionId]" multiple>
            <v-checkbox
              v-for="option in question.options"
              :key="option.label"
              :label="`${option.label} (HAPI: ${option.hapi})`"
              :value="option.label"
            ></v-checkbox>
          </v-container>

          <!-- Show the HAPI index if any options are selected -->
          <p v-if="calculateAverageHAPI(questionId) !== null">
            <strong>Average HAPI Index:</strong> {{ calculateAverageHAPI(questionId) }}
          </p>
        </div>

              <!--Submit survey-->
              <v-btn type="submit" color="primary">Submit</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </template>
  
<script lang="ts">
interface Option {
  label: string;
  hapi: number;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

// Define formData with typed questions object
const formData = ref<{ questions: Record<number, string[]> }>({
  questions: {}
});

// Define questions with types
const questions = ref<Question[]>([
  {
    id: 1,
    text: "Alternatives: Plastic straws - Choose an alternative:",
    options: [
      { label: "None", hapi: 0 },
      { label: "Paper straw", hapi: 6.21 },
      { label: "Reusable straw", hapi: 3.24 }
    ]
  },
  {
    id: 2,
    text: "Alternatives: Plastic cutlery - Choose an alternative:",
    options: [
      { label: "None", hapi: 0 },
      { label: "Wooden cutlery", hapi: 4.5 },
      { label: "Reusable cutlery", hapi: 2.3 }
    ]
  }
]);

// Initialize formData for each question
questions.value.forEach(q => {
  formData.value.questions[q.id] = []; // Initially, no options are selected for any question
});

// Function to calculate average HAPI index for selected options
const calculateAverageHAPI = (questionId: number) => {
  const selectedOptions = formData.value.questions[questionId];
  if (!selectedOptions || selectedOptions.length === 0) return null;

  const totalHAPI = selectedOptions.reduce((sum: number, optionLabel: string) => {
    const question = questions.value.find(q => q.id === questionId);
    const option = question?.options.find(opt => opt.label === optionLabel);
    return sum + (option ? option.hapi : 0);
  }, 0);

  return (totalHAPI / selectedOptions.length).toFixed(2); // Round off to 2 decimals
};
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

  .hapi-index {
  font-weight: bold;
  margin-top: 10px;
}
</style>  