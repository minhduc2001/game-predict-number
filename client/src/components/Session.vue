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
            <th class="text-center text-sm">{{ `#536522` }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-sm">Thời gian</td>
            <td class="text-center text-sm"><Timer></Timer></td>
          </tr>
          <tr>
            <td class="text-sm">Xu đặt ván này</td>
            <td class="text-center text-sm">85246</td>
          </tr>
          <tr>
            <td class="text-sm">Xu đặt ván trước</td>
            <td class="text-center text-sm">5985623</td>
          </tr>
          <tr>
            <td class="text-sm">Số tỉ lệ thắng</td>
            <td class="text-center text-sm">1.5154%</td>
          </tr>
          <tr>
            <td class="text-sm">Số ngẫu nhiên</td>
            <td class="text-center text-sm">
              <div class="flex items-center justify-center">
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
            <td class="text-center text-sm">265665656</td>
          </tr>
          <tr>
            <td class="text-sm">Kết quả cộng</td>
            <td class="text-center text-sm">6+3+4+6+8=23</td>
          </tr>
          <tr>
            <td class="text-sm">Kết quả</td>
            <td class="text-center text-sm">6+3+4+6+8=23</td>
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
                >{{ value % 2 === 0 ? "X" : "T" }}</Tags
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
import Timer from "./Timer.vue";
import Random from "./Random.vue";
import Tags from "./Tags.vue";
export default {
  props: [],
  components: { Random, Timer, Tags },
  data() {
    return {
      parity: [1, 1, 1, 2, 1, 2, 2, 1, 2],
      talent: [3, 4, 4, 3, 4, 4, 3, 3, 3],
    };
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
