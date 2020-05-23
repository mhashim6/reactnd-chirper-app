import { combineReducers } from 'redux'

import { loadingBarReducer } from 'react-redux-loading'
import users from './users'
import tweets from './tweets'
import authedUser from './authedUser'


export default combineReducers({
    authedUser,
    users,
    tweets,
    loadingBar: loadingBarReducer
}) 