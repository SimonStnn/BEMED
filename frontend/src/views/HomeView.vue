<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
console.log(authStore.userInfo);
</script>

<template>
  <main>
    <h1>Home</h1>
    <p>Welcome {{ authStore.userInfo?.preferred_username }}</p>
  </main>
</template>
