<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sendRequest } from '@/apiController';
import type Product from '@/schemas/product';

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const res = await sendRequest({ path: '/product', method: 'GET' });
    if (!res.ok)
      throw new Error(`HTTP error! status: ${res.status}`);
    const response = await res.json();
    products.value = response;

  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});
</script>
<template>
  <div>
    <h1>Products</h1>
    <v-table striped hoverable>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Description</th>
          <th>Product Price</th>
          <th>Product Weight</th>
          <th>Environmental Footprint</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.weight }}</td>
          <td>{{ product.EF }}</td>
          <td>
            <router-link :to="`/products/${product.id}`">View Details</router-link>
          </td>
        </tr>
      </tbody>
    </v-table>

  </div>
</template>
