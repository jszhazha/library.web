import { isUnDef, isNull } from '/@/utils/is';

export function useConfigProvider() {
  function transformCellText({ text }: { text: string }) {
    if (isNull(text) || isUnDef(text)) {
      return ' - ';
    }
    return text;
  }
  return {
    transformCellText,
  };
}