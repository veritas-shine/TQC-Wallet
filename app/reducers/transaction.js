// @flow
import { SEARCH_TX, SAVE_TX_LIST } from '../actions/transaction'

export type txStateType = {
  +current: any,
  +list: [any]
};

type actionType = {
  +type: string,
  +payload: any
}

const initState: txStateType = {
  current: {},
  list: []
}

export default function (state = initState, action: actionType) {
  switch (action.type) {
    case SEARCH_TX:
      return {
        ...state,
        current: action.payload
      }
    case SAVE_TX_LIST:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}
