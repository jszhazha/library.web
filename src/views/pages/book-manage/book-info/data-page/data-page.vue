<template>
  <div>
    <global-card title="基础数据">
      <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
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
            <a-form-item label="语言">
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
            <a-form-item label="出版社">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="总数量">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="在馆数量">
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
            <a-form-item label="图书编号">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="出版时间">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9">
            <a-form-item label="图书编号">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9">
            <a-form-item label="国际标准书号">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </global-card>
    <!-- <OperationInfoPanel /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>


<style lang="less" scoped>
</style>