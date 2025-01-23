import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState,useEffect } from "react";
import Quagga from "quagga";
import BookScanner from "./BookScanner";

const Create = (props) => {
    const {data, setData,post} = useForm({
        // title: "",
        // author: "",
        // totalpage: "",
        // image:null,
        isbn:"",
    })

    const Send = (e) => {
        console.log('test');
        e.preventDefault();
        post("/books/isbn");
    }

    
        const [camera, setCamera] = useState(true);
        const [result, setResult] = useState(null);
      
        const onDetected = result => {
          setResult(result);
          setCamera(!camera)
          window.location.href = '/scanners/' + result
        };
    
    
    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ブック作成
                </h2>
            }>
            
            <div className="p-12">
                <form onSubmit={Send}>
                        {/* <div>
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
                        </div> */}
                        <div>
                            <h2>ISBNコード</h2>
                            <input type="number" placeholder="コード番号" value={data.isbn} onChange={(e) => setData("isbn", e.target.value)} />
                        </div>
                        {/* <div>
                            <input accept="image/*" multiple type="file"  onChange={(e) => setData("image", e.target.files[0])} />
                        </div> */}
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">send</button>
                </form>  
               
                <section className="section-wrapper">
                <div className="section-title">
                    <h1 className="section-title-text">
                    {camera ? <BookScanner setData={setData} /> : <p>読み込み中...</p> }
                    </h1>
                </div>
                </section>

  
            </div>
            
        </Authenticated>
        );
}

export default Create;