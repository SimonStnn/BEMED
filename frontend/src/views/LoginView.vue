  <template>
  <v-container class="login">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Login Page</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');

    const login = () => {
      // Implement your login logic here
      authStore.login();
    };

    return {
      username,
      password,
      login
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>