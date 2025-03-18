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
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
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
  <v-container class="alternatives">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="survey-card">
          <v-card-title>
            <span class="headline">Plastic Alternatives Survey Page</span>
          </v-card-title>
          <v-card-text class="survey-content">
            <api-form action="/alternatives" method="POST" v-on:success="onSuccess" v-bind:body="formData"
            @submit="checkFormData">
              
            <!--NEEDED: AVG(HAPI's from the selected alternatives, each question separate)-->
              <!--Alternatives selection (15 questions)-->
              <v-container v-model="formData.questions[1]" class="survey-field" name="q1" required>
                <p class="question-label">Alternatives for SUP straws</p>
                <v-checkbox label="Paper straws (HAPI: 6.21)" value="Paper straw"></v-checkbox>
                <v-checkbox label="Reusable straws (e.g., metal, bamboo, glass) (HAPI: 3.24)" value="Reusable straw"></v-checkbox>
                <v-checkbox label="No straws (HAPI: 00.00)" value="None"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[2]" class="survey-field" name="q2" required>
                <p class="question-label">Alternatives for SUP cups</p>
                <v-checkbox label="Paper cups (HAPI: 7.02)" value="Paper cup"></v-checkbox>
                <v-checkbox label="Reusable cups from hard plastic (HAPI: 3.69)" value="Reusable plastic cup"></v-checkbox>
                <v-checkbox label="Reusable cups (e.g. ceramic, glass)" value="Reusable cup"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[3]" class="survey-field" name="q3" required>
                <p class="question-label">Alternatives for SUP bottles (water)</p>
                <v-checkbox label="Water dispenser with 5L returnable plastic bottles (HAPI: 1.85)" value="Returnable bottles"></v-checkbox>
                <v-checkbox label="Water in single use glass bottles (HAPI: 5.00)" value="Single use glass"></v-checkbox>
                <v-checkbox label="No bottles, only tapwater (HAPI: 00.00)" value="Drinks on site"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[4]" class="survey-field" name="q4" required>
                <p class="question-label">Alternatives for SUP bottles (juice)</p>
                <v-checkbox label="Drinks in large (>5L) SUP bottles (HAPI: 3.69)" value="Big SUP bottles"></v-checkbox>
                <v-checkbox label="Drinks in returnable glass bottles (HAPI: 3.00)" value="Returnable bottles"></v-checkbox>
                <v-checkbox label="Drinks made on site (HAPI: 00.00)" value="Drinks on site"></v-checkbox>
                <v-checkbox label="Cans with plastic lining (HAPI: 6.48)" value="Cans"></v-checkbox>
                <v-checkbox label="Drinks in Tetra Pack (HAPI: 8.00)" value="Tetra Pack"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[5]" class="survey-field" name="q5" required>
                <p class="question-label">Alternatives for SUP coffe capsules</p>
                <v-checkbox label="Plastic coffee capsules (HAPI: 7.38)" value="Plastic capsules"></v-checkbox>
                <v-checkbox label="Coffee in plastic or aluminium bags (HAPI: 5.54)" value="In bags"></v-checkbox>
                <v-checkbox label="Coffee purchased by weight (HAPI: 00.00)" value="By weight"></v-checkbox>
                <v-checkbox label="Using no capsules (HAPI: 00.00)" value="None"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[6]" class="survey-field" name="q6" required>
                <p class="question-label">Alternatives for tea bags</p>
                <v-checkbox label="Tea in plastic bags (HAPI: 7.38)" value="Plastic bags"></v-checkbox>
                <v-checkbox label="Single use paper tea bags (HAPI: 6.21)" value="Paper tea bags"></v-checkbox>
                <v-checkbox label="No tea bags (HAPI: 00.00)" value="None"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[7]" class="survey-field" name="q7" required>
                <p class="question-label">Alternatives for SUP coffee stirs</p>
                <v-checkbox label="Reusable spoons (e.g. metal) (HAPI: 3.24)" value="Reusable spoon"></v-checkbox>
                <v-checkbox label="Single use wooden or bamboo sticks (HAPI: 6.39)" value="Single use sticks"></v-checkbox>
                <v-checkbox label="No stirs (HAPI: 00.00)" value="None"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[8]" class="survey-field" name="q8" required>
                <p class="question-label">Alternatives for SUP plates</p>
                <v-checkbox label="Paper or cardboard plates (HAPI: 7.02)" value="Paper plates"></v-checkbox>
                <v-checkbox label="Reusable reusable (e.g., ceramic) (HAPI: 3.51)" value="Reusable plate"></v-checkbox>
                <v-checkbox label="Reusable hard plastic plates (HAPI: 3.60)" value="Plastic reusable plate"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[9]" class="survey-field" name="q9" required>
                <p class="question-label">Alternatives for SUP cutlery</p>
                <v-checkbox label="Reusable metal cutlery (HAPI: 3.24)" value="Reusable cutlery"></v-checkbox>
                <v-checkbox label="Single use cutlery (e.g. wood, paper, bamboo) (HAPI: 6.48)" value="Single use cutlery"></v-checkbox>
                <v-checkbox label="Bring your own cutlery (HAPI: 00.00)" value="Own cutlery"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[10]" class="survey-field" name="q10" required>
                <p class="question-label">Alternatives for SUP bags</p>
                <v-checkbox label="Paper bags (HAPI: 4.66)" value="Paper bags"></v-checkbox>
                <v-checkbox label="Reusable and durable bags or baskets from organic materials (e.g. cotton, jute) (HAPI: 2.63)" value="Reusable organic bags"></v-checkbox>
                <v-checkbox label="Bring your own bag (HAPI: 00.00)" value="Own bags"></v-checkbox>
                <v-checkbox label="Without plastic bags (HAPI: 00.00)" value="No plastic bags"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[11]" class="survey-field" name="q11" required>
                <p class="question-label">Alternatives for individual packaging (e.g. sugar, coffer, oil)</p>
                <v-checkbox label="Reusable containers or individual portions from medium or larger packaging  (HAPI: 4.00)" value="Reusable containers"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[12]" class="survey-field" name="q12" required>
                <p class="question-label">Alternatives for plastic toilet products</p>
                <v-checkbox label="Toiletries in reusable containers (HAPI: 3.69)" value="Reusable containers"></v-checkbox>
                <v-checkbox label="Soaps without plastic packaging (HAPI: 6.21)" value="No packaging"></v-checkbox>
                <v-checkbox label="No toiletries (HAPI: 00.00)" value="None"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[13]" class="survey-field" name="q13" required>
                <p class="question-label">Alternatives for plastic hand sanitizer bottles</p>
                <v-checkbox label="Hand sanitizer in large single use bottles (HAPI: 3.69)" value="Single use bottles"></v-checkbox>
                <v-checkbox label="Hand washing instead of sanitizer (HAPI: 0.00)" value="None"></v-checkbox>
              </v-container>

              <v-container v-model="formData.questions[14]" class="survey-field" name="q14" required>
                <p class="question-label">Alternatives for SUP gloves</p>
                <v-checkbox label="Reusable rubber gloves (HAPI: 4.05)" value="Reusable gloves"></v-checkbox>
                <v-checkbox label="Washing hands often instead of using gloves (HAPI: 00.00)" value="None"></v-checkbox>
              </v-container>

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