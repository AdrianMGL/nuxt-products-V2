<script setup lang="ts">


useSeoMeta({
  title: 'Products | Mi tienda de servicios',
  description: 'Here are our products!',
  ogTitle: 'Products | Mi tienda de servicios',
  ogDescription: 'Here are our products!',
  // ogImage: '/images/og-image.png',
  ogType: 'website',
  // ogUrl: 'https://www.mitiendadeservicios.com/products',
  // twitterCard: 'summary_large_image',
  twitterTitle: 'Products | Mi tienda de servicios',
  twitterDescription: 'Here are our products!',
  // twitterImage: '/images/twitter-image.png',
});

// throw new Error('test error');

/*
throw createError({
  statusCode: 500,
  statusMessage: 'Internal Server Error',
  data: {
    myCustomField: true,
    myOtherField: 'Hello World',
  },
})
*/

</script>

<template>
  <div>
    <h1>Products</h1>
    <p>Here are our products!</p>
    
    <div class="w-md flex justify-around items-center mt-10">
      <u-button label="primary" color="primary" />
      <u-button label="secondary" color="secondary" />
    </div>
  </div>
</template>

<style scoped></style>
