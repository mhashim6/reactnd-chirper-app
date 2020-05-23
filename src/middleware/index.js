import ReduxThunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import logger from './logger'


export default applyMiddleware(ReduxThunk, logger)
