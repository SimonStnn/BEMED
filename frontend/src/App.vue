<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ref, watch } from 'vue'

const items: { title: string, url: string, icon: string }[] = [
  {
    title: 'Home',
    url: '/',
    icon: 'mdi-home',
  },
  {
    title: 'Login',
    url: '/login',
    icon: 'mdi-login',
  },
  {
    title: 'Survey',
    url: '/survey',
    icon: 'mdi-clipboard-text',
  },
]

const drawer = ref(false)
const group = ref<string | null>(null)

watch(group, () => {
  drawer.value = false
})
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <img src="@/assets/img/logo.png" alt="Vue.js logo" class="logo" />
        <v-toolbar-title> Home </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-account" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list>
          <RouterLink v-for="item in items" :key="item.url" class="v-list-item router-link" :to="item.url">
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </RouterLink>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100dvh;">
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.logo {
  height: 58px;
  /* Make non transparent pixels white */
  filter: brightness(0) invert(1);
}

.router-link {
  display: flex;
  gap: 1em;
  align-items: center;
  text-decoration: none;
  color: inherit;
  /* padding: inherit 10em; */
  height: 3rem;
}

.router-link:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
