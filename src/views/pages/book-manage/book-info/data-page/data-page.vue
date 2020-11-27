<template>
  <global-data-page>
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <global-card title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="题名" v-bind="validateInfos.name">
              <a-input v-model:value="dataItem.name" placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="作者" v-bind="validateInfos.author">
              <a-input v-model:value="dataItem.author" placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="语种">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="价格">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版社">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="学科类别">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版时间">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="国际标准书号">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
        </a-row>
      </global-card>
    </a-form>

    <!-- 馆藏信息 -->
    <hold-info />

    <!-- 修改信息 -->
    <OperationInfoPanel :readonly="readonly" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button @click="onClosePage">
        返回
      </a-button>
      <a-button v-show="!readonly" @click="onRestPage">
        重置
      </a-button>
      <a-button v-show="readonly" type="primary" @click="onEditpage">
        编辑
      </a-button>
      <a-button v-show="!readonly" type="primary">
        保存
      </a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { dataPageMix } from "/@/utils/dataPage/";
import { BookInfo } from "/@/api/book-manage/book-info";
import { formRules } from "./data-page";
import holdInfo from "./hold-lnfo.vue";

export default defineComponent({
  components: { holdInfo },
  setup() {
    const dataItem = reactive<BookInfo>({});
    const rules = reactive(formRules);
    const { pageInfo, onPage, validateInfos } = dataPageMix<BookInfo>({ dataItem, rules });
    const { mode, readonly } = toRefs(pageInfo);

    return {
      mode,
      readonly,
      dataItem,
      ...onPage,
      validateInfos,
    };
  },
});
</script>


<style lang="less" scoped>
</style>