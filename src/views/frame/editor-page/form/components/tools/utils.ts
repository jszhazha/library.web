import { computed, unref } from 'vue'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'



export function queryPoint(uuid: string): PointInfo | undefined {
  const pointData = computed(() => pointStore.getPointState)

  return unref(pointData).find((el) => el.uuid === uuid)
}