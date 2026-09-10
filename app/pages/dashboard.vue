<script setup>

definePageMeta({
  layout: 'dashboard-layout',
  title: 'Dashboard',
  meta: [
    {
      name: 'description',
      content: 'This is the dashboard page of our Nuxt 2 application.',
    },
  ],
});

</script>

<template>
    <div>
        <h2>hola desde dashboard page</h2>
        <p>Welcome to your dashboard page!</p>
        <NuxtPage />
    </div>
</template>