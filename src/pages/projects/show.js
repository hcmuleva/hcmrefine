import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

export const ProjectShow = () => {
    
    const { queryResult } = useShow({meta:{populate:['configs']}});
    const { data, isLoading } = queryResult;
    const record = data?.data;
    console.log("REcord in projectShow",data)
    if(isLoading){
      <h1>Loading</h1>
    }
    console.log("record", record.id)
   
// console.log("PRojectShow configdata", configdata)

    return (
        <Show>
        <h1>DDDD</h1>
        <List>
            <h1>Create Configs</h1>
        </List>
        </Show>
        // <Show isLoading={isLoading}>
        //     <h1>{configurationData.data.name}</h1>

        //      <table>
        //         <thead>
        //             <tr>
        //                 <th>ID</th>
        //                 <th>Title</th>
        //                 <th>Status</th>
        //                 <th>Created At</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {configdata.map((conf) => (
        //                 <tr key={conf.id}>
        //                     <td>{conf.id}</td>
        //                     <td>{conf.name}</td>
        //                     <td>{post.status}</td>
        //                     <td>{new Date(post.createdAt).toDateString()}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     </Show>

        //     <Title level={5}>Configuration</Title>
        //     <Text>
        //         {configurationIsLoading ? "Loading..." : configurationData?.data.title}
        //     </Text>

        //     <Title level={5}>Content</Title>
        //     <MarkdownField value={record?.content} />
        // </Show>
    );
};
