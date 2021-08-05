import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import AddCustomerModal from './Modals/AddCustomerModal';

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;
const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('authToken')
};

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [isAddModalVisble, setIsAddModalVisble] = useState(false);

  const fetchCustomers = async () => {
    await axios.get(`${apiUrl}/customers`, {
      headers: headers
    })
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCustomer = async (customerId) => {
    await axios.delete(`${apiUrl}/customers/${customerId}`, {
      headers: headers
    })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, [isAddModalVisble]);

  return (
    <div className='mx-2'>
      <span 
        className='d-flex flex-fill flex-row-reverse p-2'
        title='Add New Customer'
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          size='lg'
          color="green"
          onClick = {() => setIsAddModalVisble(true)}
        />
      </span>
      <Table striped bordered hover className=''>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? customers.map((customer) => (
            <tr key={customer._id}>
              <td>
                {customer.name}
              </td>
              <td className='text-center'>
                <span className='p-2' title='Delete Customer'>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size='lg'
                    color='red'
                    onClick = {() => deleteCustomer(customer._id)}
                  />
                </span>
              </td>
            </tr>)):
            <tr>
              <td key='notfound' colSpan={2}>
                No customers defined.
              </td>
            </tr>
          }
        </tbody>
      </Table>
      <AddCustomerModal
        isVisible={isAddModalVisble}
        setIsVisible={setIsAddModalVisble}
      />
    </div>
  );
}

export default CustomersTable;
