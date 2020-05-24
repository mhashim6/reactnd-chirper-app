import { showLoading, hideLoading } from 'react-redux-loading'
import { saveLikeToggle, saveTweet } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export const receiveTweets = tweets => ({
    type: RECEIVE_TWEETS,
    tweets,
})

const toggleTweet = ({ id, authedUser, hasLiked }) => ({
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
})

export const handleToggleTweet = tweet => dispatch => {
    dispatch(toggleTweet(tweet))
    saveLikeToggle(tweet).catch(() => {
        console.warn('Error in: handleToggleTweet')
        dispatch(toggleTweet(tweet))
        alert('There was an error liking the tweet. Try again!')
    })
}

const addTweet = tweet => ({
    type: ADD_TWEET,
    tweet
})

export const handleAddTweet = ({ text, replyingTo }) => (dispatch, getState) => {
    const { authedUser } = getState()

    showLoading()

    saveTweet({
        text,
        author: authedUser,
        replyingTo,
    }).then(savedTweet => {
        dispatch(addTweet(savedTweet))
    }).then(() => hideLoading())
        .catch(e => {
            console.error(e);
            console.warn('Error in: handleAddTweet')
            alert('There was an error saving the tweet. Try again!')
            hideLoading()
        })
}