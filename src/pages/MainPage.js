import React from 'react';
import Message from '../messages/Message';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Message
                username='Ruslan'
                date='today'
                text='Hello'
            />
        )
    }
}

export default MainPage;