import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='message' id={this.props.id}>
                <div className='message-header'>
                    <span className='message-username'>{this.props.username}</span>
                    <span className='message-date'>{this.props.date}</span>
                </div>
                <div className='message-text'>{this.props.text}</div>
                <div className='divider'></div>
            </div>
        )
    }
}

export default Message;