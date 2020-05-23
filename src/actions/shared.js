import { getInitalData } from "../utils/api"
import { receiveTweets } from "./tweets"
import { receiveUsers } from "./users"
import { setAuthedUser } from "./authedUser";
const AUTHED_USER_ID = 'tylermcginnis'

export const handleInitialData = () => dispatch => {
    return getInitalData().then(({ users, tweets }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_USER_ID))
    })
}