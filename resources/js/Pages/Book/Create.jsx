import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Create = (props) => {
    
    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ブック作成
                </h2>
            }>
            
            <div className="p-12">
                <h1>Blog Name</h1>
                <div>
                    <div>
                        <h2>Title a</h2>
                        
                    </div>
                </div>
            </div>
            
        </Authenticated>
        );
}

export default Create;