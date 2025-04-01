<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue';
import { ref } from 'vue';

function checkFormData() {
  console.log("Submitting form data:", JSON.stringify(formData));
}

function onSuccess(data: any) {
  console.log("Response from server:", data);
}

// EFI means Environmental Footprint Index
</script>

<template>
  <v-container class="alternatives">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="survey-card">
          <v-card-title class="title">
            <span class="headline">Plastic Alternatives Survey Page</span>
            <p class="efi-explanation">EFI means Environmental Footprint Index</p>
          </v-card-title>
          <v-card-text class="survey-content">
            <api-form action="/alternatives" method="POST" v-on:success="onSuccess" v-bind:body="formData"
              @submit="checkFormData">
              <div class="survey-field" v-for="(question, questionId) in questions" :key="questionId">
                <p class="question-label">{{ question.text }}</p>
                <p class="EFI">
                  Average EFI from selected questions: {{ calculateAverageEFI(question.id) }}
                </p>
                <v-container v-model="formData.questions[questionId]" multiple>
                  <v-checkbox class="checkbox" v-for="(option, optionIndex) in question.options" :key="option.label"
                    :value="option.label" @update:model-value="(value) => {
                      if (value) {
                        formData.questions[question.id].push(optionIndex);
                      } else {
                        const index = formData.questions[question.id].indexOf(optionIndex);
                        if (index !== -1) {
                          formData.questions[question.id].splice(index, 1);
                        }
                      }
                    }">
                    <template v-slot:label>
                      <div>
                        <span class="options">{{ option.label }}</span>
                        <br><span class="efi-label">Environmental Footprint Index: {{ option.footprint }}</span>
                      </div>
                    </template>
                  </v-checkbox>
                </v-container>
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
  footprint: number;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

// Define formData with typed questions object
const formData = ref<{ questions: Record<number, number[]> }>({
  questions: {}
});

// Define questions with types
const questions = ref<Question[]>([
  {
    id: 1,
    text: "SUP straws - Choose an alternative:",
    options: [
      { label: "No straws", footprint: 0.0 },
      { label: "Paper straws", footprint: 6.21 },
      { label: "Reusable straws (e.g., metal, bamboo, glass)", footprint: 3.24 }
    ]
  },
  {
    id: 2,
    text: "SUP cups - Choose an alternative:",
    options: [
      { label: "Paper cups", footprint: 7.02 },
      { label: "Reusable cups from hard plastic", footprint: 3.69 },
      { label: "Reusable cups (e.g., ceramic, glass)", footprint: 3.15 }
    ]
  },
  {
    id: 3,
    text: "SUP water bottles - Choose an alternative:",
    options: [
      { label: "No bottles, only tapwater", footprint: 0.0 },
      { label: "Water dispenser with returnable 5L bottles", footprint: 1.85 },
      { label: "Water in single use glass bottles", footprint: 5.0 }
    ]
  },
  {
    id: 4,
    text: "SUP juice bottles - Choose an alternative:",
    options: [
      { label: "Drinks made on-site", footprint: 0.0 },
      { label: "Big (>5L) SUP bottles", footprint: 3.69 },
      { label: "Returnable glass bottles", footprint: 3.0 },
      { label: "Cans with plastic lining", footprint: 6.48 },
      { label: "Tetra Packs", footprint: 8.0 }
    ]
  },
  {
    id: 5,
    text: "Plastic coffee capsules - Choose an alternative:",
    options: [
      { label: "No alternative", footprint: 7.38 },
      { label: "Coffee in plastic or aluminium bags", footprint: 5.54 },
      { label: "Coffee purchased by weight", footprint: 0.0 },
      { label: "No capsules used", footprint: 0.0 }
    ]
  },
  {
    id: 6,
    text: "Tea bags - Choose an alternative:",
    options: [
      { label: "Tea in plastic bags", footprint: 7.38 },
      { label: "Paper tea bags", footprint: 6.21 },
      { label: "No tea bags", footprint: 0.0 }
    ]
  },
  {
    id: 7,
    text: "Coffee stir sticks - Choose an alternative:",
    options: [
      { label: "Reusable spoons (e.g. metal)", footprint: 3.24 },
      { label: "Single use sticks (wooden or bamboo)", footprint: 6.39 },
      { label: "No stir sticks", footprint: 0.0 }
    ]
  },
  {
    id: 8,
    text: "SUP plates - Choose an alternative:",
    options: [
      { label: "Paper or cardboard plates", footprint: 7.02 },
      { label: "Reusable plates (e.g. ceramic)", footprint: 3.51 },
      { label: "Reusable hard plastic plates", footprint: 3.60 }
    ]
  },
  {
    id: 9,
    text: "SUP cutlery - Choose an alternative:",
    options: [
      { label: "Reusable cutlery", footprint: 3.24 },
      { label: "Single use cutlery (e.g. wood, bamboo)", footprint: 6.48 },
      { label: "Bring your own cutlery", footprint: 0.0 }
    ]
  },
  {
    id: 10,
    text: "SUP bags - Choose an alternative:",
    options: [
      { label: "Reusable and durable bags or baskets (e.g., cotton, jute)", footprint: 2.63 },
      { label: "Bring your own bag", footprint: 0.0 },
      { label: "No plastic bags", footprint: 0.0 }
    ]
  },
  {
    id: 11,
    text: "Individual packaging (e.g., sugar, coffee) - Choose an alternative:",
    options: [
      { label: "Reusable containers", footprint: 4.0 },
      { label: "Individual portions from medium or larger packaging", footprint: 4.0 }
    ]
  },
  {
    id: 12,
    text: "Plastic toiletries - Choose an alternative:",
    options: [
      { label: "Toiletries in reusable containers", footprint: 3.69 },
      { label: "Soaps without plastic packaging", footprint: 6.21 },
      { label: "No toiletires", footprint: 0.0 }
    ]
  },
  {
    id: 13,
    text: "Plastic hand sanitizer bottles - Choose an alternative:",
    options: [
      { label: "Large single use bottles", footprint: 3.69 },
      { label: "No sanitizer, only hand washing", footprint: 0.0 }
    ]
  },
  {
    id: 14,
    text: "SUP gloves - Choose an alternative:",
    options: [
      { label: "Reusable rubber gloves", footprint: 4.05 },
      { label: "No gloves, washing hands regularly instead", footprint: 0.0 }
    ]
  },
]);

// Initialize formData for each question
questions.value.forEach(q => {
  formData.value.questions[q.id] = []; // Initially, no options are selected for any question
});

// Function to calculate average index for selected options
const calculateAverageEFI = (questionId: number) => {
  const selectedOptions = formData.value.questions[questionId] || [];
  if (selectedOptions.length === 0) return 0;

  const question = questions.value.find(q => q.id === questionId);
  if (!question) return 0;


  let totalIndex = 0;
  selectedOptions.forEach((optionIndex) => {
    const option = question.options[optionIndex];
    if (option) {
      totalIndex += option.footprint;
    }
  });
  return (totalIndex / selectedOptions.length).toFixed(2); // to round off to 2 decimals
};
</script>

<style scoped>
.headline {
  font-size: 1.6rem;
  font-weight: bold;
}

.title {
  padding-bottom: 20px;
}

.survey-card {
  max-height: 80vh;
  overflow-y: auto;
  /* to enable scrolling */
}

.survey-field {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9; /* light gray */
  border-radius: 8px;
}

.options {
  font-weight: bold;
}

.question-label {
  font-weight: bold;
  font-size: 20px;
  display: block;
}

.efi-label {
  font-size: 0.85em;
  color: rgb(91, 91, 91);
}

.EFI {
  padding-bottom: 20px;
}
</style>