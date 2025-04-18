# Frontend Documentation

## Overview

The BEMED frontend is built with Vue.js 3 using the Composition API, TypeScript for type safety, and Vuetify for UI components. The application provides interfaces for users to assess their waste management practices, explore environmentally friendly alternatives to single-use products, and track their environmental impact.

## Architecture

The frontend follows Vue's recommended file structure:

- **assets**: Static resources like images and CSS
- **components**: Reusable Vue components
- **plugins**: Vue plugins configuration (Vuetify)
- **router**: Vue Router configuration
- **stores**: Pinia stores for state management
- **utils**: Helper functions and utilities
- **views**: Page components

## Views

### HomeView

The home page introduces users to BEMED's zero waste mission with information about the organization's goals and the ecological transition.

```vue
<template>
  <v-card class="home-card">
    <v-card-title>
      <h4 class="title">BEMED - Zero Waste</h4>
      <h1 class="headline">To change the way Montenegro tackles waste</h1>
    </v-card-title>
    <v-card-text class="home-content">
      <!-- Content about the mission -->
    </v-card-text>
  </v-card>
</template>
```

### SurveyView

The survey page contains a comprehensive questionnaire about waste management practices. It includes multiple types of questions:

1. **Multiple Choice Questions**: For yes/no/don't know responses
2. **Numeric Input Questions**: For quantitative data like collected waste in kilograms

```vue
<template>
  <!-- Survey form with various question types -->
  <v-radio-group v-model="formData.questions[2]" class="survey-field" name="q2" required>
    <p class="question-label">Does your institution have special bins or containers for separate waste collection?</p>
    <v-radio label="Yes" value="Yes"></v-radio>
    <v-radio label="No" value="No"></v-radio>
    <v-radio label="I don't know" value="I don't know"></v-radio>
  </v-radio-group>

  <div class="survey-field">
    <p class="num-question-label">How much single-use plastic packaging has your institution collected since the beginning of the year? Approximation in KG</p>
    <v-text-field v-model.number="formData.questions[5]" type="number" label="Q5" name="q5" required></v-text-field>
  </div>
</template>
```

### AlternativesView

The alternatives page displays environmentally friendly alternatives to single-use products, allowing users to compare options based on their Environmental Footprint Index (EFI).

```vue
<template>
  <v-card class="survey-card">
    <v-card-title class="title">
      <span class="headline">Plastic Alternatives Survey Page</span>
      <p class="efi-explanation">EFI means Environmental Footprint Index</p>
    </v-card-title>
    <v-card-text class="survey-content">
      <!-- Alternative products display -->
    </v-card-text>
  </v-card>
</template>
```

## Components

### ApiForm

A reusable form component that handles API interactions, providing consistent error handling and loading states.

**Props:**
- `action`: API endpoint to call
- `method`: HTTP method (GET, POST, etc.)
- `body`: Request payload

**Events:**
- `success`: Emitted when the API call succeeds
- `error`: Emitted when the API call fails

### ProfileMenu

A component for displaying user information and providing authentication-related actions such as login and logout.

**Features:**
- User profile display
- Authentication status
- Login/logout functionality

## State Management

The frontend uses Pinia for state management. The main store is the Auth store, which handles user authentication.

### Auth Store

```typescript
// Sample Auth store implementation
const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: null,
    isAuthenticated: false,
  }),
  actions: {
    async login() {
      // Authentication logic
    },
    async logout() {
      // Logout logic
    },
  },
});
```

## Styling

The application uses Vuetify's Material Design components with a custom theme:

```typescript
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#2f5a9a",
          secondary: "#8ed1fc",
        },
      },
      dark: {
        colors: {
          primary: "#BB86FC",
          secondary: "#03DAC6",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
```

## API Integration

The frontend communicates with the backend API using utility functions that handle authentication and error handling:

```typescript
// Utility function to generate API URLs
export function getAPIUrl(path?: string): string {
  return joinPaths(url.backend.toString(), path || "");
}
```

## Routing

The application uses Vue Router for navigation between views:

```typescript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/survey',
      name: 'survey',
      component: SurveyView,
    },
    {
      path: '/alternatives',
      name: 'alternatives',
      component: AlternativesView,
    }
  ],
})
```

## Environment Configuration

The frontend uses environment variables for configuration, which are loaded during the build process:

```
KEYCLOAK_REALM=BEMED
KEYCLOAK_FRONTEND_CLIENT_ID=frontend
KEYCLOAK_CLIENT_SECRET=your_client_secret
BEMED_DOMAIN=localhost
DNS_PREFIX_KEYCLOAK=keycloak
DNS_PREFIX_BEMED_BACKEND=api
BEMED_PROTOCOL=http
```

These variables are used to configure API endpoints and authentication settings.