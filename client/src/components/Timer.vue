<template>
  <div>{{ socketData }}</div>
  <button @click="sendEvent">Send Event</button>
</template>

<script setup>
import { io } from "socket.io-client";
import { ref, watch } from "vue";
const
</script>
