import React, { useState } from 'react';
import axios from 'axios';

function BookModalWindow({ setMyBooks, setShow, myBook }) {
  const [inputPageNum, setInputPageNum] = useState(myBook.currentpage);
  const [currentPageNum, setCurrentPageNum] = useState(myBook.currentpage);

  const closeModal = () => {
    setShow(null);
  };

  const changeBooks = (datas) => {
    setMyBooks(datas);
  };

  async function addlog() {
    await axios.post("/addpage", { page: inputPageNum, bookId: myBook.book.id })
      .then(res => {
        console.log(res.data);
        setCurrentPageNum(res.data.book.currentpage);
        changeBooks(res.data.mybooks);
      })
      .catch(err => { console.error(err); });
  }

  const handleChange = (e) => {
    setInputPageNum(e.target.value);
  };

  return (
    <div id="overlay" onClick={closeModal} className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
      <div id="content" onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>題名: {myBook.book.title}</h2>
        <p className='text-gray-600'>現在のページ: <span className='font-bold'>{currentPageNum}</span></p>
        <p className='text-gray-600'>インプットページ: <span className='font-bold'>{inputPageNum}</span></p>
        
        <div className='mt-4 flex flex-col space-y-2'>
          <a href={`/boards/${myBook.book.boards[0].id}`} className='text-blue-500 hover:underline'>ネタバレなし掲示板</a>
          <a href={`/boards/${myBook.book.boards.find(item => item.is_seacret === false)?.id}`} className='text-blue-500 hover:underline'>ネタバレあり掲示板</a>
        </div>
        
        <input type="number" value={inputPageNum} onChange={handleChange} className='w-full p-2 border rounded-md mt-4' />
        
        <div className='mt-4 flex space-x-4'>
          <button onClick={addlog} className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'>記録</button>
          <button onClick={closeModal} className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition'>閉じる</button>
        </div>
      </div>
    </div>
  );
}

export default BookModalWindow;