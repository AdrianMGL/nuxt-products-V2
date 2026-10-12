<script setup lang="ts">
withDefaults(defineProps<{
  products: Product[];
  priorityFirstImage?: boolean;
}>(), {
  priorityFirstImage: false,
});
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :priority="priorityFirstImage && index === 0"
    />
  </div>
</template>