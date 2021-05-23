import type { PointInfo } from '/@/lib/interface/PointInfo'

export interface InputSchema extends PointInfo {
  a?: number
}

export const schema: InputSchema = {
  height: 32,

  width: 200
}



export const name = '输入框'

export const icon = 'ant-design:edit-outlined'