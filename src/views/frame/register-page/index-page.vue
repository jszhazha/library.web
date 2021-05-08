<template>
  <public-header />
  <div class="register-page-main pb-9">
    <div class="fs-5 mb-6 mt-10 ml-10 mr-10">
      创建您的 {{ MixinConfig.shortTitle }} 帐号
    </div>
    <div class="flex ml-10">
      <div class="register-page-content">
        <GlobalInput v-model:value="dataItem.username" class="mb-6" placeholder="登录账户" />
        <GlobalInput v-show="registerType" v-model:value="dataItem.email" placeholder="邮件地址" />
        <GlobalInput
          v-show="!registerType"
          v-model:value="dataItem.mobile"
          v-model:errorBorder="errorTips.isMobile"
          type="phone"
          placeholder="电话号码"
          @on-blur="handlePhoneBlue"
        />
        <div v-if="registerType ? errorTips.email : errorTips.isMobile" class="mt-1 ml-2 cc00">
          {{ registerType ? errorTips.email : errorTips.mobile }}
        </div>
        <div class="button mb-6 mt-6" @click="onRegisterType">
          使用我的手机号码注册
        </div>
        <GlobalInput
          v-model:errorBorder="errorTips.isPassword"
          v-model:value="dataItem.password"
          class="mb-6"
          placeholder="密码"
          type="password"
          @on-blur="handlePasswordBlur"
        />
        <GlobalInput
          v-model:value="dataItem.repeat"
          v-model:errorBorder="errorTips.isRepeat"
          placeholder="确认密码"
          type="password"
          @on-input="handleRepeatInput"
          @on-blur="handleRepeatBlur"
        />
        <div v-if="errorTips.isRepeat || errorTips.isPassword" class="mt-1 ml-2 cc00">
          {{ errorTips.isPassword ? errorTips.password : errorTips.repeat }}
        </div>
        <router-link class="button mt-6 mb-6" :to="{ name: PageEnum.BASE_LOGIN }">
          登录现有帐号
        </router-link>
        <GlobalButton
          ref="buttonInstance"
          class="mb-6"
          :size="1"
          :disabled="disabled"
          @on-click="onButtonClick"
        >
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
  <div class="pb-4" />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, unref } from 'vue'
import publicHeader from '/@/views/frame/components/publicHeader'
import accountImage from '/@/assets/svg/account.svg'
import { PageEnum } from '/@/enums/pageEnum'
import { validData } from '/@/utils/regExp'
import { Register } from '/@/api/security'
import { Instance } from '/@/lib/interface/GlobalButton'

interface ErrorTips extends Register {
  // 电话号码是否错误
  isMobile?: boolean

  // 两次密码不一样
  isRepeat?: boolean

  // 密码
  isPassword?: boolean
}

export default defineComponent({
  components: { publicHeader },
  setup() {
    // 注册方式 true: 邮箱 ,false: 电话
    const registerType = ref<boolean>(true)
    // 数据
    const dataItem = reactive<Register>({})
    // 切换注册方式
    const onRegisterType = () => (registerType.value = !unref(registerType))
    // 错误提示
    const errorTips = reactive<ErrorTips>({})
    // 注册按钮
    const buttonInstance = ref<Instance | null>(null)
    // 注册
    const onButtonClick = (event: MouseEvent) => handleUserRegister(event.offsetX, event.offsetY)

    const disabled = computed(() => {
      // 用户名
      if (!dataItem.username) return true
      // 邮箱
      if (registerType.value && !dataItem.email) return true
      // 电话
      if (!registerType.value && !dataItem.mobile) return true
      // 密码
      if (!dataItem.password) return true
      // 确认密码
      if (!dataItem.repeat) return true
      // 密码相等
      if (dataItem.password !== dataItem.repeat) return true

      return false
    })

    // 电话输入框失去焦点
    function handlePhoneBlue() {
      if (!dataItem.mobile) {
        errorTips.isMobile = false
        return
      }
      if (!validData({ rule: 'telephone', data: dataItem.mobile! })) {
        errorTips.isMobile = true
        errorTips.mobile = '手机号不正确'
        return
      }
    }

    // 确认密码输入
    function handleRepeatInput(value: string) {
      if (!dataItem.password || !value) return
      const character = value.replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1')
      if (!new RegExp(`^${character}.*`).test(dataItem.password!)) {
        errorTips.isRepeat = true
        errorTips.repeat = '两次输入的密码不一致'
      } else {
        errorTips.isRepeat = false
      }
    }

    // 确认密码失去焦点
    function handleRepeatBlur() {
      if (dataItem.repeat && dataItem.password && dataItem.password !== dataItem.repeat) {
        errorTips.isRepeat = true
        errorTips.repeat = '两次输入的密码不一致'
      } else {
        errorTips.isRepeat = false
      }
    }
    // 密码输入
    function handlePasswordBlur() {
      if (!dataItem.password) {
        return
      }
      if (dataItem.password.length < 6) {
        errorTips.isPassword = true
        errorTips.password = '至少包含6个字符'
      } else {
        errorTips.isPassword = false
        handleRepeatBlur()
      }
    }
    // 处理用户注册
    async function handleUserRegister(x?: number, y?: number) {
      buttonInstance.value?.startAnimation(x, y)
    }

    return {
      disabled,
      dataItem,
      PageEnum,
      errorTips,
      accountImage,
      registerType,
      onButtonClick,
      buttonInstance,
      onRegisterType,
      handlePhoneBlue,
      handleRepeatBlur,
      handleRepeatInput,
      handlePasswordBlur
    }
  }
})
</script>

<style lang="less" scoped>
.register-page {
  &-main {
    width: 820px;
    margin: 50px auto 0;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  &-content {
    width: 360px;
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
  user-select: none;

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