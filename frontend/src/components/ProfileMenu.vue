<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, type ComputedRef } from 'vue'

const authStore = useAuthStore()

const items: ComputedRef<{
    title: string,
    onClick?: () => void,
}[]> = computed(() => [
    {
        title: 'Profile',
        onClick: authStore.keycloak.accountManagement
    },
    {
        title: 'Settings'
    },
    // Dynamic login/logout button
    (authStore.isLoggedIn) ?
        {
            title: 'Logout',
            onClick: authStore.logout
        }
        :
        {
            title: 'Login',
            onClick: authStore.login
        }
])

</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn icon="mdi-account" variant="text" v-bind="props" />
        </template>
        <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" :onclick="item.onClick">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>