<template>
  <global-data-page>
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <global-card title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="题名">
              <a-input
                v-model:value="dataItem.name"
                placeholder="请输入"
                :disabled="readonly"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="作者">
              <a-input
                v-model:value="dataItem.author"
                placeholder="请输入"
                :disabled="readonly"
              />
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

      <global-card title="馆藏信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="索书号">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="存放位置">
              <a-input placeholder="请输入" :disabled="readonly" />
            </a-form-item>
          </a-col>
        </a-row>
      </global-card>
    </a-form>

    <!-- 修改信息 -->
    <OperationInfoPanel />

    <!-- 操作 -->
    <template #footer-block>
      <a-button @click="onClosePage">
        返回
      </a-button>
      <a-button> 重置 </a-button>
      <a-button type="primary">
        保存
      </a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { dataPageMix } from "/@/utils/dataPage/";
import { BookInfo } from "/@/api/book-manage/book-info";

export default defineComponent({
  setup() {
    const dataItem = reactive<BookInfo>({});
    const { onClosePage, mode, readonly } = dataPageMix<BookInfo>(dataItem);

    return { mode, dataItem, onClosePage, readonly };
  },
});
</script>


<style lang="less" scoped>
</style>