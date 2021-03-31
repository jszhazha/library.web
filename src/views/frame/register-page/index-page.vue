<template>
  <public-header />
  <div class="register-page-main pb-9">
    <div class="fs-5 mb-6 mt-10 ml-10 mr-10">
      创建您的 {{ MixinConfig.shortTitle }} 帐号
    </div>
    <div class="flex ml-10">
      <div class="register-page-content">
        <GlobalInput placeholder="登录账户" />
        <GlobalInput v-show="registerType" placeholder="邮件地址" />
        <GlobalInput v-show="!registerType" type="phone" placeholder="电话号码" />
        <div class="button" @click="onRegisterType">
          使用我的手机号码注册
        </div>
        <GlobalInput placeholder="密码" type="password" />
        <GlobalInput placeholder="确认密码" type="password" />
        <router-link class="button mb-6" :to="{ name: PageEnum.BASE_LOGIN }">
          登录现有帐号
        </router-link>
        <GlobalButton disabled>
          注 册
        </GlobalButton>
      </div>
      <div class="index-middle flex-item flex-column">
        <img :src="accountImage" class="account-image">
        <div class="account-content">
          只需一个帐号，您便可以使用{{ MixinConfig.shortTitle }}的所有产品和服务。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import publicHeader from '/@/views/frame/components/publicHeader'
import accountImage from '/@/assets/svg/account.svg'
import { PageEnum } from '/@/enums/pageEnum'

export default defineComponent({
  components: { publicHeader },
  setup() {
    const registerType = ref<boolean>(true)

    // 切换注册方式
    const onRegisterType = () => (registerType.value = !unref(registerType))

    return { accountImage, PageEnum, registerType, onRegisterType }
  }
})
</script>

<style lang="less" scoped>
.register-page {
  &-main {
    width: 820px;
    margin: 50px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  &-content {
    width: 360px;

    & > div {
      margin: 0 0 24px;
    }
  }
}

.button {
  display: inline-block;
  height: 48px;
  padding: 0 10px;
  line-height: 48px;
  color: @primary-color;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #f6f9fe;
  }
}

.account {
  &-image {
    width: 244px;
    height: 244px;
  }

  &-content {
    width: 244px;
    font-size: 16px;
    letter-spacing: 0.1em;
    text-align: center;
  }
}
</style>