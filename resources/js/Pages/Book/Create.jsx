import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";


const Create = (props) => {
    const {data, setData,post} = useForm({
        title: "",
        author: "",
        totalpage: ""
    })

    const Send = (e) => {
        console.log('test');
        e.preventDefault();
        post("/books");
    }
    
    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ブック作成
                </h2>
            }>
            
            <div className="p-12">
            <form onSubmit={Send}>
                        <div>
                            <h2>Title</h2>
                            <input type="text" placeholder="タイトル" onChange={(e) => setData("title", e.target.value)}/>
                        </div>                    

                        <div>
                            <h2>Auther</h2>
                            <input type="text" placeholder="著者" onChange={(e) => setData("author", e.target.value)} />
                        </div>

                        <div>
                            <h2>Total page</h2>
                            <input type="number" placeholder="総ページ" onChange={(e) => setData("totalpage", e.target.value)} />
                        </div>
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">send</button>
                    </form>  
            </div>
            
        </Authenticated>
        );
}

export default Create;