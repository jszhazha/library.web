import { useRouter } from 'vue-router';
import { computed, unref } from 'vue';

export const useFullContent = () => {
  const { currentRoute } = useRouter();

  
  console.log(unref(currentRoute))
};