<template>
  <div class="login-phone">
    <div v-show="error.phone" class="index-msg-error">
      <div class="index-msg-error-error-div index-middle">
        <InfoCircleFilled class="index-msg-error-error-div-icon" />
        <span v-if="error.code">帐号或者短信验证码错误，请重新输入</span>
        <span v-else-if="error.phone">手机号格式不正确 </span>
      </div>
    </div>
    <GlobalInput
      v-model:value="formData.phone"
      v-model:errorBorder="error.phone"
      type="phone"
      placeholder="手机号"
      :maxlength="20"
      @on-enter="onEnter"
    />
    <GlobalInput
      v-model:value="formData.code"
      v-model:errorBorder="error.code"
      class="login-phone-code"
      type="code"
      placeholder="短信验证码"
      :code-disabled="formData.phone && error.phone"
      :maxlength="8"
      @on-enter="onEnter"
    />
    <span class="login-phone-change-link" @click="onChange"> 密码登录 </span>
    <GlobalButton class="login-phone-button" :disabled="disabled">
      登录
    </GlobalButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue"

export default defineComponent({
  emits: ["on-change"],
  setup(_props, { emit }) {
    const formData = reactive({
      phone: "",
      code: "",
    })
    // 错误信息
    const error = reactive({
      code: false,
      phone: false,
    })
    const onChange = () => emit("on-change", "phone")

    // 点击登录按键
    const disabled = computed(() => !(!!formData.phone && !!formData.code))

    const onEnter = () => {
      // console.log(formData)
    }

    return { formData, error, onEnter, onChange, disabled }
  },
})
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
