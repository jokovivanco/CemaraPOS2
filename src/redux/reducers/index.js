import { combineReducers } from 'redux'

import user from './user'
import roles from './roles'
import products from './products'
import invoices from './invoices'
import assets from './assets'
import promos from './promos'

const rootReducer = combineReducers({
  user,
  roles,
  products,
  invoices,
  assets,
  promos
})

export default rootReducer