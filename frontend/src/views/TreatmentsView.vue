<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sendRequest } from '@/apiController';
import type Product from '@/schemas/product';
import type Answer from '@/schemas/answer';
import type Treatment from '@/schemas/treatment';

const products = ref<Product[]>([]);
var choose_alternative = "- Choose an alternative:"

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
  <v-container class="survey-card">
    <h1 class="headline">Plastic Alternatives survey</h1>
    <p class="efi-explanation">EFI means Environmental Footprint Index</p>
    <v-row>
      <v-col v-for="product in products"
        :key="product.id"
        cols="12" class="survey-field">
        <v-card-title class="question-label">
          {{  product.name + ` ${choose_alternative }` || 'No question found' }}
        </v-card-title>
        <v-card-text>
          <div class="product-info-row">
            <p>Description: {{ product.description }}</p><span class="divider"></span>
            <p>Price: {{ product.price }}</p><span class="divider"></span>
            <p>Weight: {{ product.weight }} kg</p>
          </div>
          <div><li v-for="alt in product.alternatives?.length ? product.alternatives : []" :key="alt.id"  class="alt-info-row">
              <p class="prod-name">{{ alt.name }}</p><span class="divider"></span>
              <p>Description: {{ alt.description }}</p><span class="divider"></span>
              <p>Price: {{ alt.price }}</p><span class="divider"></span>
              <p>Weight: {{ alt.weight }} kg</p><span class="divider"></span>
              <p>EF: {{ alt.EF }}</p>
            </li>
          </div>
        </v-card-text>
        <v-container class="checkbox"></v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.headline {
  font-size: 1.6rem;
  font-weight: bold;
}
.efi-explanation {
  color: #2f5a9a;
  font-weight: bold;
  font-size: 1.2rem;
  padding-bottom: 30px;
}

.question-label {
  font-weight: bold;
  font-size: 20px;
  display: block;
}

.product-info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 5px;
  font-size: 13px;
}

.alt-info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 5px;
  font-size: 13px;
}

.prod-name {
  font-weight: bold;
}

.divider {
  width: 1px;
  height: 18px;
  background-color: #ccc;
}

.survey-card {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: scroll;
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

.sub-button {
  margin-bottom: 50px;
}
</style>