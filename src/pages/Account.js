import React from 'react';

import { server_url } from '../config';
import { withRouter } from 'react-router-dom';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.logoutRequest = this.logoutRequest.bind(this);
    }

    logoutRequest() {
        fetch(server_url + '/logout',
            {
                method : 'GET',
                credentials : 'include'
            }
        ).then(response => response.json()).then(json => {
            if(json.status === true) {
                this.props.checkIsAuth();
            }
        }).catch(console.log);
    }

    render() {
        return (
            <div>
                <button onClick={this.logoutRequest}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Account);