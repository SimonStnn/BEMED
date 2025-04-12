<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sendRequest } from '@/apiController';
import ProductCard, { type Product } from '@/components/ProductCard.vue';

const route = useRoute();
const productId = ref(route.query.id);
const productDetails = ref<Product | null>(null);

const fetchProductDetails = async (id: string | null) => {
  if (id) {
    try {
      const res = await sendRequest({
        path: `/product`,
        method: 'GET',
        body: {
          id: id,
        }
      });
      if (!res.ok)
        throw new Error(`HTTP error! status: ${res.status}`);
      const response = await res.json();
      productDetails.value = response[0];
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  }
};

watch(() => route.query.id, (newId) => {
  productId.value = newId;
  fetchProductDetails(newId as string);
});

onMounted(() => {
  fetchProductDetails(productId.value as string);
});
</script>

<template>
  <div>
    <h1>Product Details</h1>
    <v-row v-if="!productDetails" justify="center" align="center" style="flex-direction: column;">
      <v-progress-circular indeterminate color="primary" />
      <p>Loading...</p>
    </v-row>
    <product-card v-else :product="productDetails" :key="productDetails.id"
      :go-back="() => { $router.push({ name: 'products' }).catch(err => console.error(err)); }" />
  </div>
</template>
