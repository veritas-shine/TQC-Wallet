// @flow
import { LOCK_WALLET, SET_WALLET, UNLOCK_WALLET } from '../actions/wallet';

export type walletStateType = {
  +current: any,
  +locked: boolean
};

type actionType = {
  +type: string,
  +payload: any
}

const initState: walletStateType = {
  current: {},
  locked: true
}

export default function (state = initState, action: actionType) {
  switch (action.type) {
    case SET_WALLET:
      return {
        ...state,
        current: action.payload
      }
    case LOCK_WALLET:
      return {
        ...state,
        locked: true,
        current: {
          encrypted: true
        }
      }
    case UNLOCK_WALLET:
      return {
        ...state,
        locked: false,
        current: action.payload
      }
    default:
      return state;
  }
}
