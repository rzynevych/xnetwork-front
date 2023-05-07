import React from 'react';
import { Link } from 'react-router-dom';
import s from './UserListElem.module.css';

class UserListElem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.user__list__elem}>
                <div className={s.ule__header}>
                    <span className={s.ule__username}>{this.props.elem.user.username}</span>
                </div>
                <Link to={{ pathname: '/chat', state: { converser_id: this.props.elem.user.userID }}}>
                    Open chat
                </Link>
                <div className={s.ule__divider}></div>
            </div>
        )
    }
}

export default UserListElem;