import React from "react";
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

    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
           
            { books.map((book) => (
                <div key={book.id}>
                    <h1>{book.title}</h1>
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