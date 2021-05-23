<template>
  <div class="flex flex-column editor-form-wrap">
    <PublicHeader class="editor-form-header" :is-show-user-info="false">
      <template #left>
        <div class="index-theme header-left index-middle index-hidden-newline">
          <div>表单样式设计</div>
          <div class="index-center-middle header-input">
            <input
              ref="inputRef"
              v-model="dataItem.name"
              class="name-input mr-2"
              :class="inputState && 'name-input-edit'"
              @focus="onInputFocus"
              @blur="onInputBlur"
            >
            <Icon v-show="!inputState" icon="entypo:edit" class="pointer" @click="onClickEdit" />
          </div>
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
          <div class="button-primary index-center-middle" @click="onGoBack">
            返回
          </div>
        </div>
      </template>
    </PublicHeader>
    <div class="flex flex-item hidden editor-form-main relative">
      <tool-area />
      <view-area class="flex-item" @on-click-point="handleClickPoint" />
      <action-area v-model:value="action.visible" :uuid="action.uuid" />
    </div>
  </div>
</template>

<script lang="ts">
import { assign } from 'lodash-es'
import { defineComponent, reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import actionArea from './src/actionArea.vue'
import toolArea from './src/toolArea.vue'
import viewArea from './src/viewArea.vue'
import service, { FormManage } from '/@/api/page-manage/form-page'

export default defineComponent({
  components: { actionArea, toolArea, viewArea },
  setup() {
    const dataItem = reactive<FormManage>({})

    const { currentRoute, back } = useRouter()

    const inputRef = ref<HTMLElement | null>(null)

    const inputState = ref<boolean>(false)

    const action = reactive<{ visible: boolean; uuid: string }>({ visible: false, uuid: '' })

    // 处理点击编辑
    const onClickEdit = () => inputRef.value?.focus()

    // 处理页面返回
    const onGoBack = () => back()

    // 处理输入框获取焦点
    const onInputFocus = () => (inputState.value = true)

    // 处理输入框失去焦点
    const onInputBlur = () => (inputState.value = false)

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id)
      assign(dataItem, data)
    }

    // 点击 point
    function handleClickPoint({ uuid }: { uuid: string }) {
      action.visible = false
      action.uuid = uuid
    }

    onLoadDataById(+unref(currentRoute).params.id)

    return {
      action,
      dataItem,
      inputRef,
      inputState,
      onClickEdit,
      onInputFocus,
      onInputBlur,
      onGoBack,
      handleClickPoint
    }
  }
})
</script>

<style lang="less" scoped>
.editor-form {
  &-wrap {
    height: 100vh;
    background: #f5f6fa;
  }

  &-header {
    position: relative;
    z-index: 11;
    height: 54px;
    background: #fff;
    box-shadow: 0 2px 4px 0 #dbdbdb99;
  }
}

.header {
  &-left {
    font-size: 18px;
    font-weight: bold;
    color: @primary-color;
  }

  &-input {
    margin: 0 0 0 20px;

    .name-input {
      width: 120px;
      margin: 0 10px 0 0;
      overflow: hidden;
      color: #292b33;
      text-align: center;
      text-overflow: ellipsis;
      cursor: pointer;
      border: 0 solid transparent;
      border-bottom: 1px solid transparent;
      outline: none;
      caret-color: @primary-color;

      &:focus {
        cursor: text;
      }

      &-edit {
        border-bottom-color: @primary-color;
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