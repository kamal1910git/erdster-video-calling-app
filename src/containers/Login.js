import React, {Component} from 'react'
import Header from './Header'
import LoginContent from './LoginContent'

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <LoginContent />
            </div>
        )
    }
}