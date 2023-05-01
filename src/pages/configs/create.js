import React from 'react';
import { SettingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Cascader, Select, Space,
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import { Col, Row } from 'antd';
import {  getValueFromEvent ,useFileUploadState,
    Create,
    useForm} from "@refinedev/antd";
import {  useApiUrl } from "@refinedev/core";

import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};
const ConfigCreate = ({ item }) => {
    const { formProps, saveButtonProps } = useForm();

    const [componentDisabled, setComponentDisabled] = useState(false);
    const [value, setValue] = useState("FILE");
    const apiUrl = useApiUrl();
    const { isLoading, onChange } = useFileUploadState();

    console.log("recieved projectId", item.id)
    const handleTestTypeChange = (value) => {
        console.log(`handleTestTypeChange  ${value}`);
    };
    const handleSERVICEChange = (value) => {
        console.log(`handleSERVICEChange  ${value}`);
    };
    const onChangeService = (e) => {
        setValue(e.target.value);
        console.log('radio checked', e.target.value);
        if(e.target.value ==="FILE"){
            setIsFileservice(true)
        }else {
            setIsFileservice(false)
        }
        
      };
    const [isFileService, setIsFileservice] = useState(true)
    const getFilePaths = () => {
        return <Form.List
            name="names"
            rules={[
                {
                    validator: async (_, names) => {
                        if (!names || names.length < 1) {
                            return Promise.reject(new Error('At least 1 file path require'));
                        }
                    },
                },
            ]}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'FilePath' : ''}
                            required={false}
                            key={field.key}
                        >
                           
                            <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Enter file path  or delete this field.",
                                    },
                                ]}
                                noStyle
                            >
                                <Input placeholder="Enter file path" style={{ width: '60%' }} />
                            </Form.Item>
                            {fields.length > 1 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                            ) : null}
                        </Form.Item>
                    ))}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '60%' }}
                            icon={<PlusOutlined />}
                        >
                            Add File Path
                        </Button>
                        
                        <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    }
    return (
        <Create
            saveButtonProps={{
                ...saveButtonProps,
                disabled: isLoading,
            }}
        >
        <Space direction="vertical">

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
                {...formItemLayoutWithOutLabel}
            >
                <Form.Item
                    label="ConfName"
                    name="configname"
                    rules={[{ required: true, message: 'Enter Config Name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="TESTTYPE"
                >
                    <Select
                        defaultValue="PERFORMANCE"
                        style={{ width: 220 }}
                        onChange={handleTestTypeChange}
                        options={[
                            { value: 'PERFORMANCE', label: 'PERFORMANCE' },
                            { value: 'FUNCTIONAL', label: 'FUNCTIONAL' },
                            { value: 'SDL', label: 'SDL' },

                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="SERVICE"
                >
                    <Select
                        defaultValue="FILESERVICE"
                        style={{ width: 220 }}
                        onChange={handleSERVICEChange}
                        options={[
                            { value: 'FILESERVICE', label: 'FILESERVICE' },
                            { value: 'DEVICESERVICE', label: 'DEVICESERVICE' },
                            { value: 'CONTENTMGMT', label: 'CONTENTMGMT' },
                            { value: 'USERMGMT', label: 'USERMGMT' },
                            { value: 'ACCOUNT', label: 'ACCOUNT' },

                        ]}
                    />
                     <Radio.Group onChange={onChangeService} value={value}>
      <Radio value={"FILE"}>FILE</Radio>
      <Radio value={"DEVICE"}>DEVICE</Radio>
      <Radio value={"CONTENT"}>CONTENT</Radio>
      <Radio value={"USER"}>USER</Radio>
      <Radio value={"ACCOUNT"}>ACCOUNT</Radio>
    </Radio.Group>
    
                </Form.Item>

                        {isFileService?getFilePaths():""}
  <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
            
                <Form.Item label="Image">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                    </Form.Item>
               
            </Form>
        </Space>
         </Create>

    );
};

export default ConfigCreate;