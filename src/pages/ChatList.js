import React from 'react';
import ChatListElem from './ChatListElem';
import { server_url } from '../config';
import s from './ChatList.module.css';
import { withRouter } from 'react-router-dom';

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.limit = 50;
        this.offset = 0;
        this.state = {
            chats : []
        }
    }

    componentDidMount() {
        let url = new URL(server_url + '/getChatList');
        url.searchParams.append('limit', this.limit);
        url.searchParams.append('offset', this.offset);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (json.status) {
                this.offset += json.data.length;
                this.setState({
                    chats : json.data
                });
            }
            else
                console.log(json.error);
        }).catch(console.log);
    }

    render() {
        return (
            <div className={s.items__container}>
                {this.state.chats.map(c => 
                    <ChatListElem
                        key={c.chat_id}
                        converser_id={c.user_id1 == this.props.user.user_id ? c.user_id2 : c.user_id1}
                        converser_name={c.user_id1 == this.props.user.user_id ? c.username2 : c.username1}
                    />
                )}
            </div>
        )
    }
}

export default withRouter(ChatList);