import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index'

import { handleToggleTweet } from '../actions/tweets'
import { formatTweet, formatDate } from '../utils/helpers'

class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault()
    }

    handleLike = (e) => {
        e.preventDefault()
        const { dispatch, tweet, authedUser } = this.props
        dispatch(handleToggleTweet({
            id: tweet.id, authedUser, hasLiked: tweet.hasLiked,
        }))
    }

    render() {
        const { tweet } = this.props

        if (tweet === null)
            return <p>This tweet doesn't exist</p>

        const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } = tweet
        return (
            <div className='tweet' >
                <img className='avatar'
                    src={avatar} alt={`Avatar of ${name}`} />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to'
                                onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={(e) => this.handleLike(e)} >
                            {hasLiked
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon' />}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, tweets, users }, { tweetID }) => {
    const tweet = tweets[tweetID]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
}

export default connect(mapStateToProps)(Tweet)