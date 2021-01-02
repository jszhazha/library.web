<template>
  <div class="ui-input-search-wrap" :class="{ 'query-box-foucs': queryBoxFoucs }">
    <div class="ui-input-search ml-4 mr-4" @click="handleBoxClick">
      <SearchOutlined class="ui-input-prefix mr-4" />
      <input
        ref="inputInstance"
        type="text"
        class="ui-input"
        v-model="inputValue"
        @focus="handleFocus"
        @blur="handleBlur"
      />
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
import { defineComponent, ref } from "vue"
import { SearchOutlined, CloseOutlined, ClockCircleOutlined } from "@ant-design/icons-vue"
export default defineComponent({
  components: { SearchOutlined, CloseOutlined, ClockCircleOutlined },
  setup() {
    // 输入内容
    const inputValue = ref<string>("")
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
    return { inputInstance, inputValue, queryBoxFoucs, handleFocus, handleBlur, handleBoxClick }
  }
})
</script>

<style lang="less">
.ui-input-search-wrap {
  display: inline-block;
  padding: 0;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  box-sizing: border-box;
  
  .ui-input-search {
    display: inline-flex;
    width: calc(100% - 32px);
    align-items: center;
    height: 44px;
  }

  &:hover {
    .query-box-foucs ();
  }

  &.query-box-foucs {
    background-color: #fff;
    border-color: rgba(223, 225, 229, 0);
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  .ui-input {
    flex: 1;
    font-size: 16px;
    color: #141414;
    background: transparent;
    border: none;
    outline: none;
  }

  .ui-input-suffix {
    width: 16px;
    margin: 0 0 0 10px;
    cursor: pointer;
  }
}
@media screen and (max-width: 600px) {
  .ui-input-search-wrap {
    width: 80%;
  }
}
</style>