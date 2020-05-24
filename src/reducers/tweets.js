import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets"

const tweets = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TWEETS: return { ...state, ...action.tweets }
        case TOGGLE_TWEET: {
            const likedTweet = state[action.id]
            return {
                ...state, [action.id]: {
                    ...likedTweet,
                    likes: action.hasLiked // has already like the tweet
                        ? likedTweet.likes.filter(id => id !== action.authedUser)
                        : likedTweet.likes.concat(action.authedUser)
                }
            }
        }
        case ADD_TWEET:
            const { tweet } = action
            let parent = {}
            if (tweet.replyingTo !== null) {
                const currentParent = state[tweet.replyingTo]
                parent = {
                    [tweet.replyingTo]: {
                        ...currentParent,
                        replies: currentParent.replies.concat(tweet.id)
                    }
                }
            }
            return { ...state, [tweet.id]: tweet, ...parent }
        default: return state
    }
}
export default tweets