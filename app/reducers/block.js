// @flow
import { SAVE_BLOCK_LIST, SEARCH_BLOCK } from '../actions/block'

export type blockStateType = {
  +current: any,
  +list: [any]
};

type actionType = {
  +type: string,
  +payload: any
}

const initState: blockStateType = {
  current: {},
  list: []
}

export default function (state = initState, action: actionType) {
  switch (action.type) {
    case SEARCH_BLOCK:
      return {
        ...state,
        current: action.payload
      }
    case SAVE_BLOCK_LIST:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}
