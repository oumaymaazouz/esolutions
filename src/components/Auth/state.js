import {base64} from '../../common/helper';

const initialState = {
  DOMAIN_NAME: null,
  maxupg: null,
  maxauth: null,
  profile: null,
};

const SAVE_DOMAIN = 'SAVE_DOMAIN';

export const $saveDomain = apiEndpoint => {
  return {
    type: SAVE_DOMAIN,
    data: apiEndpoint,
  };
};

// 1-  Create action types + action creators of login
const LOGIN_REQUEST = 'LOGIN_REQUEST';

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
};

const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};
//# login function
function $login(domain, username, password) {
  return async function(dispatch) {
    dispatch($saveDomain(domain));
    dispatch(loginRequest());
    const maxauth = base64(`${username}:${password}`);
    try {
      const responseLogin = await fetch(`${domain}/oslc/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          maxauth,
        },
      });
      if (!responseLogin.ok) {
        throw Error(responseLogin);
      }
      const payload = await responseLogin.json();

      dispatch(loginSuccess({...payload, username, maxauth}));

      await dispatch($fetchProfile(maxauth));
    } catch (error) {
      dispatch(loginFailure(error));
      throw error;
    }
  };
}

// 1-  Create action types + action creators of login
const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';

const fetchProfileRequest = () => {
  return {
    type: FETCH_PROFILE_REQUEST,
  };
};

const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';

const fetchProfileSuccess = data => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    data,
  };
};

const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

const fetchProfileFailure = error => {
  return {
    type: FETCH_PROFILE_FAILURE,
    error,
  };
};
//# fetchProfile function
function $fetchProfile(maxauth) {
  return async function(dispatch, getState) {
    dispatch(fetchProfileRequest());
    const {DOMAIN_NAME} = getState().Auth;
    try {
      const response = await fetch(`${DOMAIN_NAME}/oslc/whoami`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          maxauth,
        },
      });

      if (!response.ok) {
        throw Error(response);
      }

      const payload = await response.json();

      return dispatch(fetchProfileSuccess(payload));
    } catch (error) {
      dispatch(fetchProfileFailure(error));
      throw error;
    }
  };
}

// 2- Create reducer
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_DOMAIN:
      return {
        ...state,
        DOMAIN_NAME: action.data,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.data.username,
        maxupg: action.data.maxupg,
        maxauth: action.data.maxauth,
      };
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        profile: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.data,
      };
    default:
      return state;
  }
}

export {$login, $fetchProfile};
