<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sendRequest } from '@/apiController'; // hvis du vil hente rigtig produktdata
import ProductCard, { type Product } from '@/components/ProductCard.vue';


const route = useRoute();
const router = useRouter();

const products = ref<Product[] | null>(null);
const productIds = (() => {
  const queryParam = route.query.productId;

  if (Array.isArray(queryParam)) {
    // If productId is an array, parse each element as an integer
    return queryParam
      .filter((id): id is string => id !== null) // Filter out null values
      .map((id: string) => parseInt(id))
      .filter((id) => !isNaN(id));
  } else if (typeof queryParam === 'string') {
    // If productId is a comma-separated string, split and parse
    return queryParam.split(',').map((id: string) => parseInt(id, 10)).filter((id) => !isNaN(id));
  } else {
    // If productId is not provided or invalid, return an empty array
    return [];
  }
})();
const ppmValues = ref<Record<number, number>>({});
onMounted(async () => {
  console.log('Product IDs:', productIds);
  // Hent produktinfo fra API – eller brug props hvis du sender alt via router
  const res = await sendRequest({ path: `/product`, method: 'GET', body: { id: productIds } });
  if (res.ok) {
    products.value = await res.json();
  } else {
    console.error("Could not fetch product");
  }
});

function onSuccess(data: any) {
  console.log('Response from server:', data)
}

function addAssessment() {
  const assesments = productIds.map((productId) => {
    return {
      productId: productId,
      ppm: ppmValues.value[productId] || 0
    };
  });

  for (const assesment of assesments) { 
    sendRequest({
      path: '/assessment',
      method: 'POST',
      body:  assesment 
    }).then(response => {
      if (response.ok) {
        console.log('Assessment added successfully');
      } else {
        console.error('Failed to add assessment');
      }
    }).catch(error => {
      console.error('Error while adding assessment:', error);
    });
  }
}


</script>

<template>
  <div v-if="products">
    <v-table striped hoverable>
      <thead>
        <tr>
          <th>Product name</th>
          <th>Pieces per month</th>
          <th>Weight</th>
          <th>Total weight</th>
          <th>Price</th>
          <th>Total Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <v-text-field v-model="ppmValues[product.id]" label="Pieces Per Month" type="number" min="0"></v-text-field>
          <td>{{ product.weight }}</td>
          <td>{{ ((product.weight || 0) * (ppmValues[product.id] || 0)).toFixed(2) }}</td>

          <td>€{{ product.price }}</td>
          <td>€{{ ((product.price || 0) * (ppmValues[product.id] || 0)).toFixed(2) }}</td>
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



    <v-btn color="primary" @click="addAssessment">Add</v-btn>
  </div>
</template>
