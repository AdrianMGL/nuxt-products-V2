<script setup lang="ts">

    const route = useRoute();

    //variables
    const rawId = route.params.id as string;

</script>


<template>

    <h1> Product admin Page </h1> 
    <h2>{{ rawId }}</h2>

</template>