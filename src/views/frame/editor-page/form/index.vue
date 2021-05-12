<template>
  <div class="flex flex-column">
    <PublicHeader class="editor-form-header" :is-show-user-info="false">
      <template #left>
        <div class="index-theme header-left index-middle">
          表单样式设计
        </div>
      </template>
      <template #center>
        <div class="header-center index-center-middle w100">
          <input v-model="dataItem.name" class="name-input">
        </div>
      </template>
      <template #right>
        <div class="header-right flex">
          <div class="button index-center-middle">
            保存
          </div>
          <div class="button index-center-middle">
            预览
          </div>
          <div class="button-primary index-center-middle">
            返回
          </div>
        </div>
      </template>
    </PublicHeader>
    <div class="flex">
      <tool-area />
      <action-area class="flex-item" />
      <view-area />
    </div>
  </div>
</template>

<script lang="ts">
import { assign } from 'lodash-es'
import { defineComponent, reactive, unref } from 'vue'
import { useRouter } from 'vue-router'
import actionArea from './src/actionArea.vue'
import toolArea from './src/toolArea.vue'
import viewArea from './src/viewArea.vue'
import service, { FormManage } from '/@/api/page-manage/form-page'

export default defineComponent({
  components: { actionArea, toolArea, viewArea },
  setup() {
    const dataItem = reactive<FormManage>({})

    const { currentRoute } = useRouter()

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id)
      assign(dataItem, data)
      console.log(data)
    }

    onLoadDataById(+unref(currentRoute).params.id)

    return { dataItem }
  }
})
</script>

<style lang="less" scoped>
.editor-form {
  &-header {
    height: 54px;
    box-shadow: 0 2px 4px 0 #dbdbdb99;
  }
}

.header {
  &-left {
    font-size: 18px;
    font-weight: bold;
    color: @primary-color;
  }

  &-center {
    .name-input {
      overflow: hidden;
      color: #292b33;
      text-align: center;
      text-overflow: ellipsis;
      cursor: pointer;
      border-width: 0;
      outline: none;
      caret-color: @primary-color;

      &:focus {
        cursor: text;
      }
    }
  }

  &-right {
    .button {
      height: 32px;
      padding: 0 16px;
      color: #5c5f66;
      cursor: pointer;
      border-radius: 16px;
      box-shadow: 0 2px 8px 0 #e6e9f2;

      &:hover {
        color: #292b33;
      }

      &:active {
        color: #2c63ff;
      }

      &:not(:last-of-type) {
        margin: 0 24px 0 0;
      }

      &-primary {
        height: 32px;
        padding: 0 16px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(0deg, #2c63ff, #2c83ff);
        border-radius: 16px;

        &:active {
          background: linear-gradient(0deg, #2758e5, #2775e5);
        }

        &:hover {
          background: linear-gradient(0deg, #4172ff, #418fff);
        }
      }
    }
  }
}
</style>