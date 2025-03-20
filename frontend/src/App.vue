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
    icon: 'mdi-home',
  },
  {
    title: 'Survey',
    url: '/survey',
    icon: 'mdi-clipboard-text',
  },
  {
    title: 'Alternatives',
    url: '/alternatives',
    icon: 'mdi-clipboard-text',
  },
]

const drawer = ref(false)
const logginInLoader = ref(false)
const group = ref<string | null>(null)

watch(group, () => {
  drawer.value = false
})
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" :disabled="!authStore.isLoggedIn" />

        <img src="@/assets/img/logo.png" alt="logo" class="logo" />

        <v-spacer></v-spacer>

        <profile-menu :disabled="!authStore.isLoggedIn"/>
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
        <RouterView v-else-if="authStore.isLoggedIn" />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.logo {
  height: 58px;
  /* Make non transparent pixels white */
  filter: brightness(0) invert(1);
  user-select: none;
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
