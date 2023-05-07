import React from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.nav}>
                <Link to='/posts' className={s.nav__button}> Posts </Link>
                <Link to='/myPosts' className={s.nav__button}> MyPosts </Link>
                <Link to='/userSearch' className={s.nav__button}> Search users </Link>
                <Link to='/chats' className={s.nav__button}> Chats </Link>
                <Link to='/account' className={s.nav__button}> Account </Link>
            </div>
        )
    }
}

export default NavBar;