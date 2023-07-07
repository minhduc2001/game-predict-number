<template>
  <div>{{ time }}</div>
</template>

<script>
export default {
  props: ["time"],
  methods: {
    formatTime(time) {
      if (time == "000") return "PENDING";
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    },
  },
};
</script>
