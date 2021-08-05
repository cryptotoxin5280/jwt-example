import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import Select from 'react-select';
import BarCode from './BarCode';
import AddDeviceModal from './Modals/AddDeviceModal';
import ConfigFilesModal from './Modals/ConfigFilesModal';
import EditDeviceModal from './Modals/EditDeviceModal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileCode,
  faPlusCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;
const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
};

const DevicesView = () => {
  const [activeDevice, setActiveDevice] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [
    isConfigFilesModalVisible,
    setIsConfigFilesModalVisible
  ] = useState(false);
  const [files, setFiles] = useState([]);

  const displayConfigFiles = (deviceId) => {
    setActiveDevice(deviceId);
    setIsConfigFilesModalVisible(true);
  }

  const editDevice = (deviceId) => {
    setActiveDevice(deviceId);
    setIsEditModalVisible(true);
  };

  const deleteDevice = async (deviceId) => {
    await axios.delete(`${apiUrl}/devices/${deviceId}`, {
      headers: headers
    })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!isAddModalVisible && !isEditModalVisible) {
        await axios.get(`${apiUrl}/customers`, {
          headers: headers
        })
          .then((res) => {
            let options = [];
            res.data.forEach(customer => {
              options = [...options, {
                value: customer.name,
                label: customer.name
              }];
            });
            setCustomers(options);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchCustomers();
  }, [isAddModalVisible, isEditModalVisible]);

  useEffect(() => {
    const fetchDevices = async () => {
      if (!isAddModalVisible && !isEditModalVisible) {
        await axios.get(`${apiUrl}/devices`, {
          headers: headers
        })
          .then((res) => {
            setDevices(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchDevices();
  }, [isAddModalVisible, isEditModalVisible]);

  return (
    <div>
      <span className='d-flex justify-content-center'>
        <h3>Devices</h3>
      </span>
      <div style={{width: '30%'}} className='p-2'>
        <Select
          defaultValue={customerFilter}
          onChange={setCustomerFilter}
          options={customers}
        />
      </div>
      <div className='d-flex flex-row-reverse'>
        <span className='p-2' title='Add New IIoT Device'>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size='lg'
            color="green"
            onClick = {() => setIsAddModalVisible(true)}
          />
        </span>
      </div>

      <Table striped bordered hover style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Device</th>
            <th>Serial No.</th>
            <th>Barcode</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {devices.length > 0 ? devices.map((device) => (
            <tr key={device._id}>
              <td align='center' valign='middle'>
                {device.customer}
              </td>
              <td align='center' valign='middle'>
                {device.type}
              </td>
              <td align='center' valign='middle'>
                {device.serial_number}
              </td>
              <td align='center' valign='middle'>
                <BarCode
                  value={device.serial_number}
                />
              </td>
              <td className='text-center' width='20%' valign='middle'>
                <span className='p-2' title='Edit IIoT Device'>
                  <FontAwesomeIcon
                    icon={faEdit} 
                    size='lg'
                    color='blue'
                    onClick = {() => editDevice(device._id)}
                  />
                </span>
                <span className='p-2' title='Download Config Files'>
                  <FontAwesomeIcon
                    icon={faFileCode}
                    size='lg'
                    onClick = {() => displayConfigFiles(device._id)}
                  />
                </span>
                <span className='p-2' title='Remove IIoT Device'>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size='lg'
                    color='red'
                    onClick = {() => deleteDevice(device._id)}
                  />
                </span>
              </td>
            </tr>)):
            <tr>
              <td key='notfound' colSpan={5}>
                No devices defined.
              </td>
            </tr>
          }
        </tbody>
      </Table>
      <AddDeviceModal
        isVisible={isAddModalVisible}
        setIsVisible={setIsAddModalVisible}
      />
      <EditDeviceModal
        isVisible={isEditModalVisible}
        setIsVisible={setIsEditModalVisible}
        device={activeDevice}
      />
      <ConfigFilesModal
        isVisible={isConfigFilesModalVisible}
        setIsVisible={setIsConfigFilesModalVisible}
        deviceId={activeDevice}
      />
    </div>
  )
}

export default DevicesView;
