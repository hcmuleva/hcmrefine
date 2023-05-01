import { CreateButton, List, useDrawerForm, useSimpleList } from "@refinedev/antd";
import { List as AntdList } from "antd";



import { ProjectItem } from "./ProjectItem";




export const ProjectList = () => {
    // const { data, isLoading, isError } = useList({
    //     resource: "projects",
    //     metaData: { populate: ["configs"] },
    // });

    const { listProps } = useSimpleList({
        resource: "projects",
        metaData: { populate: ["configs"] },
    });
    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm({
        action: "create",
        resource: "projects",
        redirect: true,
    });
    return(
        <>
        <List
           
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
        {/* <EditProduct
            modalProps={editModalProps}
            formProps={editFormProps}
        />
        <CreateProduct
            drawerProps={createDrawerProps}
            formProps={createFormProps}
            saveButtonProps={createSaveButtonProps}
        /> */}
    </>
    );
};



