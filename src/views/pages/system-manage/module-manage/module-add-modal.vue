<template>
  <a-modal
    title="新增"
    :mask-closable="false"
    :confirm-loading="confirmLoading"
    @ok="onConfirm"
    @cancel="onCentel"
  >
    <a-form :layout="'vertical'">
      <a-form-item label="权限项名称" v-bind="validateInfos.description">
        <a-input v-model:value="dataItem.description" />
      </a-form-item>
      <a-form-item label="权限项" v-bind="validateInfos.authorities">
        <a-select
          v-model:value="dataItem.authorities"
          mode="multiple"
          show-search
          :option-filter-prop="'key'"
          :filter-option="handleFilterSelect"
        >
          <a-select-option v-for="(value, key) in authorityList" :key="value" :value="key">
            {{ value }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref, unref } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { formRules, DataItem } from './module-add-modal'
import { queryRoleAuthority } from '/@/enums/roleEnum'
import service, { Authority, ModuleManage } from '/@/api/system-manage/module-manage'
import PinYin from 'word-pinyin'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  emits: ['on-success'],
  setup(props, { emit }) {
    // 权限列表
    const authorityList = ref<Authority>()

    const rules = reactive(formRules)

    const dataItem = reactive<DataItem>({ description: '', authorities: [] })

    const confirmLoading = ref<boolean>(false)

    const { resetFields, validate, validateInfos } = useForm(dataItem, rules)

    // 获取权限列表数据
    async function fetchDataFromServer() {
      authorityList.value = await queryRoleAuthority()
    }

    // 发送前权限数据转为字符串
    function sendBefore(auth: string[]) {
      const authorities = {}

      auth.forEach((el) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (authorities as any)[el] = unref(authorityList as any)[el]
      })

      return JSON.stringify(authorities)
    }

    // 添加新的数据
    async function onConfirm() {
      if (!(await validItem())) return

      const params: ModuleManage = {
        name: props.name,
        description: dataItem.description,
        authorities: sendBefore(dataItem.authorities!)
      }

      try {
        confirmLoading.value = true
        await service.saveNewItem(params)
        resetFields()
      } catch (err) {
        message.error(`模块权限添加失败: ${err.msg}`)
      } finally {
        confirmLoading.value = false
        emit('on-success')
      }
    }

    const onCentel = () => resetFields()

    // 是否根据输入项进行筛选
    function handleFilterSelect(inputValue: string, option: { key: string }) {
      const value = PinYin.getPinyin(inputValue).replace(/\s+/g, '')
      const target = PinYin.getPinyin(option.key).replace(/\s+/g, '')
      return new RegExp(value).test(target)
    }

    // 检测数据
    async function validItem() {
      try {
        await validate()
        return true
      } catch (err) {
        return false
      }
    }

    fetchDataFromServer()

    return {
      dataItem,
      authorityList,
      validateInfos,
      onCentel,
      onConfirm,
      confirmLoading,
      handleFilterSelect
    }
  }
})
</script>

<style lang="less" scoped></style>
