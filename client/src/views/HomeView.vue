<script>
import Header from "../components/Header.vue";
import Button from "../components/Button.vue";
import Table from "../components/Table.vue";
import Session from "../components/Session.vue";
import TransactionBox from "../components/TransactionBox.vue";
import History from "../components/History.vue";
export default {
  components: { Header, Button, Table, Session, TransactionBox, History },
  data() {
    return {
      disabledInput: false,
      socket: null,
      reload: null,
    };
  },
  mounted() {
    this.socket = this.$refs.session.socket;
  },
};
</script>

<template>
  <Header></Header>
  <div
    class="mx-auto flex flex-wrap max-w-7xl items-center justify-between p-6 lg:px-8"
  >
    <Session :disabledInput="disabledInput" :socket="socket" ref="session" />
    <TransactionBox :disabledInput="disabledInput" :socket="socket" />
  </div>
  <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <History :reload="reload"></History>
  </div>
</template>

/* x-small, small, default, large, and x-large. */
