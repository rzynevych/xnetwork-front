import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { server_url } from '../config';
import s from './Login.module.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.sendForm = this.sendForm.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.isLogged = false;
        this.state = {
            email: '',
            password: ''
        }
    }

    emailHandler(e) {
        this.setState({
            email : e.target.value
        })
    }

    passwordHandler(e) {
        this.setState({
            password : e.target.value
        })
    }

    sendForm() {

        let payload = new FormData();
        payload.append("email", this.state.email);
        payload.append("password", this.state.password);
        fetch(server_url + '/auth',
            {
                method : 'POST',
                body : payload,
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
            <div className={s.auth__form}>
                <h2>XNetwork login</h2>
                <label className={s.form__label}>Enter email</label>
                <input className={s.form__control} type='text' name='email' placeholder='Email' onChange={this.emailHandler}/>
                <label className={s.form__label}>Enter password</label>
                <input className={s.form__control} type='password' name='password' placeholder='Password' onChange={this.passwordHandler}/>
                <button className={s.auth__send__button} onClick={this.sendForm}>Login</button>
                <div className={s.reg__link}>
                <Link to='/registration'>Sign up</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);