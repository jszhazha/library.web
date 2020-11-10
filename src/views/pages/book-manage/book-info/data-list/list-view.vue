<template>
  <div class="index-card">
    <global-tabel
      :columns="tablecolumns"
      :data-source="dataSource"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { tablecolumns } from "./list-data";

export default defineComponent({
  setup() {
    const dataSource = [];
    for (let i = 0; i < 20; i++) {
      dataSource.push({
        id: i,
        name: "深入浅出 Vue.js",
        code: "210-113-232",
        subjectCategory: i,
        isbn: "90-333",
        author: "张三",
        press: "人民邮电出版社",
        count: 20,
        number: 30,
      });
    }
    return { tablecolumns, dataSource };
  },
});
</script>


<style lang="less" scoped>
</style>