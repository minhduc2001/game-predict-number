<template>
  <div>{{ formatTime(state.socketData) }}</div>
</template>

<script setup>
import { io } from "socket.io-client";
import { reactive, ref, watch, onMounted, onBeforeUnmount } from "vue";
import { baseUrl } from "../services/api";
const state = reactive({
  socket: null,
  dataSocket: null,
});

onMounted(() => {
  state.socket = io(baseUrl);

  state.socket.on("countdown", (data) => {
    console.log(data);
    state.socketData = data;
  });
});

onBeforeUnmount(() => {
  if (state.socket) {
    console.log("disconnect");
    state.socket.disconnect();
  }
});
function formatTime(time) {
  if (time == "000") return "PENDING";
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
</script>
