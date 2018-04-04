// @flow
import pqccore from 'pqc-core'
import request from '../utils/request'

const { Network } = pqccore

type actionType = {
  +type: string
};

export const SET_SERVER_CONFIG = 'SET_SERVER_CONFIG'

export function setServerConfig(payload) {
  const { network, ...rest } = payload
  const obj = {...Network[network], name: network}
  return {
    type: SET_SERVER_CONFIG,
    payload: {
      ...rest,
      network: obj
    }
  };
}

export function getServerConfig() {
  return (dispatch: (action: actionType) => void) => {
    request('/server/config', 'get')
      .then(response => {
        const { code, data } = response.data
        return dispatch(setServerConfig(data))
      })
      .catch(e => {
        console.error(e)
      })
  }
}
