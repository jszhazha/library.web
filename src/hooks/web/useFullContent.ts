import { useRouter } from 'vue-router';
import { unref } from 'vue';

export const useFullContent = ():void => {
  const { currentRoute } = useRouter();

  
  console.log(unref(currentRoute))
};