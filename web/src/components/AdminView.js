import React, {useState} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import CustomersTable from './CustomersTable';
import UsersTable from './UsersTable';

const AdminView = () => {
  const [key, setKey] = useState('customers');

  return (
    <div className='m-4'>
      <span className='d-flex justify-content-center'>
        <h3>Admin</h3>
      </span>
      <Tabs
        className='border-bottom'
        activeKey={key}
        onSelect={(selectedKey) => setKey(selectedKey)}
      >
        <Tab
          title='Customers'
          eventKey='customers'
          className='border border-top-0'
        >
          <CustomersTable />
        </Tab>
        <Tab
          title='Users'
          eventKey='users'
          className='border border-top-0'
        >
          <UsersTable />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminView;
