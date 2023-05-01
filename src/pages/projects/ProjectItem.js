import { DeleteButton,EditButton, ShowButton,CreateButton } from "@refinedev/antd";

import { EditOutlined } from "@ant-design/icons";
import { Card, FloatButton } from "antd";

import { API_URL } from "../../constants";
import {  useNavigation } from "@refinedev/core";

import { Select, Space } from 'antd';
import { Col, Row } from 'antd';
import ConfigCreate from "../configs/create";
import { Create } from "@refinedev/antd";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Typography } from 'antd';

import {
   PlusCircleOutlined
  } from '@ant-design/icons';
const { Meta } = Card;

export const ProjectItem = ({ item, imgurl }) => {
    const style  = { padding: '8px 0' };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;

    const[configId,setConfigId] = useState()
    const { edit, create,show } = useNavigation();
    console.log("ITEM DOT ", item.configs)
    const configarr = item?.configs||[]
     const getConfigArrayForSelection= ()=>{
        return configarr&&configarr.map(elm =>({label:elm.name, value:elm.id}))
     }
     const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    const editProjectShow=(item)=>{
        console.log("Edit item clicked", item)
    }
    const handleChange = (value) => {
        console.log("Valie",value)
        console.log(`selected ${value}`);
        setConfigId(value)
      };
    return (
        <>
      
        <Card
            style={{ width: 300 }}
             cover={<img alt="example" src={imgurl} height="240" />}
            
            actions={[
                <EditButton key="edit" recordItemId={item.id}/>,
                <DeleteButton
                    key="delete"
                    size="small"
                    hideText
                    recordItemId={item.id}
                />,
                <ShowButton  key="show"
                size="small"
                hideText
                recordItemId={item.id}
                data={item}
                onClick={()=>{show("configs", item.id)}}
                />,
           
                
            ]}
        >
             <Row>
      <Col span={12}>Project</Col>
      <Col span={12}>Config</Col>
      
    </Row>
    <Row>
      <Col span={12}>{item.name}</Col>
    
      <Col span={12}> <Space wrap>
    <Select
      defaultValue="Select"
      style={{ width: 120 }}
      onChange={handleChange}
      options={getConfigArrayForSelection()}
    />
    </Space></Col>
    
    <Col span={4} style={{ textAlign: "right" }}>
 
</Col>
    </Row>
    <Row>
    <Col span={12}></Col>
    <Col span={12}>
        <Space wrap>
            <Button onClick={showModal}>
    <PlusCircleOutlined  />
    Config</Button>
   
    <Modal centered title={<Title  style={{width: '100%', justifyContent: 'center'}}>Create Config For -{item.name}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
      <ConfigCreate resource="configs" item={item} />
    </Modal>
  
  </Space>
        </Col>
    </Row>
            
            <Meta
                className="ant-card-meta-title"
               
                description={item.description}
            />
        </Card>
        </>
    );
};
