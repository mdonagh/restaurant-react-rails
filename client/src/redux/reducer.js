import ACTIONS from "./actions";
import _ from "lodash";

const defaultState = {
  tokenAuthHeaders: { "token-type":   "Bearer" }
};

const authTokenReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UPDATE_TOKEN: {
      console.log(action);
      let newHeaders = action.payload;
      let newState = _.cloneDeep(state);
      newState.tokenAuthHeaders = {...newState.tokenAuthHeaders, ...newHeaders};
      return newState;
    }

    default:
      return state;
  }
};

export default authTokenReducer;