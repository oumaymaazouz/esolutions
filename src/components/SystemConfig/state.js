const initialState = {
  DOMAIN_NAME: null,
};

const SAVE_DOMAIN = 'SAVE_DOMAIN';

export const $saveDomain = apiEndpoint => {
  return {
    type: SAVE_DOMAIN,
    data: apiEndpoint,
  };
};

// 2- Create reducer
export function ServerConnectReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_DOMAIN:
      return {
        ...state,
        DOMAIN_NAME: action.data,
      };
    default:
      return state;
  }
}
