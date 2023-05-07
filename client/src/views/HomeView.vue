<script setup>
import Header from "../components/Header.vue";
import Button from "../components/Button.vue";
import Table from "../components/Table.vue";
import Session from "../components/Session.vue";
import TransactionBox from "../components/TransactionBox.vue";
import History from "../components/History.vue";
const cols = [
  "Mã phiên",
  "Thời gian",
  "Xu đặt ván này",
  "Xu đặt ván trước",
  "số tỉ lệ thắng",
  "Số ngẫu nhiên",
  "Tổng",
  "Kết quả tổng",
  "Kết quả",
  "CD",
  "TL",
];
</script>

<template>
  <Header></Header>
  <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <Session />
    <TransactionBox />
  </div>
  <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <History></History>
  </div>
</template>

/* x-small, small, default, large, and x-large. */
