import axios from 'axios';
import React, {useState} from 'react';
import {Button, Form, FormGroup, Modal} from 'react-bootstrap';

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;
const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
};

const AddCustomerModal = (props) => {
  const [customerName, setCustomerName] = useState('');

  const addUser = async () => {
    await axios.post(`${apiUrl}/customers`, {
      name: customerName
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

  return (
    <div>
      <Modal
        show={props.isVisible}
      >
        <Modal.Header>
          <Modal.Title>
            Add Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>
              Customer Name
            </Form.Label>
            <Form.Control
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
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

export default AddCustomerModal;
