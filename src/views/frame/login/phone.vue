<template>
  <div class="login-phone">
    <global-input
      v-model:value="inputValue"
      type="phone"
      placeholder="手机号"
      :maxlength="20"
    />
    <global-input
      v-model:value="inputValue"
      class="login-phone-code"
      type="code"
      placeholder="短信验证码"
      :code-disabled="true"
      :maxlength="8"
    />
    <span
      class="login-phone-change-link"
      @click="onChange"
    >
      密码登录
    </span>
    <global-button
      class="login-phone-button"
      :disabled="true"
    >
      登录
    </global-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["on-change"],
  setup(_props, { emit }) {
    const inputValue = ref<string>("");
    const onChange = () => {
      emit("on-change", "phone");
    };

    return { inputValue, onChange };
  },
});
</script>

<style lang="less" scoped>
@linkColor: #1890ff;

.login-phone {
  color: #000;

  &-code {
    margin: 26px 0 0;
  }

  &-change-link {
    display: inline-block;
    padding: 16px 0 0;
    color: @linkColor;
    cursor: pointer;
  }

  &-button {
    margin: 32px 0 0;
  }
}
</style>
