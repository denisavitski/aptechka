import { clamp } from '@packages/client/utils'
import { NumberSetting } from './types'

export function getNumberSetting(
  setting?: NumberSetting<any, any>,
  defaultValue = 0
) {
  if (setting) {
    return clamp(setting.value, setting.min, setting.max)
  }

  return defaultValue
}
