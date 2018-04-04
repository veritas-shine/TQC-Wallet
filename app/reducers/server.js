// @flow
import { SET_SERVER_CONFIG } from '../actions/server'

export type serverStateType = {
  +config: any
};

type actionType = {
  +type: string,
  +payload: any
}

const initState: serverStateType = {
  config: {}
}

export default function (state = initState, action: actionType) {
  switch (action.type) {
    case SET_SERVER_CONFIG:
      return {
        ...state,
        config: action.payload
      }
    default:
      return state;
  }
}
