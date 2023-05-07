<template>
  <Table
    :cols="cols"
    :data="data"
    class="w-full"
    customClass="text-center"
  ></Table>
</template>

<script>
import Table from "./Table.vue";
import Random from "./Random.vue";
export default {
  props: [],
  components: { Table, Random },
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
