import axios from 'axios';
import React, {useState} from 'react';
import {Button, Card, Form, FormControl, InputGroup} from 'react-bootstrap';

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;

const LoginView = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const submitCreds = async () => {
    await axios.post(`${apiUrl}/auth/login`, {
      username: username,
      password: password
    }).then(res => {
      localStorage.setItem('username', username);
      localStorage.setItem('authToken', res.data.authToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('tokenTime', Date.now());
      window.location.replace('/');
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div className='d-flex justify-content-center'>
      <Card className='mt-5' style={{width: '25rem'}}>
        <Card.Header>
          <b>Enter your login credentials...</b>
        </Card.Header>
        <Card.Body>
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <FormControl
              placeholder='Enter your username'
              onChange = {(event) => setUsername(event.target.value)}
            />
          </InputGroup>
          <br />
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <FormControl
              type='password'
              placeholder='Enter your password'
              onChange = {(event) => setPassword(event.target.value)}
            />
          </InputGroup>
        </Card.Body>
        <Card.Footer>
          <Button 
            type='button'
            style={{width: '100%'}}
            onClick={submitCreds}
          >
            Login
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default LoginView;
