const initialState = {
  tickets: null,
  ticketDetails: null,
};

// Fetch tickets

const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST';

function fetchTicketsRequest() {
  return {type: FETCH_TICKETS_REQUEST};
}

const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';

function fetchTicketsSuccess(data) {
  return {type: FETCH_TICKETS_SUCCESS, data};
}

const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';

function fetchTicketsfailure(error) {
  return {type: FETCH_TICKETS_FAILURE, error};
}

export function $fetchTickets() {
  return function(dispatch, getState) {
    dispatch(fetchTicketsRequest());
    const {DOMAIN_NAME} = getState().Auth;
    const promise = fetch(
      `${DOMAIN_NAME}/oslc/os/mxsr?oslc.select=description,ticketid,status_description,status,reportedby,reportdate,assetorgid,reportedpriority_description`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          maxauth: getState().Auth.maxauth,
        },
      },
    );

    return promise
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then(data => {
        dispatch(fetchTicketsSuccess(data['rdfs:member']));
      })
      .catch(error => dispatch(fetchTicketsfailure(error)))
      .finally(() => console.log('FETCH TICKETS DONE'));
  };
}

// Fetch ticketDetails

const FETCH_TICKET_DETAILS_REQUEST = 'FETCH_TICKET_DETAILS_REQUEST';

function fetchTicketDetailsRequest() {
  return {type: FETCH_TICKET_DETAILS_REQUEST};
}

const FETCH_TICKET_DETAILS_SUCCESS = 'FETCH_TICKET_DETAILS_SUCCESS';

function fetchTicketDetailsSuccess(data) {
  return {type: FETCH_TICKET_DETAILS_SUCCESS, data};
}

const FETCH_TICKET_DETAILS_FAILURE = 'FETCH_TICKET_DETAILS_FAILURE';

function fetchTicketDeatailsfailure(error) {
  return {type: FETCH_TICKET_DETAILS_FAILURE, error};
}

export function $fetchTicketDetails(itemEndpoint) {
  return function(dispatch, getState) {
    dispatch(fetchTicketDetailsRequest());
    const promise = fetch(itemEndpoint, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        maxauth: getState().Auth.maxauth,
      },
    });

    return promise
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then(data => {
        dispatch(fetchTicketDetailsSuccess(data));
      })
      .catch(error => dispatch(fetchTicketDeatailsfailure(error)))
      .finally(() => console.log('FETCH TICKET DETAILS DONE'));
  };
}

export const TicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return {
        ...state,
        tickets: null,
      };
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.data,
      };
    case FETCH_TICKET_DETAILS_REQUEST:
      return {
        ...state,
        ticketDetails: null,
      };
    case FETCH_TICKET_DETAILS_SUCCESS:
      return {
        ...state,
        ticketDetails: action.data,
      };
    default:
      return state;
  }
};
