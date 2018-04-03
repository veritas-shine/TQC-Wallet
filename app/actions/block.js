// @flow
import request from '../utils/request'

type actionType = {
  +type: string
};

export const SEARCH_BLOCK = 'SEARCH_BLOCK'
export const SAVE_BLOCK_LIST = 'SAVE_BLOCK_LIST'

export function setCurrentBlock(payload) {
  return {
    type: SEARCH_BLOCK,
    payload
  };
}

export function saveBlockList(payload) {
  return {
    type: SAVE_BLOCK_LIST,
    payload
  }
}

export function searchBlockByID(data) {
  return (dispatch: (action: actionType) => void) => {
    request('/block/one', 'get', data)
      .then(response => {
        const { code, data } = response.data
        return dispatch(setCurrentBlock(data))
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function getBlockList() {
  return (dispatch: (action: actionType) => void) => {
    request('/block/list', 'get')
      .then(response => {
        const { code, data } = response.data
        return dispatch(saveBlockList(data))
      })
      .catch(e => {
        console.error(e)
      })
  }
}
