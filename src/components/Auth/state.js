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


/** LOGOUT */
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const logoutFailure = error => {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
};
//# logout function
function $logout() {
  return async function(dispatch, getState) {
    dispatch(logoutRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;
    try {
      const responselogout = await fetch(`${DOMAIN_NAME}/oslc/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          maxauth,
        },
      });
      if (!responselogout.ok) {
        throw Error(responselogout);
      }
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error));
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
    case LOGOUT_SUCCESS:
      return {
        ...state,
        DOMAIN_NAME: null,
        username: null,
        maxupg: null,
        maxauth: null,
        profile: null,
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

export {$login, $logout, $fetchProfile};
