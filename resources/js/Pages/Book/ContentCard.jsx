import React from 'react';

const ContentCard = ({ mybook, setModalState }) => {
  const openModal = (id) => {
    console.log(id);
    setModalState(id);
  };

  return (
    <button onClick={() => openModal(mybook.id)} className="w-full">
      <div className="p-4 bg-blue-200 rounded-lg shadow-md hover:bg-blue-300 transition">
        <p className="text-lg font-semibold text-gray-800">タイトル: {mybook.book.title}</p>
        <p className="text-sm text-gray-600">作者: {mybook.book.author}</p>
      </div>
    </button>
  );
};

const ContentGrid = ({ books, setModalState }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <ContentCard key={book.id} mybook={book} setModalState={setModalState} />
      ))}
    </div>
  );
};

export default ContentGrid;