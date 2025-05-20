<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import ProfileMenu from '@/components/ProfileMenu.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.login()

const items: { title: string, url: string, icon: string }[] = [
  {
    title: 'Home',
    url: '/',
    icon: 'mdi-home-outline',
  },
  {
    title: "Products",
    url: '/products',
    icon: 'mdi-archive-outline',
  },
  {
    title: 'Step 1 - Basic Info',
    url: '/survey',
    icon: 'mdi-file-document-edit',
  },
  {
    title: 'Step 3 - Alternatives',
    url: '/alternatives',
    icon: 'mdi-file-arrow-left-right',
  },
  {
    title: 'Assessments',
    url: '/assessments',
    icon: 'mdi-file-chart-check',
  },
]

const drawer = ref(true)
const logginInLoader = ref(false)
const group = ref<string | null>(null)

watch(group, () => {
  drawer.value = false
})
</script>

<template>
  <v-layout style="min-height: 100%;">
    <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" :disabled="!authStore.isLoggedIn" />
        <RouterLink to="/" class="nav-title" style="text-decoration: none; color: white;">
          <img src="@/assets/img/lockup.png" alt="logo" class="logo"/>
        </RouterLink>
        <v-spacer></v-spacer>

        <span v-if="authStore.isLoggedIn">
          {{ authStore.userInfo?.preferred_username }}
        </span>

        <profile-menu :disabled="!authStore.isLoggedIn" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <RouterLink v-for="item in items" :key="item.url" class="v-list-item router-link" :to="item.url">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <!-- Login error -->
      <v-container v-if="authStore.errorCode !== null">
        <v-row justify="center" align="center" style="height: 100vh; flex-direction: column;">
          <v-btn color="primary" :loading="logginInLoader" @click="() => {
            logginInLoader = true
            return authStore.logout()
          }">Logout</v-btn>
          <p style="margin-top: .5rem;">Something went wrong</p>
        </v-row>
      </v-container>
      <!-- While login is loading -->
      <v-container v-else-if="authStore.isLoggedIn === null">
        <v-row justify="center" align="center" style="height: 100vh; flex-direction: column;">
          <v-progress-circular indeterminate color="primary" />
          <p>Logging in...</p>
        </v-row>
      </v-container>
      <!-- If user isn't logged in correctly -->
      <v-container v-else-if="!authStore.isLoggedIn">
        <v-row justify="center" align="center" style="height: 100vh; flex-direction: column;">
          <v-btn color="primary" :loading="logginInLoader" @click="() => {
            logginInLoader = true
            return authStore.login()
          }">Login</v-btn>
          <p style="margin-top: .5rem;">Please login to access the content</p>
        </v-row>
      </v-container>
      <!-- If user is logged in; show main content -->
      <v-container v-else-if="authStore.isLoggedIn" style="min-height: 100%;">
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
.logo {
  height: 90px;
  /* Make non transparent pixels white */
  filter: brightness(0) invert(1);
  user-select: none;
  padding-top: 15px;
  padding-bottom: 10px;
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

.nav-title {
  font-family: 'Dosis', 'Helvetica', 'Arial', 'Lucida', 'sans-serif';
  font-weight: bold;
}
</style>
