import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router'

export default class Login extends Component {
constructor(props) {
super(props);

this.state = {
email: "",
password: ""
};

}


validateForm() {
return this.state.email.length > 0 && this.state.password.length > 0;
}

handleChange = event => {
this.setState({
[event.target.id]: event.target.value
});

}

handleSubmit = event => {
    event.preventDefault();
    if(this.state.email === 'admin@erdster.com' && this.state.password === 'admin')
    {
        window.location = '/home';
    }
    else
    {
        window.alert('Invalid credentials, please try again...');
    }

}


render() {
return (
    <div className="home">
    <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email">
        <ControlLabel>Email     </ControlLabel>
        <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange} />
        </FormGroup><br/>
        <FormGroup controlId="password">
            <ControlLabel>Password  </ControlLabel>
            <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password" />
        </FormGroup><br/>
        <Button className="primary-button" disabled={!this.validateForm()} type="submit">Login</Button>
    </form>
    </div> 
    ); }
}



