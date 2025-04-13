<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sendRequest } from '@/apiController';
import type Product from '@/schemas/product';
import type Alternative from '@/schemas/alternative';

const products = ref<Product[]>([]);
const alternatives = ref<Alternative[]>([]);

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

onMounted(async () => {
  try {
    const res = await sendRequest({ path: '/alternative', method: 'GET' });
    if (!res.ok)
      throw new Error(`HTTP error! status: ${res.status}`);
    const response = await res.json();
    alternatives.value = response;

  } catch (error) {
    console.error('Failed to fetch alternatives:', error);
  }
});
</script>
<template>
  <v-container>
    <h1 class="headline title">Available Products</h1>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="survey-card" outlined>
          <v-card-title class="question-label">{{ product.name }}</v-card-title>
          <v-card-text>
            <p>{{ product.description }}</p>
            <p>Price: {{ product.price }}</p>
            <p>Weight: {{ product.weight }} kg</p>
            <p>EF: {{ product.EF }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.headline {
  font-size: 1.6rem;
  font-weight: bold;
}

.title {
  padding-bottom: 20px;
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

.question-label {
  font-weight: bold;
  font-size: 20px;
  display: block;
}

.efi-label {
  font-size: 0.85em;
  color: rgb(91, 91, 91);
}

.efi-explanation {
  color: #2f5a9a;
  font-weight: bold;
}

.EFI {
  padding-bottom: 20px;
}

.sub-button {
  margin-bottom: 50px;
}
</style>