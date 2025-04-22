<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sendRequest } from '@/apiController';
import type Product from '@/schemas/product';

const products = ref<Product[]>([]);
const selectedAlternatives = ref<{ productId: number, alternativeId: number }[]>([]);
const filteredProducts = ref<Product[]>([]);
const allowedProductIds = [1, 5, 13, 18, 25, 29, 34, 38, 42, 47, 50, 53, 62, 59];

onMounted(async () => {
  try {
    const res = await sendRequest({ path: '/product', method: 'GET', body: { limit: 100 } });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const response = await res.json();
    products.value = response;
    filteredProducts.value = response.filter((product: Product) =>
      allowedProductIds.includes(product.id)
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});

async function submitTreatment() {
  try {
    const res = await sendRequest({
      path: '/treatment',
      method: 'POST',
      body: JSON.stringify(selectedAlternatives.value),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    console.log('Treatment submitted successfully');
  } catch (error) {
    console.error('Failed to submit treatment:', error);
  }
};

function calculateAverageEF(productId: number): number | null {
  const selectedEFs = selectedAlternatives.value
    .filter(sel => sel.productId === productId)
    .map(sel => {
      const product = products.value.find(p => p.id === sel.productId);
      return product?.alternatives?.find(a => a.id === sel.alternativeId)?.EF;
    })
    .filter((ef): ef is number => ef !== null && ef !== undefined);

  if (selectedEFs.length === 0) {
    return null;
  }
  const total = selectedEFs.reduce((sum, ef) => sum + ef, 0);
  return Number((total / selectedEFs.length).toFixed(2));
}
</script>

<template>
  <v-container class="survey-card">
    <h1 class="headline">Plastic Alternatives survey</h1>
    <p class="efi-explanation">EFI means Environmental Footprint Index</p>
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" class="survey-field">
        <v-card-title class="question-label">
          {{ product.name + ' - Choose an alternative:' || 'No question found' }}
        </v-card-title>
        <v-card-text>
          <p class="sup-description">{{ product.description }}</p>
          <div class="product-info-row">
            <div class="info-item">
              <v-icon icon="mdi-cash" class="icon"></v-icon>
              <p>{{ product.price }}</p>
              <span class="info-label">Price</span>
            </div>
            <div class="info-item">
              <v-icon icon="mdi-weight-kilogram" class="icon"></v-icon>
              <p>{{ product.weight }}</p>
              <span class="info-label">Weight in KG</span>
            </div>
          </div>
          <div class="avg-ef">Average EFI: {{ calculateAverageEF(product.id) ?? product.EF ?? "N/A" }}</div>
          <v-checkbox v-for="alt in product.alternatives || []" :key="alt.id"
            class="alt-info-row" hide-details v-model="selectedAlternatives" :value="{ productId: product.id, alternativeId: alt.id }">
            <template v-slot:label>
              <div>
                <span class="options">{{ alt.name }}</span>
                <span class="efi-label" title="Environmental Footprint Index"> EF: {{ alt.EF }}</span><br>
                <span class="descr-label">{{ alt.description }}</span>
              </div>
            </template>
          </v-checkbox>
        </v-card-text>
      </v-col>
      <v-btn color="primary" @click="submitTreatment">Submit Treatment</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
.headline {
  font-size: 1.7rem;
  font-weight: bold;
}

.question-label {
  font-weight: bold;
  font-size: 1.1rem;
  padding-bottom: 0px;
}

.sup-description {
  font-size: 0.8rem;
  margin-left: 0px;
  padding-top: 0px;
  padding-left: 0px;
  color: #555;
}

.efi-explanation {
  color: #2f5a9a;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.icon {
  color: #666;
}

.efi-label {
  font-size: 0.85em;
  color: rgb(91, 91, 91);
}

.descr-label {
  font-size: 0.85em;
  color: rgb(91, 91, 91);
}

.options {
  font-weight: bold;
}

.product-info-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 5px;
  font-size: 13px;
}

.info-item {
  display: flex;
  align-items: center;
  margin: 0 8px;
}

.alt-info-row {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
}

.survey-card {
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.survey-field {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>