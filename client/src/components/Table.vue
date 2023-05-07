<template>
  <v-table>
    <thead>
      <tr class="bg-orange-500 color-white">
        <th
          :class="`${customClass} border`"
          v-for="(col, index) in cols"
          :key="index"
        >
          {{ col }}
        </th>
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
</template>

<script>
export default {
  props: ["cols", "data", "customClass"],
  created() {
    this.parseData();
  },
  methods: {
    parseData() {
      if (typeof this.cols === "string") this.cols = JSON.parse(this.cols);
    },
  },
};
</script>
