import type { App } from 'vue';


export default function (app: App) {
  app.directive('title', {
    mounted(_el: Element, binding) {
      document.title = binding.value
    }
  })
}