<template>
  <a-form>
    <a-row>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="题 名">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="国际标准书号">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <div class="index-table-search-button">
          <a-button type="primary">
            查询
          </a-button>
          <a-button>
            重置
          </a-button>
          <a-button type="link">
            展开
            <DownOutlined class="index-table-search-close" />
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PagerQueryData } from "/@/lib/http/axios/types";
import { DownOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components:{DownOutlined},
  setup() {
    // 数据搜索
    const queryData: PagerQueryData = {
      page: 1,
      pageSize: 10,
      sorts: [],
    };
    // 返回查询条件
    // getPagerQueryData():PagerQueryData{
    //   return queryData
    // }

    return {
      queryData,
    };
  },
});
</script>


<style lang="less" scoped>
</style>