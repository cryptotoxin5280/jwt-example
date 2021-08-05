import axios from 'axios';
import React, {useState} from 'react';
import {Button, Form, FormGroup, Modal} from 'react-bootstrap';
const {SHA3} = require('sha3');
const hash = new SHA3(512);

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;
const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
};

const AddUserModal = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async () => {
    await axios.post(`${apiUrl}/users`, {
      username: username,
      password: hashPassword(password)
    },
    {
      headers: headers
    })
    .catch((error) => {
      console.log(error);
    });
    props.setIsVisible(false);
  };

  const handleCancel = () => {
    props.setIsVisible(false);
  };

  const hashPassword = (password) => {
    hash.reset();
    const passwordHash = hash.update(password);
    return passwordHash.digest('hex');
  };

  return (
    <div>
      <Modal
        show={props.isVisible}
      >
        <Modal.Header>
          <Modal.Title>
            Add User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-primary'
            onClick={addUser}
          >
            Save
          </Button>
          {' '}
          <Button
            variant='outline-secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserModal;
