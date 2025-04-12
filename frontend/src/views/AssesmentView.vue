<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue'
import { ref } from 'vue'

// Produkter og afdelinger
const products = ref([
  'Plastic Straws',
  'Plastic Cups',
  'Plastic Bottles',
  'Plastic Plates',
  'Cleaning Products'
])

const departments = ['Office', 'Cantine', 'Events', 'Cleaning Products', 'Institutions (total)']

// formData holder værdier som: formData[produkt][afdeling] = tal
const formData = ref<{ [product: string]: { [department: string]: number | null } }>({})

// Initialize tomme værdier
products.value.forEach(product => {
  formData.value[product] = {}
  departments.forEach(dept => {
    formData.value[product][dept] = null
  })
})

// Metadata
const timestamps = ref({
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

// Logger ved submit
function checkFormData() {
  timestamps.value.updatedAt = new Date().toISOString()
  console.log('Submitting form data: ', {
    data: formData.value,
    timestamps: timestamps.value
  })
}

function onSuccess(data: any) {
  console.log('Response from server:', data)
}
</script>

<template>
  <v-card class="survey-card">
    <v-card-title class="headline">Assessment Page</v-card-title>
    <v-card-text>
      <api-form action="/assessment" method="POST" :body="{ data: formData, timestamps }" @submit="checkFormData" @success="onSuccess">
        <v-simple-table class="assessment-table">
          <thead>
            <tr>
              <th>Product</th>
              <th v-for="dept in departments" :key="dept">{{ dept }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product">
              <td><strong>{{ product }}</strong></td>
              <td v-for="dept in departments" :key="dept">
                <v-text-field
                  v-model.number="formData[product][dept]"
                  type="number"
                  placeholder="Enter value"
                  hide-details
                  dense
                ></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-simple-table>

        <div class="timestamps">
          <p><strong>Created at:</strong> {{ timestamps.createdAt }}</p>
          <p><strong>Updated at:</strong> {{ timestamps.updatedAt }}</p>
        </div>

        <v-btn class="sub-button" color="primary" type="submit">Submit</v-btn>
      </api-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.survey-card {
  width: 100%;
  padding: 20px;
  height: 100%;
  overflow: auto;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

.assessment-table {
  margin-bottom: 20px;
  background-color: #f4fdfb;
}

.timestamps {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
}

.sub-button {
  margin-top: 20px;
}
</style>
