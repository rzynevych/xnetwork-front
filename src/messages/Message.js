import React from 'react';
import s from './Message.module.css';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.message} id={this.props.id}>
                <div className={s.message__header}>
                    <span className={s.message__username}>{this.props.username}</span>
                    <span className={s.message__date}>{ new Date (this.props.date * 1000).toDateString()}</span>
                </div>
                <div className={s.message__text}>{this.props.text}</div>
                <div className={s.divider}></div>
            </div>
        )
    }
}

export default Message;