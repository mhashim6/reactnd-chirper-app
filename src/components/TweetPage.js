import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends Component {

    render() {
        const { id, replies } = this.props

        return (
            <div>
                <Tweet tweetID={id} />
                <NewTweet parentId={id}/>
                <div className='center'>
                    <h3>Replies</h3>
                    <ul >
                        {replies.map(r => (
                            <li key={r}>
                                <Tweet tweetID={r} />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({ tweets }, { match }) => {
    const { id } = match.params
    return {
        id,
        replies: !tweets[id] ? [] : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)