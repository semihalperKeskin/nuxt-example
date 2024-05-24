<script setup>
const route = useRoute();

const config = useRuntimeConfig();

const { data } = await useAsyncData(
  `/movie/${route.params.id}`,
  () => {
    return $fetch(`http://www.omdbapi.com/?apikey=${config.public.API_KEY}&i=${route.params.id}`);
  }
);
</script>


<template>
  <div>
    <div v-if="data && data.Response === 'True'">
      <h1 class="text-sm">{{ data.Title }}</h1>
      <img :src="data.Poster" :alt="data.Title" />
      <p>{{ data.Plot }}</p>
    </div>
  </div>
</template>