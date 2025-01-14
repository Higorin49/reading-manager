import React, {useState} from 'react'
// import { useState } from 'react/cjs/react.production.min';
import axios from 'axios';

function BookModalWindow({ setMyBooks,setShow, myBook }) {
  const [inputPageNum, setInputPageNum]=useState(myBook.currentpage);
  const [currentPageNum,setCurrentPageNum]=useState(myBook.currentpage);
  
  const closeModal = () => {
    setShow(null);
  };
  const changeBooks = (datas) => {
    setMyBooks(datas);
  }
  async function addlog(){
   await axios.post("/addpage",{page: inputPageNum,bookId:myBook.book.id})
    .then(res => {
      console.log(res.data);
      console.log(res.data.book.currentpage);
      setCurrentPageNum(res.data.book.currentpage);
      console.log(res.data.mybooks);

      changeBooks(res.data.mybooks);
    })
    .catch(err => { console.error(err) });
  }
  const handleChange = (e) => {
    setInputPageNum(e.target.value);
  }
  
  console.log(myBook.book.boards.find(item => item.is_seacret==false));

  return (
    <div id="overlay" onClick={closeModal} className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
      <div id="content" onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg shadow-lg p-6 max-w-sm w-full'>
        <p>
          題名: {myBook.book.title}
        </p>

        <p>
          インプットページ: {inputPageNum}
        </p>

        <p>
          現在のページ: {currentPageNum}
        </p>

        <p>
          ページ: {myBook.currentpage}
        </p>
        
        <a href={`/boards/${myBook.book.boards[0].id}`}>ネタバレなし掲示板</a>
        <a href={`/boards/${(myBook.book.boards).find(item => item.is_seacret==false).id}`}>ネタバレあり掲示板</a>
        <input type="number" value={inputPageNum} onChange={handleChange} ></input>
        <button onClick={addlog}>記録</button>

        <button className='m-5 p-3 bg-slate-300 hover:bg-slate-500 rounded-md' onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default BookModalWindow