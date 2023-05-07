<template>
  <span class="w-auto, h-auto">{{ text.toUppercase() }}</span>
</template>

<script>
export default {
  props: ["text"],
};
</script>
