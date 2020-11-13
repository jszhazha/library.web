

export const elementOffset = (el: HTMLElement | null): { top: number, left: number } => {
  const offset = { top: 0, left: 0 }
  if (el === null) return offset
  offset.top = el.offsetTop;
  offset.left = el.offsetLeft;
  if (el.offsetParent !== null) {
    const offsetParent = elementOffset(el.offsetParent as HTMLElement)
    offset.top += offsetParent.top;
    offset.left += offsetParent.left
  }
  return offset
}

export const browserClient = (): { clientWidth: number, clientHeight: number } => {
  return {
    clientWidth: window.document.documentElement.clientWidth,
    clientHeight: window.document.documentElement.clientHeight
  }
}