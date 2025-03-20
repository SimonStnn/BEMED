<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import { getAPIUrl } from '@/utils';

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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

function sendRequest(event: SubmitEvent) {
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

  console.log("data:", data);

  let url = getAPIUrl(props.action);
  let options: RequestInit = {
    method: props.method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  };

  // Add query parameters to the URL if the method is GET else add the data to the body
  if (props.method === "GET") {
    const queryParams = new URLSearchParams(data).toString();
    url += `?${queryParams}`;
  } else {
    options.body = JSON.stringify(data);
  }

  fetch(url, options)
    .then(response => response.json())
    .then(props.onSuccess)
    .catch((error) => {
      console.error('Error:', error);
    });
}
</script>

<template>
  <v-form @submit="sendRequest">
    <slot></slot>
  </v-form>
</template>

<style scoped>

</style>