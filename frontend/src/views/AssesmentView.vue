<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

// List of products (mock data for now)
const assesments = ref([
  {
    "id": 0,
    "userId": "string",
    "productId": 0,
    "ppm": 0,
    "product": {
      "id": 0,
      "name": "string",
      "description": "string",
      "price": 0,
      "weight": 0,
      "EF": 0
    },
    "createdAt": "2025-04-21T09:22:32.190Z",
    "updatedAt": "2025-04-21T09:22:32.190Z"
  }
])

// Saves timestamps for createdAt and updatedAt
const timestamps = ref({
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})


function onSuccess(data: any) {
  console.log('Response from server:', data)
}

</script>
<template>
  <div>
    <h1>Assesments</h1>
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
        <tr v-for="assesment in assesments" :key="assesment.id">
          <td>{{ assesment.product.name }}</td>

          <td>{{ assesment.ppm }}</td>
          <td>{{ assesment.createdAt }}</td>
          <td>
            <v-btn @click="$router.push({ name: 'product-details', query: { id: assesment.product.id } })"
              text="View Product" variant="tonal" color="secondary"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>


  </div>
</template>
