import { getGlobEnvConfig, } from '/@/utils/globEnvConfig'
import { GlobConfig } from '/@/types/config'

const { BASE_URL, VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_TITLE } = getGlobEnvConfig()


export function useSetting(): GlobConfig {
  return {
    title: VITE_GLOB_APP_TITLE,
    shortName: VITE_GLOB_APP_SHORT_TITLE,
    publicPath: BASE_URL,
  }
}