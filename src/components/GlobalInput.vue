<template>
  <div
    class="global-input index-middle"
    :style="{ 'border-color': borderColor }"
  >
    <div
      v-if="type === 'phone'"
      class="global-input-phone"
    >
      中国 +86
    </div>
    <input
      v-model="inputValue"
      :type="inputType"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
    >
    <div
      v-if="type === 'code'"
      class="global-input-code"
      :class="{ 'index-disabled': codeDisabled }"
      @click="handleCode"
    >
      获取验证码
    </div>
    <EyeInvisibleOutlined
      v-if="type === 'password' && passwordType"
      class="global-input-password"
      @click="handleSwitch(false)"
    />
    <EyeOutlined
      v-else-if="type === 'password' && !passwordType"
      class="global-input-password"
      @click="handleSwitch(true)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

enum InputTypeMap {
  text = "text",
  password = "password",
  phone = "text",
  code = "text",
}

enum TypeMap {
  text = "text",
  password = "password",
  phone = "phone",
  code = "code",
}

export default defineComponent({
  props: {
    // 类型
    type: {
      type: String,
      default: "text",
    },
    // 提示文件
    placeholder: {
      type: String,
      default: "",
    },
    // 值
    value: {
      type: String,
      default: "",
    },
    // 最大长度
    maxlength: {
      type: Number,
      default: undefined,
    },
    // code 类型 禁止点击
    codeDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const inputType = ref<string>(InputTypeMap[props.type as InputTypeMap]);
    const passwordType = ref<boolean>(true);
    const borderColor = ref<string>("");
    const inputValue = ref<string>(props.value);

    // 密码切换
    const handleSwitch = (value: boolean) => {
      passwordType.value = value;
      if (value) inputType.value = TypeMap.password;
      else inputType.value = TypeMap.text;
    };

    // 失去焦点
    const handleBlur = () => {
      borderColor.value = "";
    };

    // 获得焦点
    const handleFocus = () => {
      borderColor.value = "#1890ff";
    };

    // 输入内容
    const handleInput = () => {
      if (props.type === TypeMap.phone || props.type === TypeMap.code) {
        inputValue.value = inputValue.value.replace(/[^0-9]+/g, "");
      }
    };

    // 点击 code
    const handleCode = () => {
      if (props.codeDisabled) return;
    };

    return {
      inputType,
      inputValue,
      borderColor,
      passwordType,
      handleCode,
      handleBlur,
      handleFocus,
      handleInput,
      handleSwitch,
    };
  },
});
</script>

<style lang="less" scoped>
@height: 48px;

.global-input {
  width: 100%;
  height: @height;
  padding: 0 16px;
  font-size: 16px;
  color: #141414;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  border-radius: 8px;
  transition: border 0.2s ease-in-out;

  input {
    flex: 1;
    height: @height;
    background: transparent;
    border: none;
    outline: none;
  }

  &-password {
    margin: 0 0 0 4px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
  }

  &-phone {
    padding: 0 16px 0 0;
    margin: 0 16px 0 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  &-code {
    color: #1890ff;
    cursor: pointer;
  }
}
</style>