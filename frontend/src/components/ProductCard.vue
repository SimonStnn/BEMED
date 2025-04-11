<script lang="ts" setup>
import type ProductSchema from '@/schemas/product';

export type Product = ProductSchema & {
  alternatives: ProductSchema[];
};

const props = defineProps<{
  product: Product;
  goBack: () => void | undefined;
}>();

</script>

<template>
  <v-card border flat>
    <v-card-title>{{ product.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ product.description }}
    </v-card-subtitle>
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
        <v-list-item v-for="alternative in product.alternatives" :key="alternative.id" class="d-flex gap-2 w-full"
          @click="$router.push({ path: '/product', query: { id: alternative.id } })">
          <v-list-item-title>{{ alternative.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ alternative.description }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-card-text v-else>No alternatives available</v-card-text>
    </div>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">
      <v-btn v-if="goBack" color="secondary" variant="tonal" @click="goBack">Back</v-btn>
      <!-- <v-btn color="primary">Edit</v-btn>
        <v-btn color="error">Delete</v-btn> -->
      <v-btn v-if="product.alternatives.length" color="primary" variant="flat"
        @click="$router.push({ name: 'products' })">Choose Alternative</v-btn>
    </v-card-actions>
  </v-card>
</template>
