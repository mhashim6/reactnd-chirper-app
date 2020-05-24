import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

class NewTweet extends Component {
    state = {
        text: ''
    }

    handleChange = e => {
        this.setState({ text: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { text } = this.state
        const { dispatch, parentId } = this.props
        dispatch(handleAddTweet({ text, replyingTo: parentId }))
        this.setState({
            text: ''
        })
    }

    render() {
        const text = this.state.text
        const tweetLeft = 280 - text.length
        return (
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea className='textarea'
                        placeholder="What's happening?"
                        value={text}
                        onChange={this.handleChange}
                        maxLength={280}
                    />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>{tweetLeft}</div>
                    )}
                    <button type='submit' className='btn' disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

const mapStatetoProps = (_, { parentId }) => ({
    parentId,
})

export default connect(mapStatetoProps)(NewTweet)