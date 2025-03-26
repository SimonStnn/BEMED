<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue';
import { ref } from 'vue';

function checkFormData() {
  console.log("Submitting form data:", JSON.stringify(formData.value));
}

function onSuccess(data: any) {
  console.log("Response from server:", data);
}

</script>

<template>
  <v-container class="alternatives">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="survey-card">
          <v-card-title class="title">
            <span class="headline">Plastic Alternatives Survey Page</span>
          </v-card-title>
          <v-card-text class="survey-content">
            <api-form action="/alternatives" method="POST" v-on:success="onSuccess" v-bind:body="formData"
            @submit="checkFormData">
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
            </api-form>
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
    text: "SUP straws - Choose an alternative:",
    options: [
      { label: "No straws", hapi: 0.0 },
      { label: "Paper straws", hapi: 6.21 },
      { label: "Reusable straws (e.g., metal, bamboo, glass)", hapi: 3.24 }
    ]
  },
  {
    id: 2,
    text: "SUP cups - Choose an alternative:",
    options: [
      { label: "Paper cups", hapi: 7.02 },
      { label: "Reusable cups from hard plastic", hapi: 3.69 },
      { label: "Reusable cups (e.g., ceramic, glass)", hapi: 3.15 }
    ]
  },
  {
    id: 3,
    text: "SUP water bottles - Choose an alternative:",
    options: [
      { label: "No bottles, only tapwater", hapi: 0.0 },
      { label: "Water dispenser with returnable 5L bottles", hapi: 1.85 },
      { label: "Water in single use glass bottles", hapi: 5.0 }
    ]
  },
  {
    id: 4,
    text: "SUP juice bottles - Choose an alternative:",
    options: [
      { label: "Drinks made on-site", hapi: 0.0 },
      { label: "Big (>5L) SUP bottles", hapi: 3.69 },
      { label: "Returnable glass bottles", hapi: 3.0 },
      { label: "Cans with plastic lining", hapi: 6.48 },
      { label: "Tetra Packs", hapi: 8.0 }
    ]
  },
  {
    id: 5,
    text: "Plastic coffee capsules - Choose an alternative:",
    options: [
      { label: "No alternative", hapi: 7.38 },
      { label: "Coffee in plastic or aluminium bags", hapi: 5.54 },
      { label: "Coffee purchased by weight", hapi: 0.0 },
      { label: "No capsules used", hapi: 0.0 }
    ]
  },
  {
    id: 6,
    text: "Tea bags - Choose an alternative:",
    options: [
      { label: "Tea in plastic bags", hapi: 7.38 },
      { label: "Paper tea bags", hapi: 6.21 },
      { label: "No tea bags", hapi: 0.0 }
    ]
  },
  {
    id: 7,
    text: "Coffee stir sticks - Choose an alternative:",
    options: [
      { label: "Reusable spoons (e.g. metal)", hapi: 3.24 },
      { label: "Single use sticks (wooden or bamboo)", hapi: 6.39 },
      { label: "No stir sticks", hapi: 0.0 }
    ]
  },
  {
    id: 8,
    text: "SUP plates - Choose an alternative:",
    options: [
      { label: "Paper or cardboard plates", hapi: 7.02 },
      { label: "Reusable plates (e.g. ceramic)", hapi: 3.51 },
      { label: "Reusable hard plastic plates", hapi: 3.60 }
    ]
  },
  {
    id: 9,
    text: "SUP cutlery - Choose an alternative:",
    options: [
      { label: "Reusable cutlery", hapi: 3.24 },
      { label: "Single use cutlery (e.g. wood, bamboo)", hapi: 6.48 },
      { label: "Bring your own cutlery", hapi: 0.0 }
    ]
  },
  {
    id: 10,
    text: "SUP bags - Choose an alternative:",
    options: [
      { label: "Reusable and durable bags or baskets (e.g., cotton, jute)", hapi: 2.63 },
      { label: "Bring your own bag", hapi: 0.0 },
      { label: "No plastic bags", hapi: 0.0 }
    ]
  },
  {
    id: 11,
    text: "Individual packaging (e.g., sugar, coffee) - Choose an alternative:",
    options: [
      { label: "Reusable containers", hapi: 4.0 },
      { label: "Individual portions from medium or larger packaging", hapi: 4.0 }
    ]
  },
  {
    id: 12,
    text: "Plastic toiletries - Choose an alternative:",
    options: [
      { label: "Toiletries in reusable containers", hapi: 3.69 },
      { label: "Soaps without plastic packaging", hapi: 6.21 },
      { label: "No toiletires", hapi: 0.0 }
    ]
  },
  {
    id: 13,
    text: "Plastic hand sanitizer bottles - Choose an alternative:",
    options: [
      { label: "Large single use bottles", hapi: 3.69 },
      { label: "No sanitizer, only hand washing", hapi: 0.0 }
    ]
  },
  {
    id: 14,
    text: "SUP gloves - Choose an alternative:",
    options: [
      { label: "Reusable rubber gloves", hapi: 4.05 },
      { label: "No gloves, washing hands regularly instead", hapi: 0.0 }
    ]
  },
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

  .title {
    padding-bottom: 20px;
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