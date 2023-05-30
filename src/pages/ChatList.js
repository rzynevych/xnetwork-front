import React from 'react';
import ChatListElem from './ChatListElem';
import { server_url } from '../config';
import s from './ChatList.module.css';
import { withRouter } from 'react-router-dom';

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.size = 50;
        this.state = {
            chats : []
        }
    }

    componentDidMount() {
        let url = new URL(server_url + '/getChatList');
        url.searchParams.append('page', this.page);
        url.searchParams.append('size', this.size);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            this.offset += json.length;
            this.setState({
                chats : json
            });
        }).catch(console.log);
    }

    render() {
        return (
            <div className={s.items__container}>
                {this.state.chats.map(c => 
                    <ChatListElem
                        key={c.chatId}
                        converser_id={c.converserId}
                        converser_name={c.converserName}
                    />
                )}
            </div>
        )
    }
}

export default withRouter(ChatList);