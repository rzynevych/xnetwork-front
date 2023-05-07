import React from 'react';
import { Link } from 'react-router-dom';
import s from './Chat.module.css';

class ChatListElem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.chat__list__elem}>
                <div className={s.cle__header}>
                    <span className={s.cle__username}>{this.props.converser_name}</span>
                </div>
                <Link to={{ 
                    pathname: '/chat', 
                    state: { 
                            converser_id: this.props.converser_id,
                            converser_name : this.props.converser_name
                        }
                    }}>
                    Open chat
                </Link>
                <div className={s.cle__divider}></div>
            </div>
        )
    }
}

export default ChatListElem;