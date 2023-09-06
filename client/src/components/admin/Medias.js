import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, Table } from 'antd';
import axios from 'fetch';

const columns = [
  {
    title: 'Media',
    dataIndex: 'addr',
    render: (addr) => (

        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={addr}
        />

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
    axios.get('/api/media/get_all_medias').then(res=>{
      const tmp = res.data.map((item, index)=>{
        return {
          key: item.id,
          name: item.id,
          addr: item.addr,
          desc: item.desc,
          type: item.type
        }
      })
      setData(tmp)
    })
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