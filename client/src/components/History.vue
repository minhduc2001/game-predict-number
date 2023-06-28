<template>
  <v-table class="w-full">
    <thead>
      <tr class="bg-orange-500">
        <th
          class="text-white border text-center"
          v-for="(col, index) in cols"
          :key="index"
        >
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-red-500 uppercase py-[3px] font-bold"
            >Thường</Tags
          >
        </td>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >Katana</Tags
          >
        </td>
        <td class="text-center">
          {{ `anhyeuem` }}
        </td>

        <td class="text-center">
          {{ `10000000xu` }}
        </td>

        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >Chẵn</Tags
          >
        </td>
        <td class="text-center">
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            color="#22c55e"
          ></v-progress-circular>
        </td>
        <td class="text-center">
          <v-progress-circular
            indeterminate
            color="#2dd4bf"
            size="20"
            width="2"
          ></v-progress-circular>
        </td>

        <td class="text-center">
          {{ new Date().getDate() }}
        </td>
      </tr>
      <tr>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-red-500 uppercase py-[3px] font-bold"
            >Thường</Tags
          >
        </td>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >Katana</Tags
          >
        </td>
        <td class="text-center">
          {{ `anhyeuem` }}
        </td>

        <td class="text-center">
          {{ `10000000xu` }}
        </td>

        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >Chẵn</Tags
          >
        </td>
        <td class="text-center">
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            color="#22c55e"
          ></v-progress-circular>
        </td>
        <td class="text-center">
          <v-progress-circular
            indeterminate
            color="#2dd4bf"
            size="20"
            width="2"
          ></v-progress-circular>
        </td>

        <td class="text-center">
          {{ new Date().getDate() }}
        </td>
      </tr>
      <tr>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-red-500 uppercase py-[3px] font-bold"
            >Thường</Tags
          >
        </td>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >Katana</Tags
          >
        </td>
        <td class="text-center">
          {{ `anhyeuem` }}
        </td>

        <td class="text-center">
          {{ `10000000xu` }}
        </td>

        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >Chẵn</Tags
          >
        </td>
        <td class="text-center">
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            color="#22c55e"
          ></v-progress-circular>
        </td>
        <td class="text-center">
          <v-progress-circular
            indeterminate
            color="#2dd4bf"
            size="20"
            width="2"
          ></v-progress-circular>
        </td>

        <td class="text-center">
          {{ new Date().getDate() }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import Table from "./Table.vue";
import Tags from "./Tags.vue";
export default {
  props: [],
  components: { Table, Tags },
  data() {
    return {
      totalTime: 120,
      timer: 120,
      cols: [
        "VXMM",
        "Máy chủ",
        "Nhân vật",
        "Xu đặt",
        "Đặt",
        "Trạng thái",
        "Xu ăn",
        "Thời gian",
      ],
    };
  },
};
</script>

<style scoped>
.v-table--density-default > .v-table__wrapper > table > tbody > tr > td {
  height: calc(var(--v-table-row-height, 35px) + 0px);
}

.v-table {
  --v-table-header-height: 40px;
  border-radius: inherit;
  line-height: 1.5;
  max-width: 100%;
}
</style>
