import React from 'react';
import { Link } from 'react-router-dom';
import { server_url } from '../config';
import s from './UserListElem.module.css';

class UserListElem extends React.Component {
    constructor(props) {
        super(props);
        this.subscriptionRequest = this.subscriptionRequest.bind(this);
        this.state = {
            inSubscriptions : props.elem.inSubscriptions, 
            subscriptionRequestPending : false
        };
    }

    subscriptionRequest() {
        let path = this.state.inSubscriptions ? '/removeSubscription' : '/addSubscription';
        let url = new URL(server_url + path);
        url.searchParams.append('userId', this.props.elem.user.userId);
        this.setState({
            subscriptionRequestPending : true
        })
        fetch(url,
            {
                method : 'GET',
                credentials : 'include'
            }
        ).then(response => response.json()).then(json => {
            if(json.status === true) {
                this.setState({
                    inSubscriptions : !this.state.inSubscriptions,
                    subscriptionRequestPending : false
                })
            }
        }).catch(console.log);
    }

    render() {
        return (
            <div className={s.user__list__elem}>
                <div className={s.ule__header}>
                    <div className={s.ule__username}>{this.props.elem.user.username}</div>
                    <div className={s.ule__subscription}>{this.props.elem.subscribed ? 'Subscribed' : 'Not subscribed'}</div>
                </div>
                <div className={s.ule__button__container}>
                <Link to={{ pathname: '/chat', state: { converser_id: this.props.elem.user.userId }}}>
                    Open chat
                </Link>
                <button className={s.ule__subscription__button} 
                        onClick={this.subscriptionRequest}
                        disabled={this.state.subscriptionRequestPending}>
                    {!this.state.inSubscriptions ? 'Subscribe' : 'Unsubscribe'}
                </button>
                </div>
                <div className={s.ule__divider}></div>
            </div>
        )
    }
}

export default UserListElem;