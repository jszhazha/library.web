<template>
  <div class="quick-entry-wrap">
    <div class="item">
      <TeamOutlined class="item-icon" style="color: #52c41a;" />
      <div class="item-title">
        用户
      </div>
    </div>
    <div class="item">
      <ReadOutlined class="item-icon" style="color: #1890ff;" />
      <div class="item-title">
        图书
      </div>
    </div>
    <div class="item">
      <FormOutlined class="item-icon" style="color: #13c2c2;" />
      <div class="item-title">
        问题
      </div>
    </div>
    <div class="item">
      <ContainerOutlined class="item-icon" style="color: #85a5ff;" />
      <div class="item-title">
        类别
      </div>
    </div>
    <div class="item">
      <ProfileOutlined class="item-icon" style="color: #c41d7f;" />
      <div class="item-title">
        登录日志
      </div>
    </div>
    <div class="item">
      <SettingOutlined class="item-icon" style="color: #a0d911;" />
      <div class="item-title">
        操作日志
      </div>
    </div>
    <div class="item">
      <BookOutlined class="item-icon" style="color: #ffc53d;" />
      <div class="item-title">
        数据字典
      </div>
    </div>
    <div class="item">
      <SolutionOutlined class="item-icon" style="color: #cf1322;" />
      <div class="item-title">
        图书借阅
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  TeamOutlined,
  ReadOutlined,
  FormOutlined,
  ContainerOutlined,
  ProfileOutlined,
  SettingOutlined,
  BookOutlined,
  SolutionOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    TeamOutlined,
    ReadOutlined,
    FormOutlined,
    ContainerOutlined,
    ProfileOutlined,
    SettingOutlined,
    BookOutlined,
    SolutionOutlined
  },
  setup() {
    return {}
  }
})
</script>


<style lang="less" scoped>
.quick-entry {
  &-wrap {
    display: flex;
    justify-content: space-between;
    margin: 16px;

    .item {
      flex: 1;
      padding: 20px 0 15px;
      text-align: center;
      background: var(--color-background-override);

      &-icon {
        margin: 0 0 10px;
        font-size: 24px;
      }
    }

    .item:not(:first-of-type) {
      margin: 0 0 0 16px;
    }
  }
}
</style>