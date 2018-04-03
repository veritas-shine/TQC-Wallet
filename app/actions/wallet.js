// @flow
import request from '../utils/request'

type actionType = {
  +type: string
};

export const SET_WALLET = 'SET_WALLET'
export const LOCK_WALLET = 'LOCK_WALLET'
export const UNLOCK_WALLET = 'UNLOCK_WALLET'

export function setWallet(wallet) {
  return {
    type: SET_WALLET,
    payload: wallet
  };
}

export function getCurrentWallet() {
  return (dispatch: (action: actionType) => void) => {
    request('/wallet/detail', 'get')
      .then(response => {
        const { code, data } = response.data
        return dispatch(setWallet(data))
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function lockWallet() {
  return (dispatch: (action: actionType) => void) => {
    request('/wallet/lock', 'post')
      .then(response => {
        const { code } = response.data
        return dispatch({
          type: LOCK_WALLET
        })
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function unlockWallet(data) {
  return (dispatch: (action: actionType) => void) => {
    request('/wallet/unlock', 'post', data)
      .then(response => {
        const { code, data } = response.data
        return dispatch({
          type: UNLOCK_WALLET,
          payload: data
        })
      })
      .catch(e => {
        console.error(e)
      })
  }
}
