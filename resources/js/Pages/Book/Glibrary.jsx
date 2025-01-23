import {React, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import BookModal from "./BookModal";
import axios from 'axios';


const Index = (props) => {
    const { books } = props; // 追加
    
    async function addLibrary(BookId){
        axios.post("/mylibrary",{book_id: BookId})
            
        .then(res => { console.log(res.data) })
        .catch(err => { console.error(err) });
    }
    console.log(props); // 確認用に追加
    const [serch,setSerch] = useState("");
    const Serch = (e) => {
        setSerch(e.target.value);
        console.log("log1",serch);
    };

    
    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
                <div>
                    <input type="text" placeholder="入力してください" onChange={Serch}></input>
                </div>
                c
                <a href={`/books?q=${serch}`} >検索</a>
           
            { books.map((book) => (
                <div key={book.id}>
                    <h1>{book.title}</h1>
                    {book.bookimages.map(image=>(
                        <img src={image.url} alt="画像がないです" className="w-1/3" />
                    ))}
                    <div>
                        <h2>{book.author}</h2>
                        <p>{book.totalpage}</p>
                        <button type="button" onClick={()=>addLibrary(book.id)}>追加する</button>
                    </div>    
                </div>
            )) }
            <BookModal />
        </Authenticated>
        );
}

export default Index;