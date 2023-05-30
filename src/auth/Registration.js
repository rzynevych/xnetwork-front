import React from 'react';
import { server_url } from '../config';
import s from './Registration.module.css';
import { withRouter } from 'react-router-dom';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.emailInputHandler = this.emailInputHandler.bind(this);
        this.passwordInputHandler = this.passwordInputHandler.bind(this);
        this.usernameInputHandler = this.usernameInputHandler.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.state = {
            email : "",
            username : "",
            password : ""
        };
    }

    emailInputHandler(e) {
        this.setState({
            email : e.target.value
        });
    }

    usernameInputHandler(e) {
        this.setState({
            username : e.target.value
        });
    }

    passwordInputHandler(e) {
        this.setState({
            password : e.target.value
        });
    }

    sendForm() {
        let payload = {
            email : this.state.email,
            username : this.state.username,
            password : this.state.password
        }
        let url = new URL(server_url + '/register');
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(json => {
                console.log(json);
                this.setState({
                    email : "",
                    username : "",
                    password : ""
                })
        }).catch(console.log);
    }

    render() {
        return (
            <div className={s.reg__form}>
                <h2>Sign up XNetwork</h2>
                <label className={s.form__label} for='email'><b>Email</b></label>
                <input className={s.form__control}
                    type='text'
                    name='email'
                    placeholder='Enter email'
                    onChange={this.emailInputHandler}
                    value={this.state.email}
                />
                <label className={s.form__label} for='username'><b>Username</b></label>
                <input className={s.form__control}
                    type='text'
                    name='username'
                    placeholder='Enter username'
                    onChange={this.usernameInputHandler}
                    value={this.state.username}
                />
                <label className={s.form__label} for='password'><b>Password</b></label>
                <input className={s.form__control}
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    onChange={this.passwordInputHandler}
                    value={this.state.password}
                />
                <button className={s.reg__send__button} onClick={this.sendForm}>Submit</button>
            </div>
        )
    }
}

export default withRouter(Registration);