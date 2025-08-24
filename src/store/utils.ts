/**
 * Creates a Redux action with a payload.
 *
 * @param {string} type - The type of the action.
 * @param {any} payload - The payload for the action.
 *
 * @returns {Object} The action object.
 */
export const createActionWithPayload = (type, payload) => {
  const actionData = {
    type,
    payload,
  }

  return actionData
}

/**
 * Creates a Redux action without a payload.
 *
 * @param {string} type - The type of the action.
 *
 * @returns {Object} The action object.
 */
export const createAction = (type) => {
  const actionData = {
    type,
  }
  return actionData
}
