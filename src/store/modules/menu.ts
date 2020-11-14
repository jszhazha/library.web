import store from '/@/store/'
import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators'
import config from '/@/config'

const NAME = 'menu';

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Menu extends VuexModule {

  // 菜单宽度
  private menuWidthState: number = config.menuWidth

  get getMenuWidthState(): number {
    return this.menuWidthState
  }

  @Mutation
  commitMenuWidthState(menuWidth: number): void {
    this.menuWidthState = menuWidth;
  }




}

export { Menu };
export const menuStore = getModule<Menu>(Menu)