import type { PluginOptions } from 'vue-toastification';
import type { ToastContent } from 'vue-toastification/dist/types/types/';
import { useToast } from "vue-toastification";
import { assign } from 'lodash-es';

import './index.less'


const open = (type: 'error' | 'success' | 'info', optionDefault: PluginOptions = {}) => {
  return (description: ToastContent, option: PluginOptions = {}) => {
    const toast = useToast()
    toast[type](description, assign(optionDefault, option))
  }
};


const errorDefault: PluginOptions = {
  toastClassName: ["toast-custom", "toast-custom-error"],
  bodyClassName: ["toast-custom-body"],
  hideProgressBar: true
};

const cacheDefault: PluginOptions = {
  toastClassName: ["toast-custom", "toast-custom-cache"],
  bodyClassName: ["toast-custom-body"],
  closeOnClick: false,
  closeButton: false,
  draggable: false,
  icon: false
};

const api = {
  error: open('error', errorDefault),
  cache: open('info', cacheDefault),
};

export default api