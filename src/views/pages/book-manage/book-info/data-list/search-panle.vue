<template>
  <a-form :label-col="{ flex: '100px' }">
    <a-row>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="题名">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="作者">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col v-show="IsOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="出版社">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col v-show="IsOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="学科类别">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col v-show="IsOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="国际标准书号">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <div class="index-table-search-button">
          <a-button type="primary">
            查询
          </a-button>
          <a-button> 重置 </a-button>
          <a-button type="link" @click="handleOpen">
            {{ IsOpen ? "收起 " : "展开" }}
            <DownOutlined
              :class="['index-table-search-close']"
              :style="[
                'transition: all 0.3s ease 0s;',
                `transform: rotate(${IsOpen ? '0.5' : '0'}turn)`,
              ]"
            />
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { PagerQueryData } from "/@/lib/http/axios/types";
import { DownOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { DownOutlined },
  setup() {
    // 搜索是否展开
    const IsOpen = ref<boolean>(false);
    // 数据搜索
    const queryData = reactive<PagerQueryData>({
      pageSize: 10,
      page: 0,
      sorts: [],
    });
    // 返回查询条件
    // getPagerQueryData():PagerQueryData{
    //   return queryData
    // }

    // 处理展开
    function handleOpen() {
      IsOpen.value = !IsOpen.value;
    }

    return {
      IsOpen,
      queryData,
      handleOpen,
    };
  },
});
</script>


<style lang="less" scoped>
</style>