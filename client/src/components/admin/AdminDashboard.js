import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function AdminDashboard() {
    return (
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            #1
          </Tab>
          <Tab eventKey="profile" title="Profile">
            #2
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            #3
          </Tab>
        </Tabs>
      );
}

export default AdminDashboard