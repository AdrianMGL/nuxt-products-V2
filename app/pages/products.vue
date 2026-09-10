<script setup lang="ts">

// throw new Error('test error');

throw createError({
  statusCode: 500,
  statusMessage: 'Internal Server Error',
  data: {
    myCustomField: true,
    myOtherField: 'Hello World',
  },
})

</script>

<template>
  <div>
    Page: products
  </div>
</template>

<style scoped></style>
