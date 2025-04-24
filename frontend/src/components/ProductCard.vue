<script lang="ts" setup>
import { sendRequest } from '@/apiController';
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

type ProductSchema = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  weight: number | null;
  EF: number | null;
};

export type Product = ProductSchema & {
  alternatives: ProductSchema[];
};

const props = defineProps<{
  product: Product;
  hideActions?: boolean;
  disableLink?: boolean;
  goBack: () => void | undefined;
}>();

const authStore = useAuthStore();
const router = useRouter();

const inDetailsPage = computed(() => {
  return router.currentRoute.value.name === 'product-details';
});

const isAdmin = computed(() => {
  return authStore.keycloak.hasRealmRole('admin');
});

const possibleAlternativeProducts = ref<ProductSchema[]>([]);

async function addAlternative(alternativeId: Product["id"]) {
  const res = await sendRequest({
    path: '/product/alternative',
    method: 'POST',
    body: {
      productId: props.product.id,
      alternativeId: alternativeId, limit: 100
    }
  })
  if (!res.ok) {
    console.error('Failed to add alternative:', res.statusText);
    return;
  }
  const response = await res.json();
  props.product.alternatives.push(response.alternatives.find((product: Product) => product.id === alternativeId));
  possibleAlternativeProducts.value = possibleAlternativeProducts.value.filter((product) => product.id !== alternativeId);
}

async function deleteAlternative(alternativeId: Product["id"]) {
  const alternative = props.product.alternatives.find((product) => product.id === alternativeId);
  if (!alternative) {
    console.error('Alternative not found:', alternativeId);
    return;
  }
  const res = await sendRequest({
    path: '/product/alternative',
    method: 'DELETE',
    body: {
      productId: props.product.id,
      alternativeId: alternativeId
    }
  })
  if (!res.ok) {
    console.error('Failed to delete alternative:', res.statusText);
    return;
  }
  const response = await res.json();
  props.product.alternatives = props.product.alternatives.filter((product) => product.id !== alternativeId);
  possibleAlternativeProducts.value.push(alternative);
}

onMounted(async () => {
  possibleAlternativeProducts.value = (await sendRequest({
    path: '/product',
    method: 'GET',
    body: { limit: 100 },
  }).then((res) => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }).catch((error) => {
    console.error('Failed to fetch products:', error);
    return [];
  })).filter((product: Product) => {
    return product.id !== props.product.id && !props.product.alternatives.some((alt) => alt.id === product.id);
  });
}
)
</script>

<template>
  <v-card border flat>
    <v-list-item v-if="inDetailsPage" :style="{ padding: 0 }">
      <v-card-title>
        {{ product.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ product.description }}
      </v-card-subtitle>
    </v-list-item>
    <v-list-item v-else @click="$router.push({ name: 'product-details', query: { id: product.id } })" v-ripple
      :style="{ cursor: inDetailsPage || props.disableLink ? 'default' : 'pointer', padding: 0 }"
      :disabled="props.disableLink">
      <v-card-title>
        {{ product.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ product.description }}
      </v-card-subtitle>
    </v-list-item>
    <div class="d-flex py-3 gap-px flex-wrap">
      <v-list-item density="compact" prepend-icon="mdi-cash" title="Price">
        <v-list-item-subtitle v-if="product.price !== null && product.price !== undefined">
          €{{ product.price }}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-else class="font-italic">None</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-weight-kilogram" title="Weight">
        <v-list-item-subtitle v-if="product.weight !== null && product.weight !== undefined">
          {{ product.weight }} kg
        </v-list-item-subtitle>
        <v-list-item-subtitle v-else class="font-italic">None</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-earth" title="Environmental footprint">
        <v-list-item-subtitle v-if="product.EF !== null && product.EF !== undefined">
          {{ product.EF }}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-else class="font-italic">None</v-list-item-subtitle>
      </v-list-item>
    </div>
    <div>
      <v-divider></v-divider>
      <v-card-subtitle class="pt-3">Alternatives</v-card-subtitle>
      <v-list v-if="product.alternatives.length" class="w-full" two-line>
        <v-menu v-for="alternative in product.alternatives" :key="alternative.id">
          <template v-slot:activator="{ props: menu }">
            <v-list-item @click.left="$router.push({ path: '/product', query: { id: alternative.id } })"
              @click.right.prevent="menu.onClick" :disabled="props.disableLink">
              <v-list-item-title>{{ alternative.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ alternative.description }}</v-list-item-subtitle>
            </v-list-item>
          </template>
          <v-list class="py-0">
            <v-list-item v-if="inDetailsPage && isAdmin" @click="deleteAlternative(alternative.id)">
              <v-list-item-title class="text-error">Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
      <v-card-text v-else>No alternatives available</v-card-text>
      <v-list>
        <v-list-group v-if="inDetailsPage && isAdmin" value="Add alternatives">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Add alternatives"></v-list-item>
          </template>
          <v-list-item v-for="product in possibleAlternativeProducts" @click="addAlternative(product.id)">
            <v-list-item-title>{{ product.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ product.description }}</v-list-item-subtitle>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <template v-if="!props.hideActions">
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end">
        <v-btn v-if="goBack" color="secondary" variant="tonal" @click="goBack">Back</v-btn>
        <!-- <v-btn color="primary">Edit</v-btn>
        <v-btn color="error">Delete</v-btn> -->
        <v-btn v-if="product.alternatives.length" color="primary" variant="flat" @click="() => {

          $router.push({ name: 'assessmentsCreate', query: { productId: product.id } })
        }">Start Assessment</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>
