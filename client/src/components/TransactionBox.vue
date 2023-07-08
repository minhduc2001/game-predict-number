<template>
  <div class="dev flex w-1/2 justify-center items-center rounded border-0">
    <div
      class="flex w-5/6 items-center border-2 border-orange-700 rounded flex-col h-[437.500px]"
    >
      <div class="flex justify-center w-[99.9%] rounded h-[40px] bg-orange-700">
        <div class="flex justify-between items-center w-5/6">
          <div class="text-overline text-white">GAME</div>
          <div v-if="currentUser" class="text-overline text-white">
            Số dư: {{ currentUser.coin }} xu
          </div>
          <div v-else class="text-overline text-white">XÈNG</div>
        </div>
      </div>

      <div
        v-if="currentUser"
        class="flex w-[95%] items-center justify-center rounded flex-col bg-green-200 my-[15px]"
      >
        <p class="text-green-500 my-3">Nhập số tiền hoặc số xu muốn đặt</p>
      </div>
      <div
        v-else
        class="flex w-[95%] items-center justify-center rounded flex-col bg-red-200 my-[15px]"
      >
        <p class="text-red-500 my-3">Hãy đăng nhập để có thể đặt cược nhé</p>
        <Button class="mb-3" size="small" color="red" href="/login">
          Đăng nhập
        </Button>
      </div>
      <div class="w-[95%]">
        <v-text-field
          solo
          heigth="30px"
          label="Số xu đặt"
          variant="outlined"
          v-model="coin"
          :disabled="getDisableInput"
        ></v-text-field>
      </div>
      <div class="group-button flex flex-wrap w-[80%] justify-between">
        <Button
          class="m-5 w-[100px] text-white"
          color="#f0ad4e"
          :disabled="activeButton"
          @click="handleSetSelection(0)"
          >Đặt Chẵn</Button
        >
        <Button
          class="m-5 w-[100px] text-white"
          color="#5bc0de"
          :disabled="activeButton"
          @click="handleSetSelection(1)"
          >Đặt Lẻ</Button
        >
        <Button
          class="m-5 w-[100px] text-white"
          color="#5cb85c"
          :disabled="activeButton"
          @click="handleSetSelection(2)"
          >Đặt >=5
        </Button>
        <Button
          class="m-5 w-[100px] text-white"
          color="#d9534f"
          :disabled="activeButton"
          @click="handleSetSelection(3)"
          >Đặt &lt 5</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./Table.vue";
import Random from "./Random.vue";
import Button from "./Button.vue";
import loginSvg from "../assets/images/login.svg";
export default {
  components: { Table, Random, Button },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    getDisableInput() {
      if (this.currentUser) return false;
      return true;
      // return this.$store.state.session?.disabledInput;
    },
    activeButton() {
      if (
        this.currentUser &&
        this.coin &&
        /^\d+$/.test(this.coin) &&
        Number(this.currentUser.coin) >= Number(this.coin)
      )
        return false;
      return true;
    },
  },
  data() {
    return {
      coin: null,
      loginSvg,
    };
  },
  methods: {
    onSetSelection(number) {
      this.$store
        .dispatch("transaction/setSelection", {
          selection: number,
          xu_dat: this.coin,
          vxmm: 0,
          server: 0,
        })
        .then(() => this.$store.dispatch("transaction/emitClick"));
    },
    handleSetSelection(number) {
      this.onSetSelection(number);
      this.coin = null;
    },
  },
};
</script>

<style>
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
</style>
