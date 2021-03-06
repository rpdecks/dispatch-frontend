import React from 'react';
import { withRouter } from 'react-router';
import { FormControl, TextField, Button } from '@material-ui/core'
import { API_ROOT } from '../services/apiRoot';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = e => {
    e.preventDefault();

    const userObj = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    }

    fetch(`${API_ROOT}/login`, fetchObj)
      .then(res => res.json())
      .then(loginData => {
        if (loginData.token) {
          this.props.handleLogin(loginData.token)
          this.props.history.push('/');
        }
        else
          alert(loginData.message);
      })
      .catch(() => alert('Something went wrong'))

    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={(e) => this.login(e)}>
        <FormControl>
          <TextField name="email" label="Email" onChange={e => this.handleChange(e)} />
          <TextField name="password" type="password" label="Password" onChange={e => this.handleChange(e)} />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    )
  }
}

export default withRouter(LoginForm);