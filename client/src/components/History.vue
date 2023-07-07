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
      <tr v-if="listData" v-for="(data, index) in listData">
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-red-500 uppercase py-[3px] font-bold"
            >Thường</Tags
          >
        </td>
        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            >{{ `HaNoi` }}</Tags
          >
        </td>
        <td class="text-center">
          {{ data.user.username }}
        </td>

        <td class="text-center">{{ data.xu_dat }} Xu</td>

        <td class="text-center">
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            :style="`background-color:${
              formatSelection(data.selection)?.color
            };`"
            >{{ formatSelection(data.selection)?.text }}</Tags
          >
        </td>
        <td class="text-center" v-if="data.status == 0">
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            color="#22c55e"
          ></v-progress-circular>
        </td>
        <td class="text-center" v-else>
          <Tags
            class="text-white text-xs rounded bg-yellow-400 py-[3px] font-bold"
            :style="`background-color:${
              data.status == 1 ? '#d9534f' : '#5cb85c'
            };`"
            >{{ data.status == 1 ? "Thua" : "Đã nhận thưởng" }}</Tags
          >
        </td>
        <td v-if="data.xu_an == null" class="text-center">
          <v-progress-circular
            indeterminate
            color="#2dd4bf"
            size="20"
            width="2"
          ></v-progress-circular>
        </td>
        <td v-else class="text-center">{{ data.xu_an }} Xu</td>

        <td class="text-center">
          {{ formatDate(data.createdAt) }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import Table from "./Table.vue";
import Tags from "./Tags.vue";
import moment from "moment";
export default {
  props: [],
  components: { Table, Tags },
  computed: {
    listData() {
      return this.$store.state.transaction.data;
    },
  },
  mounted() {
    this.getDataTable();
  },
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
      socket: {
        type: Object,
        required: true,
      },
    };
  },
  methods: {
    getDataTable() {
      this.$store.dispatch("transaction/getData", { limit: 10 });
    },
    formatDate(date) {
      return moment(date).format("hh:mm:ss a DD/MM/YYYY");
    },
    formatSelection(select) {
      if (select == 0)
        return {
          color: "#f0ad4e",
          text: "Chẵn",
        };

      if (select == 1)
        return {
          color: "#5bc0de",
          text: "Lẻ",
        };

      if (select == 2)
        return {
          color: "#5cb85c",
          text: "Tài",
        };

      if (select == 3)
        return {
          color: "#d9534f",
          text: "Xỉu",
        };
    },
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
