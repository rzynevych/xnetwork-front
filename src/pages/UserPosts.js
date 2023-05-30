import React from 'react';
import Message from '../messages/Message';
import { server_url } from '../config';
import s from './Posts.module.css';
import { withRouter } from 'react-router-dom';

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.sendPost = this.sendPost.bind(this);
        this.postInputHandler = this.postInputHandler.bind(this);
        this.page = 0;
        this.size = 50;
        this.state = {
            messages : [],
            postText : ""
        };
    }

    componentDidMount() {
        let url = new URL(server_url + '/getOwnPosts');
        url.searchParams.append('page', this.page);
        url.searchParams.append('size', this.size);
        fetch(url,
            {
                method: "GET",
                credentials: 'include'
            }).then(response => response.json()).then(json => {
            if (!json.error) {
                this.page += 1;
                this.setState({
                    messages : json
                });
            }
            else
                console.log(json.error);
        }).catch(console.log);
    }

    postInputHandler(e) {
        this.setState({
          postText: e.target.value
        });
    }

    sendPost() {
        if (this.state.postText.length === 0)
            return ;
        let url = new URL(server_url + '/uploadPost');
        let payload = {
            converserID : 0,
            text : this.state.postText
        }
        fetch(url,
            {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(payload),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => response.json()).then(json => {
            if (!json.error) {
                this.state.messages.unshift(json);
                this.setState({
                    postText : ""
                });
                console.log(json);
            }
            else
                console.log(json.error);
        }).catch(console.log);
    }

    render() {
        return (
            <div>
                <div className={s.post__input__container}>
                <input 
                    className={s.post__input}
                    onChange={this.postInputHandler}
                    value={this.state.postText}
                />
                <button onClick={this.sendPost} className={s.post__send__button}>Send</button>
                </div>
                <div className={s.items__container}>
                    {this.state.messages.map(m => 
                        <Message
                            key={m.messageId}
                            username={m.senderName}
                            date={m.date}
                            text={m.text}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(UserPosts);