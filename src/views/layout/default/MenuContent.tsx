import { defineComponent } from "vue";
import Icon from "/@/components/Icon";

export default defineComponent({
  name: "MenuContent",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    function renderIcon(icon: string) {
      return icon ? <Icon icon={icon} class="menu-content-icon" /> : null;
    }

    return () => {
      const { title, icon } = props;
      return [renderIcon(icon), <span>{title}</span>];
    };
  },
});
