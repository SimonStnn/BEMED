<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import { sendRequest, type Method } from '@/apiController';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  method: {
    type: String as PropType<Method>,
    required: true,
  },
  onSuccess: {
    type: Function as PropType<(data: any) => void>,
    default: () => { },
  },
});

function submitForm(event: SubmitEvent) {
  event.preventDefault();

  const form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }
  const formData = new FormData(form);
  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });


  sendRequest({
    path: props.action,
    method: props.method,
    body: data,
  }).then(props.onSuccess).catch((error) => {
    console.error('Error submitting form:', error);
    // TODO: Handle error (e.g., show a notification)
  });
}
</script>

<template>
  <v-form @submit="submitForm">
    <slot></slot>
  </v-form>
</template>

<style scoped></style>