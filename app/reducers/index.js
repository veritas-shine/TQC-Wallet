// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import wallet from './wallet'
import block from './block'
import transaction from './transaction'
import server from './server'

const rootReducer = combineReducers({
  wallet,
  block,
  transaction,
  server,
  router,
});

export default rootReducer;
