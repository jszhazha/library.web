
import { useRouter } from "vue-router";

interface DataPageMix {
  closePage: () => void
}

export function dataPageMix(): DataPageMix {
  const { back } = useRouter()
  
  const closePage = () => {
    back()
    console.log()
  }

  return { closePage }
}