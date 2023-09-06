import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, Table } from 'antd';
import axios from 'fetch';

const columns = [
  {
    title: 'Media',
    dataIndex: 'addr',
    render: (addr) => (
      <Modal>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={addr}
        />
      </Modal>
    )
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Description',
    dataIndex: 'desc',
  }
];

const App = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    (async ()=>{
      axios.get('/api/media/get_all_medias').then(res=>{
        console.log(res.data)
        setData([{
          media: '1',
          name: '1',
          addr: '1',
          desc: '1',
          type: '1'
        }])
      })
    })()
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'left' }}>
        <Button type="primary">
          Upload
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default App;