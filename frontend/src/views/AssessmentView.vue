<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { sendRequest } from '@/apiController';

type AssessmentSchema = {
  id: number;
  userId: string;
  productId: number;
  ppm: number;
  createdAt: string;
  updatedAt: string;
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  weight: number | null;
  EF: number | null;
  alternatives?: {
    id: number;
    name: string;
    description: string | null;
    price: number | null;
    weight: number | null;
    EF: number | null;
  }[] | null;
};

type Assessment = AssessmentSchema & {
  product: Product;
};

// Loading and error state
const isLoading = ref(true);
const error = ref<string | null>(null);

// List of assessments
const assessments = ref<Assessment[]>([])


// Fetch assessments when component is mounted
onMounted(async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await sendRequest({
      path: '/assessment',
      method: 'GET',
      body: { limit: 1000 }
    });

    // Parse the JSON response
    const data = await response.json();

    // Update assessments with API response data
    if (data && Array.isArray(data)) {
      assessments.value = data;
    }

    console.log('Assessments loaded:', assessments.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load assessments';
    console.error('Error loading assessments:', err);
  } finally {
    isLoading.value = false;
  }
});

function onSuccess(data: any) {
  console.log('Response from server:', data)
}

</script>
<template>
  <div>
    <h1 class="headline">Assessments</h1>
    <v-table striped hoverable>
      <thead>
        <tr>
          <th>Product name</th>
          <th>Pieces per month</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="assessment in assessments" :key="assessment.id">
          <td>{{ assessment.product.name }}</td>
          <td>{{ assessment.ppm }}</td>
          <td>{{ assessment.createdAt }}</td>
          <td>
            <v-btn @click="$router.push({ name: 'product-details', query: { id: assessment.product.id } })"
              text="View Product" variant="tonal" color="secondary"></v-btn>
          </td>
        </tr>
        <tr v-if="assessments.length === 0">
          <td>No assessments found.</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<style scoped>
.headline {
  font-size: 1.7rem;
  font-weight: bold;
}
</style>