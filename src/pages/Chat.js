import React from 'react';
// import { useLocation } from 'react-router-dom';
import { server_url } from '../config';
import Message from '../messages/Message';
import s from './Chat.module.css';
import { withRouter } from 'react-router-dom';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.messageInputHandler = this.messageInputHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getNewMessages = this.getNewMessages.bind(this);
        this.websocketHook = this.websocketHook.bind(this);
        this.page = 0;
        this.size = 50;
        this.converser_id = 0;
        this.messagesContainer = React.createRef();
        this.updated = false;
        this.state = {
            messages : [],
            messageText: '',
        }
    }

    componentDidMount() {
        this.converser_id = this.props.location.state.converser_id;
        this.converser_name = this.props.location.state.converser_name;
        this.props.wsHookAdder({
            type: "message",
            hook: this.websocketHook
        })
        let url = new URL(server_url + '/getChatMessages');
        url.searchParams.append('converserId', this.converser_id);
        url.searchParams.append('page', this.page);
        url.searchParams.append('size', this.size);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            this.page += 1;
            json.map(m => this.state.messages.push(m));
            this.forceUpdate();
        }).then(() => {this.messagesContainer.current.lastElementChild.scrollIntoView(
            { behavior: "smooth", block: "nearest" })}).catch(console.log);
    }

    messageInputHandler(e) {
        this.setState({
          messageText: e.target.value
        });
    }

    sendMessage() {
        if (this.state.messageText.length === 0)
            return ;
        let url = new URL(server_url + '/uploadMessage');
        let payload = {
            converserId : this.converser_id,
            text : this.state.messageText
        }
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(payload),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => response.json()).then(json => {
                this.state.messages.push(json);
                this.setState({
                        messageText : ''
                });
            console.log(json);
        }).catch(console.log);
    }

    getNewMessages() {
        let url = new URL(server_url + '/getNewMessages');
        url.searchParams.append('converserId', this.converser_id);
        let last_message_id = this.state.messages[this.state.messages.length - 1].messageId;
        url.searchParams.append('lastMessageId', last_message_id);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            json.map(m => {this.state.messages.push(m)});
            this.forceUpdate();
            console.log(json);
        }).then(() => {this.messagesContainer.current.lastElementChild.scrollIntoView(
            { behavior: "smooth", block: "nearest" })}).catch(console.log);
    }

    websocketHook(wsMessage) {
        console.log(wsMessage);
        if (wsMessage.converserID === this.converser_id)
            this.getNewMessages();
    }

    render() {
        return (
            <div className={s.chat__container}>
            <div ref={this.messagesContainer} className={s.items__container}>
                {this.state.messages.map(m => 
                    <Message
                        key={m.messageId}
                        username={m.senderName}
                        date={m.date}
                        text={m.text}
                    />
                )}
            </div>
            <div className={s.message__input__container}>
            <input 
                className={s.message__input}
                onChange={this.messageInputHandler}
                value={this.state.messageText}
            />
            <button onClick={this.sendMessage} className={s.message__send__button}>Send</button>
            </div>
            </div>
        )
    }
}

export default withRouter(Chat);