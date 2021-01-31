<template>
  <main class="main">
    <div class="index-center-middle">
      <div class="main-title">
        {{ config.title }}
      </div>
    </div>
    <div class="main-search-wrap">
      <input-search class="main-search" @on-enter="handleEnter" />
      <div class="mt-5 main-tips">
        <input type="submit" class="main-submit" value="站内检索">
        <input type="submit" class="main-submit" value="智能检索">
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import config from '/@/config/'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'
import { InputSearch } from '/@/lib/UI/'

export default defineComponent({
  components: { InputSearch },
  setup() {
    const go = useGo()

    // 处理用户按下 enter
    function handleEnter(val: string) {
      val && go({ name: PageEnum.SEARCH_PAGE, query: { q: val } })
    }

    return {
      config,
      handleEnter
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  padding: 120px 0 0;
  color: #000;

  &-title {
    font-family: cursive;
    font-size: 30px;
  }

  &-search-wrap {
    width: 584px;
    margin: 24px auto 0;

    .main-search {
      width: 100%;
      height: 44px;
    }

    .main-tips {
      display: flex;
      justify-content: center;

      .main-submit {
        height: 36px;
        min-width: 54px;
        padding: 0 16px;
        margin: 11px 6px;
        line-height: 27px;
        color: #3c4043;
        text-align: center;
        cursor: pointer;
        background-color: #f8f9fa;
        border: 1px solid #f8f9fa;
        border-radius: 4px;

        &:hover {
          color: #202124;
          border-color: #dadce0;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        }

        &:focus {
          border: 1px solid #4d90fe;
          outline: none;
        }
      }
    }
  }
}
</style>
