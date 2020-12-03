<template>
  <button
    ref="button"
    class="globla-button"
    :class="{ 'index-disabled': disabled }"
    @click="handleClick($event)"
  >
    <slot />
  </button>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const button = ref<HTMLElement | null>(null)
    // 处理动画
    const handleAnimation = (event: MouseEvent): HTMLElement => {
      const x = event.offsetX
      const y = event.offsetY
      const ripples = document.createElement("span")
      ripples.style.left = `${x}px`
      ripples.style.top = `${y}px`
      button.value!.appendChild(ripples)
      return ripples
    }
    // 处理点击
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return
      const ripples = handleAnimation(event)
      console.log(ripples)
    }
    return { handleClick, button }
  }
})
</script>



<style  lang="less">
.globla-button {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background: #177ddc;
  border-width: 0;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;

  span {
    position: absolute;
    pointer-events: none;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: button-animate 1s linear infinite;
  }

  @keyframes button-animate {
    0% {
      width: 0;
      height: 0;
      opacity: 0.5;
    }

    100% {
      width: 700px;
      height: 600px;
      opacity: 0;
    }
  }
}
</style>