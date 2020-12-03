<template>
  <div class="login-account">
    <div v-show="error.is" class="index-msg-error">
      <div class="index-msg-error-error-div index-middle">
        <InfoCircleFilled class="index-msg-error-error-div-icon" />
        <span>{{ error.msg }}</span>
      </div>
    </div>
    <GlobalInput
      v-model:value="formData.account"
      v-model:errorBorder="error.is"
      type="text"
      placeholder="手机号/邮件地址/图书馆账号"
      @on-enter="onEnter"
    />
    <GlobalInput
      v-model:value="formData.password"
      v-model:errorBorder="error.is"
      class="login-account-password"
      type="password"
      placeholder="密码"
      @on-enter="onEnter"
    />
    <span class="login-account-change-link" @click="onChange"> 短信验证码登录 </span>
    <GlobalButton class="login-account-button" :disabled="disabled">
      登录
    </GlobalButton>
    <div class="login-account-link">
      <router-link :to="{ name: 'reset-password' }">
        忘记密码
      </router-link>
      <a-divider type="vertical" />
      <router-link to="/login">
        遇到问题
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue"

export default defineComponent({
  emits: ["on-change"],
  setup(_props, { emit }) {
    const formData = reactive({
      account: "",
      password: ""
    })
    // 错误信息
    const error = reactive({
      msg: "",
      is: false
    })

    // 点击短信登录
    const onChange = () => emit("on-change", "account")

    // 点击登录按键
    const disabled = computed(() => !(!!formData.account && !!formData.password))

    const onEnter = () => {
      // console.log(formData)
    }

    return {
      error,
      disabled,
      formData,
      onEnter,
      onChange
    }
  }
})
</script>

<style lang="less" scoped>
@linkColor: #1890ff;

.login-account {
  &-password {
    margin: 26px 0 0;
  }

  &-change-link {
    display: inline-block;
    padding: 16px 0 0;
    color: @linkColor;
    cursor: pointer;
  }

  &-link {
    margin: 32px 0 0;
    color: @linkColor;
    text-align: center;

    .ant-divider {
      background: #d9d9d9;
    }

    &-button {
      cursor: pointer;
    }
  }

  &-button {
    margin: 32px 0 0;
  }
}
</style>
