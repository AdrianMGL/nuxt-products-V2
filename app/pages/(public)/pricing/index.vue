<script setup>

useSeoMeta({
  title: 'Pricing | Mi tienda de servicios',
  description: 'Check out our pricing options!',
  ogTitle: 'Pricing | Mi tienda de servicios',
  ogDescription: 'Check out our pricing options!',
//   ogImage: '/images/og-image.png',
  ogType: 'website',
//   ogUrl: 'https://www.mitiendadeservicios.com/pricing',
//   twitterCard: 'summary_large_image',
  twitterTitle: 'Pricing | Mi tienda de servicios',
  twitterDescription: 'Check out our pricing options!',
//   twitterImage: '/images/twitter-image.png',
});

</script>

<template>
  <UPageCTA
    orientation="horizontal"
    title="Información de precios"
    description="Descubre nuestros precios y planes."
  >
    <template #default>
      <div class="flex items-center justify-center">
        <UIcon name="i-simple-icons-nuxtdotjs" :size="150" />
      </div>
    </template>
  </UPageCTA>

  <div class="mt-10" />

  <PricingTable />

  <div class="mb-50" />

</template>