// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'
import wallet from './wallet'
import block from './block'
import transaction from './transaction'

const rootReducer = combineReducers({
  counter,
  wallet,
  block,
  transaction,
  router,
});

export default rootReducer;
