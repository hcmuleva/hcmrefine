import { List as AntdList } from "antd";
import { useShow } from '@refinedev/core';
import React from 'react';
import { List } from "@refinedev/antd";

const ConfigDetail = () => {
    const { queryResult } = useShow({meta:{populate:['configs']}});
    const { data, isLoading } = queryResult;
    console.log("DAta ",data.data)
    const getConfigList=()=>{
        return <List
            headerProps={{
                extra: <CreateButton onClick={() => createShow()} />,
            }}
        >
            <AntdList
                grid={{ gutter: 16, xs: 1 }}
                style={{
                    justifyContent: "center",
                }}
                {...listProps}
                renderItem={(item) => {
                    const imgurl = `https://loremflickr.com/640/480/animals?random=${Math.random()}`;
                    return <AntdList.Item>
                        <ProjectItem item={item} imgurl={imgurl} />
                    </AntdList.Item>
                }}
            />
        </List>
    }
    return (
        <div>
            <h1>Config Details</h1>
        </div>
    );
};

export default ConfigDetail;