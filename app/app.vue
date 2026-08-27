<script lang="ts" setup>

const count = ref(10);
await sleep(2000);

count.value = 20;

</script>
<template>
  <div>
    <h1>Hola mundo</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At, nesciunt iure repudiandae consequatur, sit eius
      exercitationem, mollitia facere impedit fugiat debitis tempora distinctio architecto natus modi magnam minus
      asperiores consequuntur.
    </p>

    <h2>
      {{ count }}
    </h2>
    <div class="count">
      <button @click="count--">Click Me-- </button>
      <button @click="count++">Click Me++ </button>
    </div>

  </div>
</template>


<style scoped>
div .count {
  display: flex;
  /* align-items: center; */
  /* margin: 10px;
  padding: 10px; */
  gap: 5px;
}
</style>