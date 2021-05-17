


interface UseMouse {
  // 鼠标按下
  startEvent: () => void
}


export function useMouse(): UseMouse {
  

  return { startEvent }
}