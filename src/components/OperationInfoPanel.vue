<template>
  <GlobalCard title="操作信息" class="operation">
    <a-row :gutter="[12, 48]">
      <a-col :offset="2" class="index-middle">
        <UserOutlined class="operation-icon" />
        <div class="operation-title">
          创建人
        </div>
        <div>admin</div>
      </a-col>
      <a-col :offset="3" class="index-middle">
        <CalendarOutlined class="operation-icon" />
        <div class="operation-title">
          创建时间
        </div>
        <div>2010-12-21</div>
      </a-col>
    </a-row>
    <a-row :gutter="[12, 48]">
      <a-col :offset="2" class="index-middle">
        <UserOutlined class="operation-icon" />
        <div class="operation-title">
          创建人
        </div>
        <div>admin</div>
      </a-col>
      <a-col :offset="3" class="index-middle">
        <CalendarOutlined class="operation-icon" />
        <div class="operation-title">
          创建时间
        </div>
        <div>2010-12-21</div>
      </a-col>
    </a-row>
  </GlobalCard>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { UserOutlined, CalendarOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  components: { UserOutlined, CalendarOutlined },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
})
</script>


<style lang="less" scoped>
.operation {
  padding: 16px 0 32px;

  &-title {
    margin: 0 0 0 20px;
  }

  &-title::after {
    margin: 0 15px 0 0;
    content: ":";
  }

  &-icon {
    font-size: 16px;
  }
}
</style>
