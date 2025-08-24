import { createActionWithPayload } from "../utils";

// action types
const NAVIGATION = "NAVIGATION";

// initial state
const initialState = { navigation: false };

export const navigateAction = (data: boolean) => {
  return createActionWithPayload(NAVIGATION, data);
};

// reducer
export const navigateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NAVIGATION:
      return {
        navigation: action.payload,
      };
    default:
      return state;
  }
};
