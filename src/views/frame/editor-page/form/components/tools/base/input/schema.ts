import type { PointInfo } from '/@/lib/interface/PointInfo'

export interface InputSchema extends PointInfo {
  a?: number
}

export const schema: InputSchema = {
  height: 50,

  width: 50
}
