import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

const Create = (props) => {
    const {data, setData,post} = useForm({
        title: "",
        author: "",
        totalpage: "",
        image:null
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
                        <div>
                            <input accept="image/*" multiple type="file"  onChange={(e) => setData("image", e.target.files[0])} />
                        </div>
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">send</button>
                    </form>  
            </div>
            
        </Authenticated>
        );
}

export default Create;