import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    console.log(123)
    return () => <div>123</div>;
  },
});
