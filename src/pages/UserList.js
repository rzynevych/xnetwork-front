import React from 'react';
import UserListElem from './UserListElem';
import { server_url } from '../config';
import s from './UserList.module.css';
import { withRouter } from 'react-router-dom';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.queryInputHandler = this.queryInputHandler.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
        this.limit = 50;
        this.offset = 0;
        this.state = {
            users : [],
            queryText : ""
        }
    }

    queryInputHandler(e) {
        this.setState({
            queryText: e.target.value
        });
    }

    sendQuery() {
        if (this.state.queryText.length === 0)
            return ;
        let url = new URL(server_url + '/getUsersByQuery');
        url.searchParams.set('offset', this.offset);
        url.searchParams.set('query', this.state.queryText);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (!json.error) {
                // console.log(json);
                this.offset += json.length;
                this.setState({
                        users : json,
                        queryText : ""
                });
            }
            else
                console.log(json.error);
        }).catch(console.log);
    }

    render() {
        return (
            <div className={s.items__container}>
                <div className={s.query__input__container}>
                <input 
                    className={s.query__input}
                    onChange={this.queryInputHandler}
                    value={this.state.queryText}
                />
                <button onClick={this.sendQuery} className={s.query__send__button}>Search</button>
                </div>
                {this.state.users.map(u => 
                    <UserListElem
                        key={u.user.userID}
                        elem={u}
                    />
                )}
            </div>
        )
    }
}

export default withRouter(UserList);