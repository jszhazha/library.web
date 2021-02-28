import type { Plugin } from 'vite';
import type { ViteEnv } from '../../utils';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configStyleImportPlugin } from './styleImport';









export function createVitePlugins(_viteEnv: ViteEnv, isBuild: boolean) {

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
  ];


  vitePlugins.push(configStyleImportPlugin());

  if (isBuild) {
    //
  }


  return vitePlugins
}