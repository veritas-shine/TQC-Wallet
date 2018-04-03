// @flow
import request from '../utils/request'

type actionType = {
  +type: string
};

export const SEARCH_TX = 'SEARCH_TX'
export const SAVE_TX_LIST = 'SAVE_TX_LIST'

export function setCurrentTX(payload) {
  return {
    type: SEARCH_TX,
    payload
  };
}

export function saveTXList(payload) {
  return {
    type: SAVE_TX_LIST,
    payload
  }
}

export function searchTransactionByID(data) {
  return (dispatch: (action: actionType) => void) => {
    request('/transaction/one', 'get', data)
      .then(response => {
        const { code, data } = response.data
        return dispatch(setCurrentTX(data))
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function getTransactionList() {
  return (dispatch: (action: actionType) => void) => {
    request('/transaction/list', 'get')
      .then(response => {
        const { code, data } = response.data
        return dispatch(saveTXList(data))
      })
      .catch(e => {
        console.error(e)
      })
  }
}
