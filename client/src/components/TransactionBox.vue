<template>
  <div class="dev flex w-1/2 justify-center items-center rounded border-0">
    <div
      class="flex w-5/6 items-center border-2 border-orange-700 rounded flex-col h-[437.500px]"
    >
      <div class="flex justify-center w-[99.9%] rounded h-[40px] bg-orange-700">
        <div class="flex justify-between items-center w-5/6">
          <div class="text-overline text-white">GAME</div>
          <div class="text-overline text-white">XÈNG</div>
        </div>
      </div>

      <div
        class="flex w-[95%] items-center justify-center rounded flex-col bg-red-200 my-[15px]"
      >
        <p class="text-red-500 my-3">Hãy đăng nhập để có thể đặt cược nhé</p>
        <Button class="mb-3" size="small" color="red"> Đăng nhập </Button>
      </div>
      <div class="w-[95%]">
        <v-text-field
          solo
          heigth="30px"
          label="Số xu đặt"
          variant="outlined"
          v-model="coin"
          disabled
        ></v-text-field>
      </div>
      <div class="group-button flex flex-wrap w-[80%] justify-between">
        <Button class="m-5 w-[100px] text-white" color="#f0ad4e" disabled
          >Đặt Chẵn</Button
        >
        <Button class="m-5 w-[100px] text-white" color="#5bc0de" disabled
          >Đặt Lẻ</Button
        >
        <Button class="m-5 w-[100px] text-white" color="#5cb85c" disabled
          >Đặt Tài</Button
        >
        <Button class="m-5 w-[100px] text-white" color="#d9534f" disabled
          >Đặt Xỉu</Button
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
  props: [],
  components: { Table, Random, Button },
  data() {
    return {
      coin: null,
      loginSvg,
      totalTime: 120,
      timer: 120,
      cols: ["Mã phiên", "#536522"],
      data: [
        {
          name: "Thời gian",
          value: Random,
        },
      ],
    };
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
