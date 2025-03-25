<template>
  <main :class="['taskify-main', theme === 'light' ? 'light' : 'dark']">
    <Snackbar />
    <Navbar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
  import Snackbar from './components/Snackbar.vue';
  import { useThemeStore } from './store/theme';
  
  const store = useThemeStore()
  const theme: string = store.theme;
</script>

<style scoped>
  .taskify-main {
    background-color: var(--background);
    min-height: 100vh;
    padding-bottom: 40px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>