<template>
  <div class="login">
    <div class="login-header">
      <div class="index-middle center">
        <img src="@/assets/svg/logo.svg" />
        <div class="title">
          {{ title }}
        </div>
      </div>
    </div>
    <div class="index-center login-title">
      {{ loginContent.title }}
    </div>
    <div class="index-center login-main">
      <div class="login-main-left">
        <div class="qrcode-wrap">
          <img ref="qrcode" />
        </div>
        <div class="login-main-left-footer">请使用微信扫描二维码登录</div>
      </div>
      <a-divider type="vertical" class="divider" />
      <div class="login-main-right">
        <div v-show="loginContent.type === 'account'">
          <account-login @on-change="loginTypeChange" />
        </div>
        <div v-show="loginContent.type === 'phone'">
          <phone-login @on-change="loginTypeChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import accountLogin from "./account.vue";
import phoneLogin from "./phone.vue";
import config from "/@/config/";
import { toDataURL } from "qrcode";

// import useM essage from "@/hooks/web/useMessage";

export default defineComponent({
  name: "Login",
  components: { accountLogin, phoneLogin },
  setup() {
    const title: string = config.systemTitle;
    const loginContent = reactive({ type: "account", title: "图书馆账号登录" });
    const qrcode = ref<null | HTMLImageElement>(null);
    const renderValue = String("Hello world");
    const width = 160;
    // const { notification } = useMessage.init();

    onMounted(async () => {
      const url = await toDataURL(renderValue, {
        width,
      });
      qrcode.value!.src = url;
    });

    // 账户登录改变
    const loginTypeChange = (value: string) => {
      if (value === "account") {
        loginContent.type = "phone";
        loginContent.title = "短信验证码登录";
      } else if (value === "phone") {
        loginContent.type = "account";
        loginContent.title = "图书馆账号登录";
      }
    };

    return {
      title,
      qrcode,
      loginContent,
      loginTypeChange,
    };
  },
});
</script>


<style lang="less" scoped>
@titleColor: #191919;

.login {
  width: 100vw;
  height: 100vh;

  &-header {
    display: flex;
    align-items: center;
    height: 48px;
    background: #f0f0f0;

    .center {
      width: 1200px;
      padding: 0 20px;
      margin: 0 auto;

      img {
        width: 20px;
      }
    }

    .title {
      margin: 0 0 0 10px;
      font-size: 16px;
      font-weight: 700;
      color: @titleColor;
    }
  }

  &-title {
    padding: 80px 0 64px;
    font-size: 25.6px;
    color: @titleColor;
  }

  &-main {
    .divider {
      height: 240px;
      margin: 0 48px;
      background: #d9d9d9;
    }

    &-right,
    &-left {
      width: 360px;
    }

    &-left-footer {
      margin: 50px 0 0;
      font-size: 12px;
      color: #838383;
      text-align: center;
    }
  }
}

.qrcode {
  &-wrap {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 0 auto;
    background: #f7f7f7;
    border-radius: 8px;
  }
}
</style>
