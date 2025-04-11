<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sendRequest } from '@/apiController';
import type Product from '@/schemas/product';

const route = useRoute();
const product = ref<Product | null>(null);

onMounted(async () => {
  console.log(route)
  const productId = route.params.id;
  if (productId) {
    try {
      const res = await sendRequest({
        path: `/product`,
        method: 'GET',
        body: {
          id: productId,
        }
      });
      if (!res.ok)
        throw new Error(`HTTP error! status: ${res.status}`);
      const response = await res.json();
      product.value = response[0];
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  }
});
</script>

<template>
  <h1>Product Details</h1>
  <v-row v-if="!product" justify="center" align="center" style="flex-direction: column;">
    <v-progress-circular indeterminate color="primary" />
    <p>Loading...</p>
  </v-row>
  <v-card v-else>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>
      {{ product.description }}
    </v-card-subtitle>
  </v-card>
</template>
