const initialState = {
  list: null,
  queries: null,
  classifications: null,
  activeParent: null,
};

/** FETCH ALL ATTACHMENTS OF SERVICE REQUESTS */

const FETCH_ALL_ATTACHMENTS_REQUEST = 'FETCH_ALL_ATTACHMENTS_REQUEST';

const fetchAllAttRequest = () => {
  return {
    type: FETCH_ALL_ATTACHMENTS_REQUEST,
  };
};

const FETCH_ALL_ATTACHMENTS_SUCCESS = 'FETCH_ALL_ATTACHMENTS_SUCCESS';

const fetchAllAttSuccess = data => {
  return {
    type: FETCH_ALL_ATTACHMENTS_SUCCESS,
    data,
  };
};

const FETCH_ALL_ATTACHMENTS_FAILURE = 'FETCH_ALL_ATTACHMENTS_FAILURE';

const fetchAllAttFailure = () => {
  return {
    type: FETCH_ALL_ATTACHMENTS_FAILURE,
  };
};

export function fetchAllAtt(urlsWithTicketIds) {
  return function(dispatch, getState) {
    dispatch(fetchAllAttRequest());
    const {maxauth} = getState().Auth;

    urlsWithTicketIds.map(async item => {
      try {
        const response = await fetch(`${item.url}/doclinks`, {
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
        return dispatch(
          fetchAllAttSuccess({
            ticketid: item.ticketid,
            payload: payload['rdfs:member'],
          }),
        );
      } catch (error) {
        dispatch(fetchAllAttFailure());
      }
    });
  };
}

/** FETCH ALL SR */

const FETCH_SR_REQUEST = 'FETCH_SR_REQUEST';

const fetchSrRequest = () => {
  return {
    type: FETCH_SR_REQUEST,
  };
};

const FETCH_SR_SUCCESS = 'FETCH_SR_SUCCESS';

const fetchSrSuccess = data => {
  return {
    type: FETCH_SR_SUCCESS,
    data,
  };
};

const FETCH_SR_FAILURE = 'FETCH_SR_FAILURE';

const fetchSrFailure = error => {
  return {
    type: FETCH_SR_FAILURE,
    error,
  };
};

export function $fetchSr() {
  return async function(dispatch, getState) {
    dispatch(fetchSrRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;

    try {
      const response = await fetch(
        `${DOMAIN_NAME}/oslc/os/ZZSR?oslc.select=ticketid,description,assetnum,asset.description,location,location.description,description_longdescription,status,reportdate,reportedby,statusdate,classstructure._imagelibref,worklog&oslc.orderBy=-ticketid`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            maxauth,
          },
        },
      );

      if (!response.ok) {
        throw Error(response);
      }
      const payload = await response.json();

      await dispatch(fetchSrSuccess(payload['rdfs:member']));

      const urlsWithTicketIds = await payload['rdfs:member'].map(item => ({
        ticketid: item['spi:ticketid'],
        url: item['rdf:about'],
      }));
      await dispatch(fetchAllAtt(urlsWithTicketIds));
    } catch (error) {
      dispatch(fetchSrFailure(error));
      throw error;
    }
  };
}

/** FETCH QUERIES */

const FETCH_QUERIES_REQUEST = 'FETCH_QUERIES_REQUEST';

const fetchQueriesRequest = () => {
  return {
    type: FETCH_QUERIES_REQUEST,
  };
};

const FETCH_QUERIES_SUCCESS = 'FETCH_QUERIES_SUCCESS';

const fetchQueriesSuccess = data => {
  return {
    type: FETCH_QUERIES_SUCCESS,
    data,
  };
};

const FETCH_QUERIES_FAILURE = 'FETCH_QUERIES_FAILURE';

const fetchQueriesFailure = error => {
  return {
    type: FETCH_QUERIES_FAILURE,
    error,
  };
};

export function $fetchQueries() {
  return async function(dispatch, getState) {
    dispatch(fetchQueriesRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;

    try {
      const response = await fetch(`${DOMAIN_NAME}/oslc/apimeta/zzsr`, {
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

      await dispatch(fetchQueriesSuccess(payload.queryCapability));
    } catch (error) {
      dispatch(fetchQueriesFailure(error));
      throw error;
    }
  };
}

/** FETCH CLASSIFICATIONS */

const FETCH_CLASSIFICATIONS_REQUEST = 'FETCH_CLASSIFICATIONS_REQUEST';

const fetchClassificationsRequest = () => {
  return {
    type: FETCH_CLASSIFICATIONS_REQUEST,
  };
};

const FETCH_CLASSIFICATIONS_SUCCESS = 'FETCH_CLASSIFICATIONS_SUCCESS';

const fetchClassificationsSuccess = data => {
  return {
    type: FETCH_CLASSIFICATIONS_SUCCESS,
    data,
  };
};

const FETCH_CLASSIFICATIONS_FAILURE = 'FETCH_CLASSIFICATIONS_FAILURE';

const fetchClassificationsFailure = error => {
  return {
    type: FETCH_CLASSIFICATIONS_FAILURE,
    error,
  };
};

export function $fetchClassifications() {
  return async function(dispatch, getState) {
    dispatch(fetchClassificationsRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;

    try {
      const response = await fetch(
        `${DOMAIN_NAME}/oslc/os/zzclass?oslc.select=classstructureid,classificationid,description,hasparent,haschildren&oslc.where=parent!="*"+and+classusewith.objectname="SR"+and+show=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            maxauth,
          },
        },
      );

      if (!response.ok) {
        throw Error(response);
      }
      const payload = await response.json();

      await dispatch(fetchClassificationsSuccess(payload['rdfs:member']));
    } catch (error) {
      dispatch(fetchClassificationsFailure(error));
      throw error;
    }
  };
}

/** FETCH SUB CLASSIFICATIONS */

const FETCH_SUB_CLASSIFICATIONS_REQUEST = 'FETCH_SUB_CLASSIFICATIONS_REQUEST';

const fetchSubClassificationsRequest = () => {
  return {
    type: FETCH_SUB_CLASSIFICATIONS_REQUEST,
  };
};

const FETCH_SUB_CLASSIFICATIONS_SUCCESS = 'FETCH_SUB_CLASSIFICATIONS_SUCCESS';

const fetchSubClassificationsSuccess = data => {
  return {
    type: FETCH_SUB_CLASSIFICATIONS_SUCCESS,
    data,
  };
};

const FETCH_SUB_CLASSIFICATIONS_FAILURE = 'FETCH_SUB_CLASSIFICATIONS_FAILURE';

const fetchSubClassificationsFailure = error => {
  return {
    type: FETCH_SUB_CLASSIFICATIONS_FAILURE,
    error,
  };
};

export function $fetchSubClassifications(parentId) {
  return async function(dispatch, getState) {
    dispatch(fetchSubClassificationsRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;

    try {
      const response = await fetch(
        `${DOMAIN_NAME}/oslc/os/zzclass?oslc.select=classstructureid,classificationid,description,hasparent,haschildren,hierarchypath&oslc.where=parent=${parentId}+and+classusewith.objectname="SR"+and+show=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            maxauth,
          },
        },
      );

      if (!response.ok) {
        throw Error(response);
      }
      const payload = await response.json();

      await dispatch(
        fetchSubClassificationsSuccess({
          parentId,
          payload: payload['rdfs:member'],
        }),
      );
    } catch (error) {
      dispatch(fetchSubClassificationsFailure(error));
      throw error;
    }
  };
}

/** FETCH ALL ATTACHMENTS */

const FETCH_ATTACHMENTS_REQUEST = 'FETCH_ATTACHMENTS_REQUEST';

const fetchAttRequest = () => {
  return {
    type: FETCH_ATTACHMENTS_REQUEST,
  };
};

const FETCH_ATTACHMENTS_SUCCESS = 'FETCH_ATTACHMENTS_SUCCESS';

const fetchAttSuccess = data => {
  return {
    type: FETCH_ATTACHMENTS_SUCCESS,
    data,
  };
};

const FETCH_ATTACHMENTS_FAILURE = 'FETCH_ATTACHMENTS_FAILURE';

const fetchAttFailure = error => {
  return {
    type: FETCH_ATTACHMENTS_FAILURE,
    error,
  };
};

export function $fetchAtt(url) {
  return async function(dispatch, getState) {
    dispatch(fetchAttRequest());
    const {maxauth} = getState().Auth;

    try {
      const response = await fetch(`${url}/doclinks`, {
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

      await dispatch(fetchAttSuccess(payload['rdfs:member']));
    } catch (error) {
      dispatch(fetchAttFailure(error));
      throw error;
    }
  };
}

/** REDUCER */
export function serviceRequestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SR_SUCCESS:
      return {
        ...state,
        list: action.data,
      };
    case FETCH_QUERIES_SUCCESS:
      return {
        ...state,
        queries: action.data,
      };
    case FETCH_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        classifications: action.data,
      };
    case FETCH_SUB_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        activeParent: {
          ...state.classifications.find(
            item => item['spi:classstructureid'] === action.data.parentId,
          ),
          children: action.data.payload,
        },
      };
    case FETCH_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        attachments: action.data,
      };
    case FETCH_ALL_ATTACHMENTS_SUCCESS: {
      const list = state.list;
      const selectedSR = list.find(
        item => item['spi:ticketid'] === action.data.ticketid,
      );
      selectedSR.attachments = action.data.payload;
      const foundIndex = list.findIndex(item => {
        item['spi:ticketid'] === selectedSR['spi:ticketid'];
      });
      list[foundIndex] = selectedSR;
      return {
        ...state,
        list,
      };
    }

    default:
      return state;
  }
}
