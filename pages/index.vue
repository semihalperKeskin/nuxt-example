<script setup>
const searchInput = ref("");

const resultMovie = ref([]);

const config = useRuntimeConfig();

const { data, execute } = await useAsyncData("/", () => {
  return $fetch(
    `http://www.omdbapi.com/?apikey=${config.public.API_KEY}&s=${searchInput.value}`
  );
});

const result = ref(false);

const formSearch = async () => {
  await execute();

  if (data.value && data.value.Response === "True") {
    result.value = true;
    return (resultMovie.value = data.value.Search);
  } else {
    return (resultMovie.value = []);
  }
};

const back = () => {
  result.value = false;
  searchInput.value = "";
};
</script>

<template>
  <div
    v-if="!result"
    class="justify-center text-center flex h-[800px] items-center"
  >
    <form class="" @submit.prevent="formSearch">
      <h1 class="text-3xl">Search Movie</h1>
      <input
        class="border-2 rounded-full w-72 pl-3 pr-3"
        type="text"
        placeholder="Search Movie"
        v-model="searchInput"
      />
    </form>
  </div>
  <div v-else class="block">

    <button type="button" class="flex mt-2 ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    @click="back">Back</button>

    <div v-for="item in resultMovie" class="movie-poster inline-block">
      <NuxtLink :to="{ name: 'movie-id', params: { id: item.imdbID } }">
        <div
          class="max-w-sm m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img class="rounded-t-lg w-full" :src="item.Poster" :alt="item.Title" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5
                class="mb-2 text-2xl truncate font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ item.Title }}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div></div
      ></NuxtLink>
    </div>
  </div>
</template>
