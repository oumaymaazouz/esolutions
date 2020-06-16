import {groupBy} from '../../common/helper';

const initialState = {
  laborList: null,
};

/** FETCH ALL LABORS */

const FETCH_LABORS_REQUEST = 'FETCH_LABORS_REQUEST';

const fetchLaborsRequest = () => {
  return {
    type: FETCH_LABORS_REQUEST,
  };
};

const FETCH_LABORS_SUCCESS = 'FETCH_LABORS_SUCCESS';

const fetchLaborsSuccess = data => {
  return {
    type: FETCH_LABORS_SUCCESS,
    data,
  };
};

const FETCH_LABORS_FAILURE = 'FETCH_LABORS_FAILURE';

const fetchLaborsFailure = error => {
  return {
    type: FETCH_LABORS_FAILURE,
    error,
  };
};
export function $fetchLabors() {
  return function(dispatch, getState) {
    dispatch(fetchLaborsRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;
    return fetch(
      `${DOMAIN_NAME}/oslc/os/oslclabor?oslc.select=laborcode,person.firstname,person.lastname`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          maxauth,
        },
      },
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then(data => {
        dispatch(fetchLaborsSuccess(data['rdfs:member']));
      })
      .catch(error => {
        dispatch(fetchLaborsFailure(error));
        throw error;
      });
  };
}

/** REDUCER */
export function laborApprovalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LABORS_REQUEST:
      return {
        ...state,
        laborList: null,
      };
    case FETCH_LABORS_SUCCESS:
      return {
        ...state,
        laborList: action.data,
      };
    default:
      return state;
  }
}
