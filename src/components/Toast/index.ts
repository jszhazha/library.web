import type { ToastContent, ToastOptions } from 'vue-toastification/dist/types/types/'
import { useToast } from "vue-toastification"
import { assign } from 'lodash-es'

import './index.less'


const open = (type: 'error' | 'success' | 'info', optionDefault = {}) => {
  return (description: ToastContent, option = {}) => {
    const toast = useToast()
    toast[type](description, assign(optionDefault, option))
  }
}

const clear = () => {
  const toast = useToast()
  return (): void => {
    toast.clear()
  }
}


const errorDefault: ToastOptions = {
  toastClassName: ["toast-custom", "toast-custom-error"],
  bodyClassName: ["toast-custom-body"],
  hideProgressBar: true
}

const cacheDefault: ToastOptions = {
  toastClassName: ["toast-custom", "toast-custom-cache"],
  bodyClassName: ["toast-custom-body"],
  closeOnClick: false,
  closeButton: false,
  draggable: false,
  icon: false
}

const api = {
  error: open('error', errorDefault),
  cache: open('info', cacheDefault),
  clear: clear()
}

export default api