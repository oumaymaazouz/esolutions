import {groupBy} from '../../common/helper';

const initialState = {
  monthlyLaborTransactions: null,
  laborTransactions: null,
  laborTransactionsPreview: null,
  crafts: null,
  projects: null,
  tasks: null,
};

/** FETCH LABOR TRANSACTIONS */

const FETCH_LABOR_TRANSACTIONS_REQUEST = 'FETCH_LABOR_TRANSACTIONS_REQUEST';

const fetchLaborTransactionsRequest = () => {
  return {
    type: FETCH_LABOR_TRANSACTIONS_REQUEST,
  };
};

const FETCH_LABOR_TRANSACTIONS_SUCCESS = 'FETCH_LABOR_TRANSACTIONS_SUCCESS';

const fetchLaborTransactionsSuccess = data => {
  return {
    type: FETCH_LABOR_TRANSACTIONS_SUCCESS,
    data,
  };
};

const FETCH_LABOR_TRANSACTIONS_FAILURE = 'FETCH_LABOR_TRANSACTIONS_FAILURE';

const fetchLaborTransactionsFailure = error => {
  return {
    type: FETCH_LABOR_TRANSACTIONS_FAILURE,
    error,
  };
};
export function $fetchLaborTransactions() {
  return function(dispatch, getState) {
    dispatch(fetchLaborTransactionsRequest());
    const {DOMAIN_NAME, maxauth, profile} = getState().Auth;
    return fetch(
      `${DOMAIN_NAME}/oslc/os/oslclabtrans?oslc.select=labtransid,laborcode,transdate,regularhrs,startdateentered,genapprservreceipt,craft,workorder.description,workorder.taskid,workordernt.description,workordernt.wonum&oslc.where=laborcode="${
        profile.personid
      }"`,
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
        dispatch(fetchLaborTransactionsSuccess(data['rdfs:member']));
      })
      .catch(error => {
        dispatch(fetchLaborTransactionsFailure(error));
        throw error;
      });
  };
}

/** FETCH CRAFTS */

const FETCH_CRAFTS_REQUEST = 'FETCH_CRAFTS_REQUEST';

const fetchCraftsRequest = () => {
  return {
    type: FETCH_CRAFTS_REQUEST,
  };
};

const FETCH_CRAFTS_SUCCESS = 'FETCH_CRAFTS_SUCCESS';

const fetchCraftsSuccess = data => {
  return {
    type: FETCH_CRAFTS_SUCCESS,
    data,
  };
};

const FETCH_CRAFTS_FAILURE = 'FETCH_CRAFTS_FAILURE';

const fetchCraftsFailure = error => {
  return {
    type: FETCH_CRAFTS_FAILURE,
    error,
  };
};
export function $fetchCrafts() {
  return function(dispatch, getState) {
    dispatch(fetchCraftsRequest());
    const {DOMAIN_NAME, maxauth, profile} = getState().Auth;
    return fetch(
      `${DOMAIN_NAME}/oslc/os/oslccraft?oslc.select=craft,description&oslc.where=laborcraftrate.laborcode=${
        profile.personid
      }`,
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
        dispatch(fetchCraftsSuccess(data['rdfs:member']));
      })
      .catch(error => {
        dispatch(fetchCraftsFailure(error));
        throw error;
      });
  };
}

/** FETCH Projects */

const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';

const fetchProjectsRequest = () => {
  return {
    type: FETCH_PROJECTS_REQUEST,
  };
};

const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';

const fetchProjectsSuccess = data => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    data,
  };
};

const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

const fetchProjectsFailure = error => {
  return {
    type: FETCH_PROJECTS_FAILURE,
    error,
  };
};
export function $fetchProjects() {
  return function(dispatch, getState) {
    dispatch(fetchProjectsRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;
    return fetch(
      `${DOMAIN_NAME}/oslc/os/oslcwo?oslc.select=wonum,description&oslc.where=istask=0+and+status="appr"&oslc.orderBy=-wonum`,
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
        dispatch(fetchProjectsSuccess(data['rdfs:member']));
      })
      .catch(error => {
        dispatch(fetchProjectsFailure(error));
        throw error;
      });
  };
}

/** FETCH TASKS */

const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';

const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST,
  };
};

const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';

const fetchTasksSuccess = data => {
  return {
    type: FETCH_TASKS_SUCCESS,
    data,
  };
};

const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

const fetchTasksFailure = error => {
  return {
    type: FETCH_TASKS_FAILURE,
    error,
  };
};
export function $fetchTasks(parent) {
  return function(dispatch, getState) {
    dispatch(fetchTasksRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;
    return fetch(
      `${DOMAIN_NAME}/oslc/os/oslcwo?oslc.select=taskid,description&oslc.where=istask=1+and+parent=${parent}`,
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
        dispatch(fetchTasksSuccess(data['rdfs:member']));
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));
        throw error;
      });
  };
}

/** ADD TRANSACTIONS */
const ADD_BULK_LABOR_TRANSACTIONS_REQUEST =
  'ADD_BULK_LABOR_TRANSACTIONS_REQUEST';

const AddBulkLaborTransactionsRequest = () => {
  return {
    type: ADD_BULK_LABOR_TRANSACTIONS_REQUEST,
  };
};

const ADD_BULK_LABOR_TRANSACTIONS_SUCCESS =
  'ADD_BULK_LABOR_TRANSACTIONS_SUCCESS';

const AddBulkLaborTransactionsSuccess = () => {
  return {
    type: ADD_BULK_LABOR_TRANSACTIONS_SUCCESS,
  };
};

const ADD_BULK_LABOR_TRANSACTIONS_FAILURE =
  'ADD_BULK_LABOR_TRANSACTIONS_FAILURE';

const AddBulkLaborTransactionsFailure = error => {
  return {
    type: ADD_BULK_LABOR_TRANSACTIONS_FAILURE,
    error,
  };
};
export function $AddBulkLaborTransactions(transaction) {
  return function(dispatch, getState) {
    dispatch(AddBulkLaborTransactionsRequest());
    const {DOMAIN_NAME, maxauth, profile} = getState().Auth;

    transaction = {
      siteid: profile.defaultSite,
      laborcode: profile.personid,
      ...transaction,
    };

    const array = Object.entries(transaction).map(([key, value]) => [
      ['spi:', key].join(''),
      value,
    ]);

    const payload = JSON.stringify(Object.fromEntries(array));

    return fetch(`${DOMAIN_NAME}/oslc/os/oslclabtrans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        maxauth,
        lean: '1',
      },
      body: payload,
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.text();
      })
      .then(() => {
        dispatch(AddBulkLaborTransactionsSuccess());
      })
      .catch(error => {
        dispatch(AddBulkLaborTransactionsFailure(error));
        throw error;
      });
  };
}

const DELETE_TRANSACTION_REQUEST = 'DELETE_TRANSACTION_REQUEST';

const deleteTransactionRequest = () => {
  return {
    type: DELETE_TRANSACTION_REQUEST,
  };
};

const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';

const deleteTransactionSuccess = () => {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
  };
};

const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';

const deleteTransactionFailure = error => {
  return {
    type: DELETE_TRANSACTION_FAILURE,
    error,
  };
};
export function $deleteTransaction(id) {
  return function(dispatch, getState) {
    dispatch(deleteTransactionRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;

    return fetch(`${DOMAIN_NAME}/oslc/os/oslclabtrans/${id}`, {
      method: 'DELETE',
      headers: {
        maxauth,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.text();
      })
      .then(() => {
        dispatch(deleteTransactionSuccess());
      })
      .catch(error => {
        dispatch(deleteTransactionFailure(error));
        throw error;
      });
  };
}

/** Preview labor transactions before adding them in the server */

const PREVIEW_TRANSACTIONS_LIST = 'PREVIEW_TRANSACTIONS_LIST';
export const $previewTransactionsList = data => {
  return {
    type: PREVIEW_TRANSACTIONS_LIST,
    data,
  };
};

// 2- Create reducer
export function laborReducer(state = initialState, action) {
  switch (action.type) {
    // case FETCH_LABOR_TRANSACTIONS_REQUEST:
    //   return {
    //     ...state,
    //     laborTransactions: null,
    //   };
    case FETCH_LABOR_TRANSACTIONS_SUCCESS:
      const laborTransactions = action.data;
      const transArray =
        laborTransactions &&
        laborTransactions.map(trans => {
          return {
            ...trans,
            month: trans['spi:startdateentered'].substring(0, 7),
          };
        });
      const monthlyLaborTransactions = groupBy(transArray, 'month');
      const monthlyLabTransDesc = Object.keys(monthlyLaborTransactions)
        .sort((a, b) => new Date(b) - new Date(a))
        .reduce((acc, cv) => {
          acc[cv] = monthlyLaborTransactions[cv];
          return acc;
        }, {});

      return {
        ...state,
        laborTransactions,
        monthlyLaborTransactions: monthlyLabTransDesc,
      };
    case FETCH_CRAFTS_SUCCESS:
      return {
        ...state,
        crafts: action.data,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.data,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.data,
      };
    case PREVIEW_TRANSACTIONS_LIST:
      return {
        ...state,
        laborTransactionsPreview: action.data,
      };
    default:
      return state;
  }
}
