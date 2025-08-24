import { createAction } from '../utils'

// common
export const COMMON_RESET_DATA_ACTION = 'COMMON/RESET_DATA'

export const clearDataAction = () => {
  return createAction(COMMON_RESET_DATA_ACTION)
}
