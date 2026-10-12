<script setup lang="ts">
// throw new Error('Auxilio, esto no se puede hacer.');
// throw createError({
//   statusCode: 500,
//   statusMessage: 'No se puede dividir entre 0',
//   data: {
//     myCustomField: true,
//     myOtherField: 'Hola mundo',
//   },
// });


//
const { products, total, currentPage, perPage } = await usePaginatedProducts();

useHead(() => ({
  link: products.value?.[0]?.images[0]
    ? [{
        rel: 'preload',
        as: 'image',
        href: products.value[0].images[0],
        fetchpriority: 'high',
      }]
    : [],
}));

</script>

<template>
  <UPageCTA
    orientation="horizontal"
    title="Productos"
    description="Descubre nuestros productos y servicios."
  >
    <template #default>
      <div class="flex items-center justify-center">
        <UIcon name="i-lucide-box" :size="150" />
      </div>
    </template>
  </UPageCTA>

  <div class="mt-10" />

  <ProductsGrid :products="products || []" priority-first-image />

  <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />
</template>

<style scoped></style>