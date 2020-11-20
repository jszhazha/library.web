<template>
  <div class="login-account">
    <global-input
      v-model:value="formData.account"
      type="text"
      placeholder="手机号/邮件地址/图书馆账号"
    />
    <global-input
      v-model:value="formData.password"
      class="login-account-password"
      type="password"
      placeholder="密码"
    />
    <span class="login-account-change-link" @click="onChange">
      短信验证码登录
    </span>
    <global-button class="login-account-button" :disabled="disabled">
      登录
    </global-button>
    <div class="login-account-link">
      <router-link to="/">
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
import { computed, defineComponent, reactive } from "vue";

export default defineComponent({
  emits: ["on-change"],
  setup(_props, { emit }) {
    const formData = reactive({
      account: "admin",
      password: "123456",
    });

    // 点击短信登录
    const onChange = () => emit("on-change", "account");

    const disabled = computed(() => !(!!formData.account && !!formData.password));

    return {
      disabled,
      formData,
      onChange,
    };
  },
});
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
