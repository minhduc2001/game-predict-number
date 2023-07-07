<template>
  <div class="dev flex w-1/2 justify-center items-center rounded border-0">
    <div
      class="flex w-5/6 justify-center items-center border-2 border-orange-700 rounded flex-col"
    >
      <div
        class="flex justify-center items-center w-[99.9%] rounded h-[40px] bg-orange-700"
      >
        <div class="flex justify-center items-center w-5/6">
          <div class="text-overline text-white">Thường</div>
        </div>
      </div>

      <v-table class="w-full mt-2">
        <thead>
          <tr>
            <th class="text-sm">Mã phiên</th>
            <th class="text-center text-sm">{{ `#${session?.phien}` }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-sm">Thời gian</td>
            <td class="text-center text-sm">
              <Timer :time="time"></Timer>
            </td>
          </tr>
          <tr>
            <td class="text-sm">Xu đặt ván này</td>
            <td class="text-center text-sm">{{ session?.coin }}</td>
          </tr>
          <tr>
            <td class="text-sm">Xu đặt ván trước</td>
            <td class="text-center text-sm">{{ session?.coinPrev }}</td>
          </tr>
          <tr>
            <td class="text-sm">Số tỉ lệ thắng</td>
            <td class="text-center text-sm">1.5154%</td>
          </tr>
          <tr>
            <td class="text-sm">Số ngẫu nhiên</td>
            <td class="text-center text-sm">
              <div
                v-if="session?.coinRandom"
                class="flex items-center justify-center"
              >
                <span class="ml-4 text-gray-500">
                  {{ session.coinRandom }}</span
                >
              </div>
              <div v-else class="flex items-center justify-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="20"
                  width="2"
                ></v-progress-circular>
                <span class="ml-4 text-gray-500"> Hiển thị 15s cuối</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="text-sm">Tổng</td>
            <td class="text-center text-sm">{{ session?.totalCoin }}</td>
          </tr>
          <tr>
            <td class="text-sm">Kết quả cộng</td>
            <td class="text-center text-sm">{{ totalAdd?.equation }}</td>
          </tr>
          <tr>
            <td class="text-sm">Kết quả</td>
            <td
              class="text-center text-sm text-center flex items-center justify-center"
            >
              <Tags
                class="m-1 rounded w-6 h-6 text-white text-xs flex items-center justify-center w-[40px] h-[20px]"
                :style="`background-color:${setResCl ? '#f0ad4e' : '#5bc0de'};`"
                >{{ setResCl ? "Chẵn" : "Lẻ" }}</Tags
              >
              <Tags
                class="m-1 rounded w-6 h-6 text-white text-xs flex items-center justify-center w-[40px] h-[20px]"
                :style="`background-color:${setResTx ? '#5cb85c' : '#d9534f'};`"
                >{{ setResTx ? "Tài" : "Xỉu" }}</Tags
              >
            </td>
          </tr>

          <tr>
            <td class="text-sm">CL</td>
            <td class="text-center flex items-center justify-center">
              <Tags
                v-for="(value, index) in parity"
                :key="index"
                class="m-1 rounded-full w-6 h-6 text-white text-xs flex items-center justify-center w-[15px] h-[15px]"
                :style="`background-color:${
                  value % 2 === 0 ? '#f0ad4e' : '#5bc0de'
                };`"
                >{{ value % 2 === 0 ? "C" : "L" }}</Tags
              >
            </td>
          </tr>
          <tr>
            <td class="text-sm">TX</td>
            <td class="text-center flex items-center justify-center">
              <Tags
                v-for="(value, index) in talent"
                :key="index"
                class="m-1 rounded-full w-6 h-6 text-white text-xs flex items-center justify-center w-[15px] h-[15px]"
                :style="`background-color:${
                  value % 2 === 0 ? '#5cb85c' : '#d9534f'
                };`"
                >{{ value % 2 === 0 ? "T" : "X" }}</Tags
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
import { baseUrlSocket } from "../services/api";
import Timer from "./Timer.vue";
import Random from "./Random.vue";
import Tags from "./Tags.vue";
import sessionService from "../services/session.service";
export default {
  props: [],
  components: { Tags, Random, Timer },
  data() {
    return {
      socket: null,
      time: null,
      phien: null,
      session: null,
      res_cl: null,
      res_tx: null,
      parity: [1, 1, 1, 2, 1, 2, 2, 1, 2],
      talent: [3, 4, 4, 3, 4, 4, 3, 3, 3],
    };
  },
  computed: {
    totalAdd() {
      const numbers = this.session?.totalCoin.split(""); // Chuyển chuỗi thành một mảng các số
      const sum = numbers?.reduce((acc, num) => acc + Number(num), 0); // Tính tổng các số

      const equation = numbers?.join(" + ") + " = " + sum;

      return { equation, sum };
    },
    setResTx() {
      if (this.totalAdd.sum % 10 >= 5) return true;
      return false;
    },
    setResCl() {
      if (this.totalAdd.sum % 2 == 0) return true;
      return false;
    },
  },
  mounted() {
    this.socket = io(baseUrlSocket);
    this.socket.on("countdown", (data) => {
      this.time = data;
    });
    this.socket.on("pending", () => {
      this.$store.dispatch("transaction/getDataOnPendding");
      this.$store.dispatch("auth/reloadUser");
      this.callCLTX();
    });

    this.socket.on("session", (data) => {
      // if (data == 15) this.$store.commit("session/disable");
      this.session = data;
    });
    this.callCLTX();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    callCLTX() {
      this.$store.dispatch("session/getCLTX").then((data) => {
        this.parity = data.cl;
        this.talent = data.tx;
      });
    },
  },
};
</script>

<style scoped>
.v-table--density-default > .v-table__wrapper > table > tbody > tr > td {
  height: calc(var(--v-table-row-height, 35px) + 0px);
}

.v-table {
  --v-table-header-height: 35px;
  border-radius: inherit;
  line-height: 1.5;
  max-width: 100%;
}
</style>
