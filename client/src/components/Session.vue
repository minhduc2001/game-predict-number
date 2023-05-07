<template>
  <div class="dev flex w-1/2 justify-center items-center rounded border-0">
    <div
      class="flex w-5/6 justify-center items-center border-2 border-blue-500 rounded flex-col"
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
            <th>Mã phiên</th>
            <th class="text-center">{{ `#536522` }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td v-for="(val, index1) in Object.keys(item)" :key="index1">
              <component
                v-if="typeof item[val] === 'object'"
                :is="item[val]"
              ></component>
              <template v-else>
                {{ item[val] }}
              </template>
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
export default {
  props: [],
  components: { Random, Timer },
  data() {
    return {
      totalTime: 120,
      timer: 120,
      cols: ["Mã phiên", "#536522"],
      data: [
        {
          name: "Thời gian",
          value: Timer,
        },
      ],
    };
  },
};
</script>
