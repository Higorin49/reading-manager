import React, { useState } from 'react';

const ContentCard = ({mybook,setModalState}) => {
  
  const openModal = (id) => {
    console.log(id);
    setModalState(id);
  }

 
  return (
    <button  onClick={()=>openModal(mybook.id)}>
      <div key={mybook.id} className='m-5 p-3 bg-blue-200'>
        <p>タイトル: {mybook.book.title}</p>
        <p>作者: {mybook.book.author}</p>
      </div>
    </button>
  )
}

export default ContentCard