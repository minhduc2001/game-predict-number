<template>
  <v-btn :color="color">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: ["color"],
};
</script>
