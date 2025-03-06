<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue';

function onSuccess(data: any) {
  console.log(data);
}

</script>

<template>
  <v-container class="login">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Login Page</span>
          </v-card-title>
          <v-card-text>
            <api-form action="/login" method="POST" v-on:success="onSuccess">
              <v-text-field label="Username" name="username" required></v-text-field>
              <v-text-field label="Password" name="password" type="password" required></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </api-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

</script>

<style scoped></style>