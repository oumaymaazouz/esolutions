import {groupByProperty} from '../../common/helper';

const initialState = {
  laborList: null,
  laborTransactions: null,
  monthlyLaborTransactions: null,
  selectedTransactions: [],
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
export function $fetchLaborTransactions(laborcode) {
  return function(dispatch, getState) {
    dispatch(fetchLaborTransactionsRequest());
    const {DOMAIN_NAME, maxauth} = getState().Auth;
    return fetch(
      `${DOMAIN_NAME}/oslc/os/oslclabtrans?oslc.select=labtransid,laborcode,transdate,regularhrs,startdateentered,genapprservreceipt,craft,workorder.description,workorder.taskid,workordernt.description,workordernt.wonum&oslc.where=laborcode="${laborcode}"`,
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

/** SAVE SELECTED TRANSACTIONS IN AN ARRAY (FOR APPROVAL) */
const SAVE_TRANSACTION = 'SAVE_TRANSACTION';

export function $saveTransaction(id) {
  return {
    type: SAVE_TRANSACTION,
    data: id,
  };
}

/** REMOVE UNSELECTED TRANSACTIONS IN AN ARRAY (FOR APPROVAL) */
const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

export function $removeTransaction(id) {
  return {
    type: REMOVE_TRANSACTION,
    data: id,
  };
}

/** REMOVE all SELECTED TRANSACTIONS */
const REMOVE_ALL_TRANSACTIONS = 'REMOVE_ALL_TRANSACTIONS';

export function $removeAllTransactions() {
  return {
    type: REMOVE_ALL_TRANSACTIONS,
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
    case FETCH_LABOR_TRANSACTIONS_REQUEST:
      return {
        ...state,
        laborTransactions: null,
        monthlyLaborTransactions: null,
      };
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
      const monthlyLaborTransactions = groupByProperty(transArray, 'month');
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
    case SAVE_TRANSACTION:
      return {
        ...state,
        selectedTransactions: [...state.selectedTransactions, action.data],
      };
    case REMOVE_TRANSACTION:
      return {
        ...state,
        selectedTransactions: state.selectedTransactions.filter(
          id => id !== action.data,
        ),
      };
    case REMOVE_ALL_TRANSACTIONS:
      return {
        ...state,
        selectedTransactions: [],
      };
    default:
      return state;
  }
}
