<template>
  <div class="ui-input-search-wrap" :class="{ 'query-box-foucs': queryBoxFoucs }">
    <div class="ui-input-search" @click="handleBoxClick">
      <SearchOutlined v-if="prefix" class="ui-input-prefix mr-4" />
      <input
        ref="inputInstance"
        type="text"
        class="ui-input"
        v-model="inputValue"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleEnter"
      />
      <div v-if="suffix" class="ui-input-suffix">搜 索</div>
    </div>
    <!-- <div class="ui-input-box">
      <div class="ml-4 mr-4">
        <ClockCircleOutlined />
        <span class="ml-4">3423</span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import { CloseOutlined, ClockCircleOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: { CloseOutlined, ClockCircleOutlined },
  props: {
    value: {
      type: String,
      default: ''
    },
    prefix: {
      type: Boolean,
      default: true
    },
    suffix: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-enter'],
  setup(props, { emit }) {
    const { value: searchValue } = toRefs(props)

    // 输入内容
    const inputValue = ref<string>('')
    // 输入框焦点
    const inputInstance = ref<HTMLElement | null>(null)
    // 获取焦点显示阴影
    const queryBoxFoucs = ref<boolean>(false)
    // 获取焦点
    function handleFocus() {
      queryBoxFoucs.value = true
    }
    // 失去焦点
    function handleBlur() {
      queryBoxFoucs.value = false
    }
    // 处理搜索点击
    function handleBoxClick() {
      inputInstance.value?.focus()
    }
    // 处理按下enter
    function handleEnter() {
      emit('on-enter', inputValue.value)
    }

    watch(
      () => searchValue.value,
      (value) => (inputValue.value = value),
      { immediate: true }
    )

    return {
      inputInstance,
      inputValue,
      queryBoxFoucs,
      handleBlur,
      handleEnter,
      handleFocus,
      handleBoxClick
    }
  }
})
</script>

<style lang="less">
.ui-input-search-wrap {
  display: inline-block;
  padding: 0;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 0 0 1px #dfe1e5;
  box-sizing: border-box;

  .ui-input-search {
    display: inline-flex;
    width: 100%;
    height: 100%;
    padding: 0 0 0 16px;
    align-items: center;
  }

  &:hover {
    .query-box-foucs ();
  }

  &.query-box-foucs {
    background-color: #fff;
    border-color: #dfe1e5;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  .ui-input {
    flex: 1;
    font-size: 16px;
    color: #141414;
    background: transparent;
    border: none;
    outline: none;

    &-suffix {
      padding: 0 0 0 20px;
      margin: 0 20px;
      cursor: pointer;
      border-left: 1px solid #dfe1e5;
    }
  }
}
@media screen and (max-width: 600px) {
  .ui-input-search-wrap {
    width: 80%;
  }
}
</style>
