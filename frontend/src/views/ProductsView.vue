<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sendRequest } from '@/apiController';
import ProductCard, { type Product } from '@/components/ProductCard.vue';

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const res = await sendRequest({ path: '/product', method: 'GET', body: { limit: 100 } });
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
    <h1 class="headline">Product information</h1>
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
            <v-dialog max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" text="View Details" variant="tonal" color="secondary"></v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <ProductCard :product="product" :go-back="() => { isActive.value = false }" />
              </template>
            </v-dialog>
          </td>
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