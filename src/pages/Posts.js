import React from 'react';
import Message from '../messages/Message';
import { url } from '../config';
import s from './Posts.module.css';
import { withRouter } from 'react-router-dom';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.messages = [];
        this.limit = 50;
        this.offset = 0;
        
    }

    componentDidMount() {
        let payload = {
            target : 'load',
            location : '/posts',
            offset : this.offset
        }
        fetch(url + '/posts',
            {
                method: "POST",
                body: JSON.stringify(payload),
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (json.result === 'ok') {
               this.messages = json.items;
               this.forceUpdate();
            }
            else
                console.log(json.error);
        }).catch(console.log);
    }

    render() {
        return (
            <div className={s.items__container}>
                {this.messages.map(m => 
                    <Message
                        key={m.message_id}
                        username={m.username}
                        date={m.date}
                        text={m.text}
                    />
                )}
            </div>
        )
    }
}

export default withRouter(Posts);