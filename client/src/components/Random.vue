<template>
  <div class="flex items-center justify-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    <span class="ml-4 text-gray-500"> Hiển thị 15s cuối</span>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      timer: 120,
    };
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer() {
      clearInterval(this.timer);
      this.totalTime = 20 * 60;
      this.resetButton = false;
      this.timer = null;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      this.totalTime--;
    },
  },
};
</script>
