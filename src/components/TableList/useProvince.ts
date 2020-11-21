
import { Instance } from '/@/lib/props/TableList'
import { provide, inject } from 'vue';

const key = Symbol('table');




export function provideTable(instance: Instance): void {
  provide(key, instance);
}

export function injectTable(): Instance {
  return inject(key) as Instance;
}
