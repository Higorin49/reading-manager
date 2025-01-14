import React, { useState } from 'react'
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ContentCard from './ContentCard';
import BookModalWindow from './BookModalWindow';

const BookModalMain = (props) => {
  const { books } = props;
  const [myBooks,setMyBooks]=useState(books)
  const [modalState, setModalState] = useState(null);
  console.log("mybooks",mybooks);
 
  return (


      // これは練習用です

    <Authenticated 
      user={props.auth.user}
      header={
        <h5>本棚</h5>}
    >
      
      {myBooks.map((book)=>(
        <ContentCard mybook={book} setModalState={setModalState} />
      ))}
      {modalState!==null ? <BookModalWindow setMyBooks={setMyBooks} setShow={setModalState} myBook={myBooks.filter(item => item.id==modalState)[0]} /> : <></>}
      {/* {modalState!==null ? <BookModalWindow setMyBooks={setMyBooks} setShow={setModalState} myBook={myBooks.find(item => item.id==modalState)} /> : <></>} */}

    </Authenticated>
  )
}

export default BookModalMain