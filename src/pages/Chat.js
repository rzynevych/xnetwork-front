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
        this.limit = 50;
        this.offset = 0;
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
        url.searchParams.append('converser_id', this.converser_id);
        url.searchParams.append('limit', this.limit);
        url.searchParams.append('offset', this.offset);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (json.status) {
                this.offset += this.limit;
                json.data.reverse().map(m => this.state.messages.push(m));
                this.forceUpdate();
            }
            else
                console.log(json.error);
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
        let url = new URL(server_url + '/sendMessage');
        let payload = {
            converser_id : this.converser_id,
            text : this.state.messageText
        }
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(payload),
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (json.status === true) {
                this.setState({
                        messageText : ''
                });
                this.getNewMessages();
                console.log(json);
            }
            else
                console.log(json.error);
        }).catch(console.log);
    }

    getNewMessages() {
        let url = new URL(server_url + '/getNewMessages');
        url.searchParams.append('converser_id', this.converser_id);
        let last_message_id = this.state.messages[this.state.messages.length - 1].message_id;
        url.searchParams.append('last_message_id', last_message_id);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (json.status === true) {
                json.data.map(m => {this.state.messages.push(m)});
                this.forceUpdate();
                console.log(json);
            }
            else
                console.log(json.error);
        }).then(() => {this.messagesContainer.current.lastElementChild.scrollIntoView(
            { behavior: "smooth", block: "nearest" })}).catch(console.log);
    }

    websocketHook(wsMessage) {
        if (wsMessage.sender_id === this.converser_id)
            this.getNewMessages();
    }

    render() {
        return (
            <div className={s.chat__container}>
            <div ref={this.messagesContainer} className={s.items__container}>
                {this.state.messages.map(m => 
                    <Message
                        key={m.message_id}
                        username={m.sender_name}
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