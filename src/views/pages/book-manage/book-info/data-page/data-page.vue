<template>
  <global-data-page>
    <a-form :label-col="{ flex: '120px' }" :wrapper-col="{ flex: 'auto' }">
      <global-card title="书目信息">
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="题名">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="作者">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="语种">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="价格">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="出版发行">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="学科类别">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="出版时间">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="国际标准书号">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
      </global-card>

      <global-card title="馆藏信息">
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="索书号">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
      </global-card>
    </a-form>
    <OperationInfoPanel />

    <template #footer-block>
      <a-button> 返回 </a-button>
      <a-button> 重置 </a-button>
      <a-button type="primary">
        保存
      </a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>


<style lang="less" scoped>
</style>