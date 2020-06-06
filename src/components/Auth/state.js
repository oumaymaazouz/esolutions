import {base64} from '../../common/helper';

const initialState = {
  maxupg: null,
  maxauth: null,
  profile: null,
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
function $login(username, password) {
  return function(dispatch, getState) {
    dispatch(loginRequest());
    const DOMAIN_NAME = getState().SystemConfig.DOMAIN_NAME;
    const maxauth = base64(`${username}:${password}`);
    return fetch(`${DOMAIN_NAME}/oslc/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        maxauth,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then(payload => {
        dispatch(loginSuccess({...payload, username, maxauth}));
        return payload;
      })
      .catch(error => {
        dispatch(loginFailure(error));
        throw error;
      });
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
  return function(dispatch, getState) {
    dispatch(fetchProfileRequest());
    const DOMAIN_NAME = getState().SystemConfig.DOMAIN_NAME;
    return fetch(`${DOMAIN_NAME}/oslc/whoami`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        maxauth,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then(data => {
        dispatch(fetchProfileSuccess(data));
      })
      .catch(error => {
        dispatch(fetchProfileFailure(error));
        throw error;
      });
  };
}

// 2- Create reducer
export function authReducer(state = initialState, action) {
  switch (action.type) {
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
