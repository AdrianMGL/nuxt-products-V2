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


<style>
div .count {
  display: flex;
  gap: 5px;
}

/*
body {
  background-color: #020420;
  font-family: 'Roboto', sans-serif;
  color: #fff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #00dc82;
}
*/
</style>