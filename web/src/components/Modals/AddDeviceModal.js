import axios from 'axios';
import React, {useState} from 'react';
import {Button, Form, InputGroup, Modal} from 'react-bootstrap';
import Select from 'react-select';

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;
const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
};

const AddDeviceModal = (props) => {
  const [customer, setCustomer] = useState('');
  const [type, setType] = useState('');
  const [serial, setSerial] = useState('');

  const customerOptions = [
    {value: "Sea Machines Robotics", label: "Sea Machines Robotics"},
    {value: "Maersk", label: "Maersk"}
  ]

  const deviceOptions = [
    {value: "SM300", label: "SM300"},
    {value: "SM360", label: "SM360"}
  ]
  
  const addDevice = async () => {
    await axios.post(`${apiUrl}/devices`, {
      customer: customer.value,
      type: type.value,
      serial_number: serial
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
            Add IIoT Device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            defaultValue={customer}
            onChange={setCustomer}
            options={customerOptions}
          />
          <br />
          <Select
            defaultValue={type}
            onChange={setType}
            options={deviceOptions}
          />
          <br />
          <InputGroup>
            <Form.Label>
              Serial Number
            </Form.Label>
            <br />
            <Form.Control
              type='text'
              plaintext='true'
              value={serial}
              onChange={(event) => setSerial(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-primary'
            onClick={addDevice}
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
  )
}

export default AddDeviceModal;
