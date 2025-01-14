import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState,useEffect } from "react";
import ContentCard from './ContentCard';
import BookModalWindow from './BookModalWindow';



const Mylibrary = (props) => {
    const { books } = props;
    const [modalState, setModalState] = useState(null);
    
    
    
    
    return (
        <Authenticated user=
            {props.auth.user} header={
               <h5>本棚</h5>}
                 >
            
                { books.map((book) => (<ContentCard mybook={book} setModalState={setModalState} />
                ))}
                {modalState!==null ? <BookModalWindow setShow={setModalState} myBook={books.filter(item => item.id==modalState)[0]} /> : <></>}
        </Authenticated>
    )
    }

export default Mylibrary;